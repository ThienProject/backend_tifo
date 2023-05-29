import Joi from 'joi';
import { messageRequired } from '../utils/common';
const postValidation = {
  create: {
    body: Joi.object().keys({
      target: Joi.string().required(),
      type: Joi.string().required(),
      description: Joi.string(),
      id_user: Joi.string().required(),
    }),
    files: Joi.array().required().items(
      Joi.object({
        filename: Joi.string().required(),
        mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg', 'video/mp4', 'video/quicktime').required(),
        size: Joi.number().max(30 * 1024 * 1024).required(), // 10MB
        fieldname: Joi.string(),
        encoding: Joi.string(),
        path: Joi.string(),
        destination: Joi.string(),
        originalname: Joi.string()
      })
    ),
  },
  update: {
    body: Joi.object().keys({
      id_post: Joi.string().required(),
      target: Joi.string().allow(),
      type: Joi.string().allow(),
      description: Joi.allow(),
      id_user: Joi.string().allow(),
      medias: Joi.allow()
    }),
    files: Joi.array().allow().items(
      Joi.object({
        filename: Joi.string().required(),
        mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg', 'video/mp4', 'video/quicktime').required(),
        size: Joi.number().max(5 * 1024 * 1024).required(), // 10MB
        fieldname: Joi.string(),
        encoding: Joi.string(),
        path: Joi.string(),
        destination: Joi.string(),
        originalname: Joi.string()
      })
    ),
  },
  delete: {
    body: Joi.object().keys({
      id_post: Joi.string().required(),
    }),
  },
  updateLove: {
    body: Joi.object().keys({
      id_post: Joi.string().required(),
      id_user: Joi.string().required(),
      isLove: Joi.boolean().required(),
      type: Joi.string().allow(null)
    }),
  },
  updateSave: {
    body: Joi.object().keys({
      id_post: Joi.string().required(),
      id_user: Joi.string().required(),
      isSave: Joi.boolean().required(),
      type: Joi.string().allow(null)
    }),
  },
  getPosts: {
    query: Joi.object().keys({
      id_user: Joi.string().allow(null).allow(''),
      limit: Joi.number().required(),
      offset: Joi.number().required(),
      type: Joi.string().allow(null)
    }),
  },
  getPostByID: {
    query: Joi.object().keys({
      id_post: Joi.string().required(),
    }),
  }
}
export default postValidation;