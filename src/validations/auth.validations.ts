import Joi from 'joi';
import { messageRequired } from '../utils/common';

const authValidation = {
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
  loginGoogle: {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
    }),
  },
  register: {
    body: Joi.object().keys({
      fullname: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      username: Joi.string().required(),
      birthday: Joi.string().required(),

    }),
  },

  updateProfile: {
    body: Joi.object().keys({
      fullname: Joi.string().required(),
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

export default authValidation;