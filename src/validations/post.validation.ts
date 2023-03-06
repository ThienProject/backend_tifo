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
        size: Joi.number().max(10 * 1024 * 1024).required(), // 10MB
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
    }),
  },
  delete: {
    body: Joi.object().keys({
      id_post: Joi.string().required(),
    }),
  },
  getPostById: {
    body: Joi.object().keys({
      id_post: Joi.string().required(),
    }),
  },
  getPosts: {
    query: Joi.object().keys({
      id_user: Joi.string().required(),
      limit: Joi.number().required(),
      offset: Joi.number().required(),
    }),
  }
}
export default postValidation;