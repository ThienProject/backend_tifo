import uniqid from 'uniqid';
import { IUser } from '../types/user';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
var _ = require('lodash');
const userService = {
  getUser: async (id_user: string) => {
    const rows: any = await queryDb(`select * from user where id_user="${id_user}"`);
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
  getUsers: async (paramsBody: { q: string }) => {
    const { q } = paramsBody;
    const users = await queryDb(`select id_user,	id_role,	fullname,	username,	description,	phone,	email,	address,	birthday,	gender,	avatar,	cover from user where id_user like "%${q}%" or fullname like "%${q}%" or username like "%${q}%"`)
    if (_.isEmpty(users)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't find out any user account !"
      )
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

  }
}
export default userService;