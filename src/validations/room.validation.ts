import Joi from 'joi';
import { messageRequired } from '../utils/common';
const roomValidation = {

  searchRoomOrUser: {
    query: Joi.object().keys({
      id_user: Joi.string().allow(null).allow(''),
      limit: Joi.number().required(),
      offset: Joi.number().required(),
      q: Joi.string().required(),
    }),
  },

}
export default roomValidation;