import Joi from 'joi';
import { messageRequired } from '../utils/common';

const userValidation = {
  getUser: {
    body: Joi.object().keys({
      id_user: Joi.string().required(),
    }),
  },
  getUsers: {
    body: Joi.object().keys({
      q: Joi.string().required(),
    }),
  },

};

export default userValidation;