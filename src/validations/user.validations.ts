import Joi from 'joi';
import { messageRequired } from '../utils/common';

const userValidation = {
  getUser: {
    body: Joi.object().keys({
      id_user: Joi.string().required(),
      id_me: Joi.string().allow(null),

    }),
  },
  follow: {
    body: Joi.object().keys({
      id_noti: Joi.number().allow(null),
      id_follower: Joi.string().required(),
      id_user: Joi.string().required(),
      id_follow: Joi.number().allow(null),
    }),
  },
  getUsers: {
    query: Joi.object().keys({
      id_user: Joi.string().allow(null),
      q: Joi.string().required(),
      limit: Joi.number().required(),
      offset: Joi.number().required(),
    }),
  },

};

export default userValidation;