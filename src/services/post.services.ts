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
    const row: any = await queryDb(`insert into post (id_post,id_user, target, type, description) value ('${id_post}', '${id_user}', '${target}', '${type}', '${description}')`)
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
    const sql = `SELECT post.*, user.username, user.fullname, user.avatar  FROM post, user, follow WHERE user.id_user =
    '${id_user}' and follow.id_follower = '${id_user}' and follow.id_user = post.id_user and post.target = 'public' limit ${limit} offset ${offset}`;
    console.log(sql)
    const rows: any = await queryDb(sql)
    if (_.isEmpty(rows))
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't find out posts!"
      );
    else {
      const posts = rows;
      for (let i = 0; i <= posts.length - 1; i++) {
        const id_post = posts[i].id_post;
        const comments = await queryDb(`select *from comment where id_post = '${id_post}'`);
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


}

export default postService;