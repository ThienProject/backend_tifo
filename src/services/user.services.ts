import uniqid from 'uniqid';
import { IUser } from '../types/user';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
var _ = require('lodash');
const userService = {
  getUser: async ({ id_me, id_user }: { id_me?: string, id_user: string }) => {
    const rows: any = await queryDb(`select user.*, follow.status as follow
    from user 
    left join follow on follow.id_user = user.id_user 
    				and  follow.id_follower ='${id_me}'
    WHERE user.id_user='${id_user}'`);
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
        message: "Get me success!"
      }
    }
  },
  getUsers: async (paramsBody: any) => {
    const { q, offset, limit, id_user } = paramsBody;
    const users = await queryDb(`
      select id_user,	id_role,	fullname,	username,	description,	phone,	email,	address,	birthday,	gender,	avatar,	cover from user 
      where id_user <> '${id_user}' and (id_user = "${q}" or fullname like "%${q}%" or username like "%${q}%")
      order by fullname desc
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
        messages: 'Search success !'
      }
    }
  },
  getPosts: async (query: any) => {
    const { id_user, offset, limit } = query;
    const sql = `SELECT post.*, user.id_user, user.username, user.avatar, user.fullname from user, post where post.id_user = user.id_user and post.type ='post' and user.id_user = '${id_user}' limit ${limit} offset ${offset}`;
    const rows: any = await queryDb(sql)
    const posts = rows;
    for (let i = 0; i <= posts.length - 1; i++) {
      const id_post = posts[i].id_post;
      const commentLength = await queryDb(`select count(comment.id_comment) as commentLength from comment where comment.id_post = '${id_post}' `)
      // const comments = await queryDb(`select comment.*, user.id_user,user.avatar, user.fullname, user.username from comment, user where id_post = '${id_post}' and user.id_user = comment.id_user `);
      posts[i].commentLength = commentLength ? commentLength[0].commentLength : 0;
      const medias = await queryDb(`select *from media where id_post = '${id_post}'`);
      posts[i].medias = medias;
    }
    return {
      posts,
      message: "Get posts success!"
    }

  },
  getReels: async (query: any) => {
    const { id_user, offset, limit } = query;
    const sql = `SELECT post.*, user.id_user, user.username, user.avatar, user.fullname from user, post where post.id_user = user.id_user and post.type ='reel' and user.id_user = '${id_user}' limit ${limit} offset ${offset}`;
    const rows: any = await queryDb(sql)
    const posts = rows;
    for (let i = 0; i <= posts.length - 1; i++) {
      const id_post = posts[i].id_post;
      const commentLength = await queryDb(`select count(comment.id_comment) as commentLength from comment where comment.id_post = '${id_post}' `)
      // const comments = await queryDb(`select comment.*, user.id_user,user.avatar, user.fullname, user.username from comment, user where id_post = '${id_post}' and user.id_user = comment.id_user `);
      posts[i].commentLength = commentLength ? commentLength[0].commentLength : 0;
      const medias = await queryDb(`select *from media where id_post = '${id_post}'`);
      posts[i].medias = medias;
    }
    return {
      posts,
      message: "Get posts success!"
    }

  },
  getSaves: async (query: any) => {
    const { id_user, offset, limit } = query;
    const sql = `SELECT post.* ,user.id_user, user.username, user.avatar, user.fullname from user, save, post where post.id_user = user.id_user and post.type ='post' and user.id_user = '${id_user}' and post.id_post = save.id_post and save.id_user = user.id_user limit ${limit} offset ${offset}`;
    const rows: any = await queryDb(sql)
    const posts = rows;
    for (let i = 0; i <= posts.length - 1; i++) {
      const id_post = posts[i].id_post;
      const commentLength = await queryDb(`select count(comment.id_comment) as commentLength from comment where comment.id_post = '${id_post}' `)
      // const comments = await queryDb(`select comment.*, user.id_user,user.avatar, user.fullname, user.username from comment, user where id_post = '${id_post}' and user.id_user = comment.id_user `);
      posts[i].commentLength = commentLength ? commentLength[0].commentLength : 0;
      const medias = await queryDb(`select *from media where id_post = '${id_post}'`);
      posts[i].medias = medias;
    }
    return {
      posts,
      message: "Get posts success!"
    }

  },
  requestFollow: async (body: any) => {
    const { id_follower, id_user } = body;
    let sql = `insert into follow (id_user, id_follower, status) values ('${id_user}', '${id_follower}','waiting')`;
    const row: any = await queryDb(sql);

    if (row.insertId >= 0) {
      console.log(row);
      return {
        id_follow: row.insertId,
        message: 'request follow success !'
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'request follow failed, please try again later!');
    }
  },
  acceptFollow: async (body: any) => {
    const { id_follower, id_user } = body;
    const sql = `update follow set status = 'accept' where id_user = '${id_user}' and id_follower = '${id_follower}'`;
    const row: any = await queryDb(sql);
    if (row.insertId >= 0) {
      let sql = `select count(id_follower) as followers from follow where id_user =  '${id_user}'`
      const row: any = await queryDb(sql);
      const followers = row[0].followers;
      return {
        followers: followers,
        message: 'accept follow success !'
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'accept follow failed, please try again later!');
    }
  },
  unfollow: async (body: any) => {
    const { id_follower, id_user } = body;
    const sql = `delete from follow where id_user = '${id_user}' and id_follower = '${id_follower}'`;
    const row: any = await queryDb(sql);
    if (row.insertId >= 0) {
      let sql = `select count(id_follower) as followers from follow where id_user =  '${id_user}'`
      const row: any = await queryDb(sql);
      const followers = row[0].followers;
      return {
        followers: followers,
        message: 'unfollow success !'
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'unfollow failed, please try again later!');
    }
  },
  rejectFollow: async (body: any) => {
    const { id_follower, id_user } = body;
    const sql = `update follow set status = 'reject' where id_user = '${id_user}' and id_follower = '${id_follower}'`;
    const row: any = await queryDb(sql);
    if (row.insertId >= 0) {
      let sql = `select count(id_follower) as followers from follow where id_user =  '${id_user}'`
      const row: any = await queryDb(sql);
      const followers = row[0].followers;
      return {
        followers: followers,
        message: 'accept follow success !'
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'accept follow failed, please try again later!');
    }
  },

}
export default userService;