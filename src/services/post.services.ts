import uniqid from 'uniqid';
import { IPost } from '../types/post';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

var _ = require('lodash');
const postService = {
  create: async (body: IPost) => {
    const {
      id_user,
      id_target,
      id_type,
      description, medias } = body
    const id_post = uniqid('POST_').toUpperCase();
    const row: any = await queryDb(`insert into post (id_post,id_user, id_target, id_type, description) value ('${id_post}', '${id_user}', '${id_target}', '${id_type}', '${description}')`)
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
  }
}
export default postService;