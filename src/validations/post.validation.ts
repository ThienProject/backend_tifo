import Joi from 'joi';
import { messageRequired } from '../utils/common';
const postValidation = {
  create: {
    body: Joi.object().keys({
      medias: Joi.allow().required(),
      id_target: Joi.string().required(),
      id_type: Joi.string().required(),
      description: Joi.string(),
      id_user: Joi.string().required()
    }),
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
    body: Joi.object().keys({
      id_post: Joi.string().required(),
      limit: Joi.string().required(),

    }),
  }
}
export default postValidation;