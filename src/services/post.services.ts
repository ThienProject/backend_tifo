import uniqid from 'uniqid';
import { IGetPosts, IPost } from '../types/post';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

var _ = require('lodash');
const postService = {
  create: async (body: IPost) => {
    const {
      id_user,
      target,
      type,
      description, medias } = body
    const id_post = uniqid('POST_').toUpperCase();
    const sql = `insert into post (id_post,id_user, target, type, description) value ('${id_post}', '${id_user}', '${target}', '${type}', '${description}')`
    const row: any = await queryDb(sql);
    if (row.insertId >= 0) {
      if (medias) {
        let queryMedia = `insert into media (id_media, id_post, media_link, type_media) value `
        for (let i = 0; i < medias?.length; i++) {
          const id_media = uniqid('MEDIA_').toUpperCase();
          const file: any = medias[i];
          const mimetype = file.mimetype.split('/')[0];
          queryMedia += `('${id_media}', '${id_post}', '${file.filename}', '${mimetype}'),`

        }
        queryMedia = queryMedia.substring(0, queryMedia.length - 1);

        const rowImg: any = await queryDb(queryMedia);
        if (rowImg.insertId >= 0) {
          return {
            message: 'Create post success !'
          }
        }
        else {
          throw new ApiError(httpStatus.BAD_REQUEST, 'An error occurred with medias, please try again later!');
        }
      } else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'An error occurred with medias, please try again later!');
      }

    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'create post failed, please try again later!');
    }
  },
  getPosts: async (query: IGetPosts) => {
    const { id_user, offset, limit } = query;
    const sql = id_user !== '' ? `SELECT post.*, user.id_user, user.username, user.avatar, user.fullname FROM post ,follow, user WHERE (( follow.id_follower = 'id_user' 
and follow.id_user = post.id_user and post.target = 'follower') or (post.target = 'public')) and type = 'post' and post.id_user = user.id_user limit ${limit} offset ${offset}`
      : `SELECT post.*, user.username, user.fullname, user.avatar  FROM post, user where post.id_user = user.id_user and post.target = 'public' and type = 'post' limit ${limit} offset ${offset}`;

    const rows: any = await queryDb(sql)

    const posts = rows;
    for (let i = 0; i <= posts.length - 1; i++) {
      const id_post = posts[i].id_post;
      const comments = await queryDb(`select comment.*, user.id_user,user.avatar, user.fullname, user.username from comment, user where id_post = '${id_post}' and user.id_user = comment.id_user `);
      posts[i].comments = comments;
      const medias = await queryDb(`select *from media where id_post = '${id_post}'`);
      posts[i].medias = medias;
    }
    return {
      posts,
      message: "Get posts success!"
    }

  }


}

export default postService;