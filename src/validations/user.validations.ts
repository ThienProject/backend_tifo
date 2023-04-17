import Joi from 'joi';
import { messageRequired } from '../utils/common';

const userValidation = {
  getUser: {
    body: Joi.object().keys({
      id_user: Joi.string().required(),
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