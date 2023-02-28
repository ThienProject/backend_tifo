import Joi from 'joi';
import { messageRequired } from '../utils/common';

const userValidation = {
  getUsers: {
    body: Joi.object().keys({
      q: Joi.string().required(),
    }),
  },
  getMe: {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
    }),
  },
  login: {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  },
  register: {
    body: Joi.object().keys({
      fullName: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      // id_role: Joi.string().required(),
    }),
  },

  updateProfile: {
    body: Joi.object().keys({
      fullName: Joi.string().required(),
      email: Joi.string().required().email(),
      gender: Joi.string().required(),
      phone: Joi.string().required(),
      birthDay: Joi.string().required(),
      city: Joi.string().required(),
      id_user: Joi.string().required(),
      address: Joi.string().required(),
      // avatar: Joi.string().required(),
    }),
  },
};

export default userValidation;