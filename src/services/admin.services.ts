import uniqid from 'uniqid';
import { IUser } from '../types/user';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { INotification, IPayloadNoti } from '../types/notification';
import { io, userSockets } from '..';
import { IGetPostByID, IPost } from '../types/post';

var _ = require('lodash');
var bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const saltRounds = 10;

const authService = {

  getUsers: async (payload: any) => {
    const { offset, limit, filters } = payload;
    let filterSql = '';
    if (filters) {
      for (let i = 0; i < filters.length; i++) {
        if (filters[i] === 'reported') {
          filterSql += ` and post_reports.count >0  `;
        }
        if (filters[i] === 'banned') {
          filterSql += ` and banned.id_user IS NOT NULL  `;
        }
      }
    }
    const users = await queryDb(`
      SELECT  count.total, 
    post_reports.count as post_reports,
 		user.id_user,
        role.id_role, role.role, COUNT(post.id_post) AS post_quantity, 
       fullname, username, 
       CASE
         WHEN banned.id_user IS NOT NULL THEN 'banned'
         WHEN post_reports.count > 0 THEN 'reported'
         ELSE user.status
       END AS status,
       phone, email, address, birthday, gender, avatar, cover
        FROM (select count(id_user) as total from user WHERE user.id_role <> 3)as count ,
        user
        left JOIN role ON role.id_role = user.id_role 
        LEFT JOIN post ON post.id_user = user.id_user
        LEFT JOIN banned ON banned.id_user = user.id_user
        left JOIN (select post.id_user,COALESCE(count(DISTINCT post.id_post),0) as count from report, post WHERE post.id_post = report.id_post ) as post_reports on post_reports.id_user = user.id_user
        where role.id_role <> 3
        ${filterSql} 
        GROUP BY user.id_user
        ORDER BY status DESC
      limit ${limit} offset ${offset}
      `
    )
    if (_.isEmpty(users)) {
      return {
        users,
        messages: 'No account !'
      }
    }
    else {
      return {
        users,
        total: users[0]?.total || 0,
        messages: 'Search success !'
      }
    }
  },
  getUserByID: async ({ id_user }: { id_user: string }) => {
    const rows: any = await queryDb(` 
      SELECT  count.total, 
    	post_reports.count as post_reports,
 		user.id_user,
        user.datetime,
        role.id_role, role.role, COUNT(post.id_post) AS post_quantity, 
       fullname, username, 
       CASE
         WHEN banned.id_user IS NOT NULL THEN 'banned'
         WHEN post_reports.count > 0 THEN 'reported'
         ELSE user.status
       END AS status,
       phone, email, address, birthday, gender, avatar, cover
        FROM (select count(id_user) as total from user WHERE user.id_role <> 3)as count ,
        user
        RIGHT JOIN role ON role.id_role = user.id_role AND role.id_role <> 3
        LEFT JOIN post ON post.id_user = user.id_user
        LEFT JOIN banned ON banned.id_user = user.id_user
        left JOIN (select post.id_user,COALESCE(count(DISTINCT post.id_post),0) as count from report, post WHERE post.id_post = report.id_post group by post.id_post ) as post_reports on post_reports.id_user = user.id_user
        where user.id_user = '${id_user}'
        GROUP BY user.id_user
        ORDER BY status DESC`);

    if (_.isEmpty(rows))
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't find out user account!"
      );
    else {
      const user = rows[0];
      const { password, address, birthday, ...userRest } = user;
      return {
        user: userRest,
        message: "Get user success!"
      }
    }
  },
  getPosts: async (payload: any) => {
    const { id_user, offset, limit, filters } = payload;
    let filterSql = '';
    if (filters) {
      for (let i = 0; i < filters.length; i++) {
        if (filters[i] === 'reported') {
          filterSql += ` and report.count >0  `;
        }
        if (filters[i] === 'banned') {
          filterSql += ` and post.is_banned >0 `;
        }
      }
    }
    const sql = `SELECT post.*, user.id_user, user.username, user.avatar, user.fullname , 
    report.count as reports_quantity, loves.count as loves, count.total,
     CASE
         WHEN  post.is_banned > 0 THEN 'banned'
         WHEN report.count > 0 THEN 'reported'
         ELSE 'active'
       END AS status
    from user, (select count(id_post) as total from post  ${id_user ? ` where post.id_user = '${id_user}'` : ' '})as count, post
    left join (SELECT  report.id_post, count(report.id_post) as count FROM report GROUP by report.id_post ) as report 
     on report.id_post = post.id_post
    left join (SELECT  love.id_post, count(love.id_post) as count FROM love  GROUP by love.id_post) as loves 
    on loves.id_post = post.id_post
    where post.id_user = user.id_user 
    ${id_user ? ` and user.id_user = '${id_user}' ` : ' '}
    ${filterSql}
    order by status desc
    limit ${limit} offset ${offset}`;
    const rows: any = await queryDb(sql)
    const posts = rows;
    return {
      posts,
      total: posts[0]?.total || 0,
      message: "Get posts success!"
    }
  },
  getPost: async (query: IGetPostByID) => {
    const { id_post } = query;
    const sql = `SELECT post.*,  
              user.username,
              user.avatar,
              user.fullname,
              userReport.username as reportUsername,
              userReport.avatar as reportAvatar,
              userReport.id_user as reportId_user,
              report.reason as reportReason,
              report.datetime as reportDatetime,
              ( select count(love.id_user) as loves from love WHERE love.id_post ='${id_post}'  ) as loves,
              ( select count(comment.id_comment) as comments from comment WHERE comment.id_post ='${id_post}'  ) as comments
              FROM post
              left join user on post.id_user = user.id_user 
              left join report on report.id_post = post.id_post
              left join (select user.id_user,  user.username, user.avatar from user ) as userReport
              	on userReport.id_user = report.id_user    
              WHERE post.id_post = '${id_post}' `;
    const rows: any[] = await queryDb(sql)
    if (rows.length > 0) {
      const newPost = rows.reduce((accumulator, currentValue) => {
        const { reportUsername: username, reportId_user: id_user, reportReason: reason, reportDatetime: datetime, reportAvatar: avatar, ...restPost } = currentValue;
        const reported = id_user ? { username, id_user, reason, datetime, avatar } : null;

        const index = accumulator.findIndex((item: IPost) => item.id_post === currentValue.id_post);
        if (index === -1) {
          const newValue = restPost;
          if (reported) {
            newValue.reports = [reported];
          }
          accumulator.push(newValue);
        } else {
          if (reported) {
            accumulator[index].reports.push(reported);
          }
        }
        return accumulator;
      }, [])

      const post = newPost[0];
      const medias = await queryDb(`select *from media where id_post = '${id_post}'`);
      post.medias = medias;
      return {
        post,
        message: "Get posts success!"
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "This post does not exist !");
    }
  },

}
export default authService;