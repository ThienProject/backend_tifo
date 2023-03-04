import uniqid from 'uniqid';
import { IUser } from '../types/user';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

var _ = require('lodash');
var bcrypt = require('bcrypt');
const saltRounds = 10;

const authService = {
  register: async (body: IUser) => {
    const { email, fullname, username, password } = body;
    const id_user = uniqid('USER_').toUpperCase();
    const id_role = 2;
    let user = await queryDb(`select * from user where email="${email}"`);
    if (!_.isEmpty(user)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This email already exists !"
      )
    }
    user = await queryDb(`select * from user where username ="${username}"`);
    if (!_.isEmpty(user)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This username already exists !"
      )
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const rows: any = await queryDb(
      `insert into user(email, fullname,username, password, id_role, id_user) values('${email}','${fullname}','${username}','${hashPassword}','${id_role}','${id_user}')`
    );
    if (rows.insertId >= 0) {
      const users: any = await queryDb(`select * from user where email='${email}'`)
      const { password, ...other } = users[0];
      return {
        user: other,
        message: 'Register success !'
      };
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Registration failed, please try again later!'
      );
    }
  },
  login: async (body: IUser) => {
    const { email, password } = body;
    const row: any = await queryDb(`select * from user where email ="${email}"`);
    if (_.isEmpty(row)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST, 'User does not exist');
    }
    const user = row[0];
    const match = await bcrypt.compare(password, user.password.trim());
    if (match) {
      const { password, ...userRest } = user;
      return {
        user: userRest,
        message: "Logged in successfully !"
      }
    }
    else {
      throw new ApiError(
        httpStatus.BAD_REQUEST, 'Password incorrect'
      )
    }
  },
  getMe: async (email: string) => {
    const rows: any = await queryDb(`select * from user where email="${email}"`);
    if (_.isEmpty(rows))
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't find out user account!"
      );
    else {
      const user = rows[0];
      const { password, ...userRest } = user;
      return {
        user,
        message: "Get me success!"
      }
    }
  }
}
export default authService;