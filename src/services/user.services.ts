import uniqid from 'uniqid';
import { IUser } from '../types/user';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
var _ = require('lodash');
const userService = {
  getUsers: async (paramsBody: { q: string }) => {
    const { q } = paramsBody;
    const users = await queryDb(`select id_user,	id_role,	fullname,	username,	description,	phone,	email,	address,	birthday,	gender,	avatar,	cover from user where id_user like "%${q}%" or fullname like "%${q}%" or username like "%${q}%"`)
    if (_.isEmpty(users)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't find out any user account !"
      )
    }
    else {
      return {
        users,
        messages: 'Search success !'
      }
    }
  },
}
export default userService;