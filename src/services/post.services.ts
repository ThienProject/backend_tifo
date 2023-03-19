import uniqid from 'uniqid';
import { IGetPostByID, IGetPosts, IPost } from '../types/post';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
const path = require('path');
const fs = require('fs');
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
        let queryMedia = `insert into media (id_media, id_post, media_link, type) value `
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
      : `SELECT post.*, user.username, user.fullname, user.avatar FROM post, user where post.id_user = user.id_user and post.target = 'public' and type = 'post' limit ${limit} offset ${offset}`;

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
  getPostByID: async (query: IGetPostByID) => {
    const { id_post } = query;
    const sql = `SELECT post.* FROM post where post.id_post = '${id_post}'`;
    const rows: any = await queryDb(sql)
    if (rows.length > 0) {
      const post = rows[0];
      const commentLength = await queryDb(`select count(comment.id_comment) as commentLength from comment where comment.id_post = '${id_post}' `)
      // const comments = await queryDb(`select comment.*, user.id_user,user.avatar, user.fullname, user.username from comment, user where id_post = '${id_post}' and user.id_user = comment.id_user `);
      post.commentLength = commentLength ? commentLength[0].commentLength : 0;
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
  update: async (body: any) => {
    const { medias, id_post, ...restBody } = body;
    let sql = `update post set `;
    for (const key in restBody) {
      if (Object.hasOwnProperty.call(restBody, key)) {
        const value = restBody[key];
        if (value)
          sql += ` ${key} = '${value}' , `
      }
    }
    sql = sql.replace(/, $/, '');
    sql += `where id_post = '${id_post}'`;
    const row: any = await queryDb(sql);
    if (row.insertId >= 0) {
      if (medias && medias.length > 0) {
        let queryMedia = `insert into media (id_media, id_post, media_link, type) value `
        for (let i = 0; i < medias?.length; i++) {
          const id_media = uniqid('MEDIA_').toUpperCase();
          const file: any = medias[i];
          const mimetype = file.mimetype.split('/')[0];
          queryMedia += `('${id_media}', '${id_post}', '${file.filename}', '${mimetype}'),`
        }
        queryMedia = queryMedia.substring(0, queryMedia.length - 1);
        const rowImg: any = await queryDb(queryMedia);
      }
      const { post } = await postService.getPostByID({ id_post })
      return {
        post,
        message: 'Create post success !'
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'create post failed, please try again later!');
    }
  },
  replaceMedias: async (body: any) => {
    const {
      old_medias,
      medias
    } = body
    if (medias && medias.length > 0) {
      let queryMedia = `update media set `
      let querySetFileName = `media_link = CASE `
      let querySetFileType = `, type = CASE `
      let queryWhere = ' where '
      for (let i = 0; i < medias.length; i++) {
        const oldFile = old_medias[i]
        const newFile = medias[i];
        const mimetype = newFile.mimetype.split('/')[0];
        querySetFileName += `when media.id_media = '${oldFile.id_media}' then '${newFile.filename}' `
        querySetFileType += `when media.id_media = '${oldFile.id_media}' then '${mimetype}' `
        queryWhere += `id_media = '${oldFile.id_media}' or `
      }
      querySetFileName += 'END'
      querySetFileType += 'END'
      queryWhere = queryWhere.replace(/or $/, '')
      queryMedia += querySetFileName + querySetFileType + queryWhere;

      const rowImgs: any = await queryDb(queryMedia);
      if (rowImgs.insertId >= 0) {
        for (let i = 0; i < medias.length; i++) {
          const oldFile = old_medias[i]
          const imagePath = path.join(__dirname, '../../src/public/medias', oldFile.media_link);
          if (fs.existsSync(imagePath)) {
            // Sử dụng phương thức unlink để xóa tập tin
            await fs.unlink(imagePath, (err: any) => {
              if (err) {
                return {
                  message: err
                }
              }
            });
            // return {
            //   message: 'Update image success !'
            // }
            console.log("delete success!");
          } else {
            // return {
            //   message: "can't find out file in server " + " in " + imagePath
            // }
            console.log("can't find out file in server " + " in " + imagePath)
          }
        }
        return { message: "ok" }
      }
      else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'An error occurred with media, please try again later!');
      }

    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'create post failed, please try again later!');
    }
  },
  deleteMedias: async (body: any) => {
    const {
      medias
    } = body
    if (medias && medias.length > 0) {
      let queryMedia = `delete FROM media where `
      for (let i = 0; i < medias.length; i++) {
        const { id_media, media_link } = medias[i];
        queryMedia += `id_media = '${id_media}' or `
      }
      queryMedia = queryMedia.substring(0, queryMedia.length - 3);
      const rowImgs: any = await queryDb(queryMedia);
      if (rowImgs.insertId >= 0) {
        for (let i = 0; i < medias.length; i++) {
          const oldFile = medias[i]
          const imagePath = path.join(__dirname, '../../src/public/medias', oldFile.media_link);
          if (fs.existsSync(imagePath)) {
            // Sử dụng phương thức unlink để xóa tập tin
            await fs.unlink(imagePath, (err: any) => {
              if (err) {
                return {
                  message: err
                }
              }
            });
            console.log("delete success!");
          } else {
            // return {
            //   message: "can't find out file in server " + " in " + imagePath
            // }
            console.log("can't find out file in server " + " in " + imagePath)
          }
        }
        return { message: "ok" }
      }
      else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'An error occurred with media, please try again later!');
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'delete media, please try again later!');
    }
  }
}

export default postService;