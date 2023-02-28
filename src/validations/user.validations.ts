import Joi from 'joi';
import { messageRequired } from '../utils/common';

const userValidation = {
  getUsers: {
    body: Joi.object().keys({
      q: Joi.string().required(),
    }),
  },

};

export default userValidation;