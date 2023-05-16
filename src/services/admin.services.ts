import uniqid from 'uniqid';
import { IUser } from '../types/user';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { INotification, IPayloadNoti } from '../types/notification';
import { io, userSockets } from '..';

var _ = require('lodash');
var bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const saltRounds = 10;

const authService = {


  getMe: async (id_user: string) => {
    const rows: any = await queryDb(`select * from user where id_user="${id_user}"`);
    if (_.isEmpty(rows))
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't find out user account!"
      );
    else {
      const user = rows[0];
      const { password, ...userRest } = user;
      return {
        user,
        message: "Get me success!"
      }
    }
  },
  getUsers: async (paramsBody: any) => {
    const { offset, limit, filters } = paramsBody;
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
        RIGHT JOIN role ON role.id_role = user.id_role AND role.id_role <> 3
        LEFT JOIN post ON post.id_user = user.id_user
        LEFT JOIN banned ON banned.id_user = user.id_user
        left JOIN (select post.id_user,COALESCE(count(post.id_post),0) as count from report, post WHERE post.id_post = report.id_post ) as post_reports on post_reports.id_user = user.id_user
        where 1  
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
        total: users[0].total,
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
        left JOIN (select post.id_user,COALESCE(count(post.id_post),0) as count from report, post WHERE post.id_post = report.id_post ) as post_reports on post_reports.id_user = user.id_user
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
}
export default authService;