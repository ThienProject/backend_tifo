import uniqid from 'uniqid';
import { IUser } from '../types/user';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { INotification } from '../types/notification';
import { io, userSockets } from '..';

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
      `insert into user(email, fullname,username, password, id_role, id_user, avatar) values('${email}','${fullname}','${username}','${hashPassword}','${id_role}','${id_user}', 'account.jpg')`
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
  },
  getNotifications: async (id_user: string) => {
    const notifications: any = await queryDb(`select notification.*, user.fullname, user.avatar , user.username from notification
    LEFT JOIN user ON notification.id_actor = user.id_user
    where notification.id_user="${id_user}"`);
    if (_.isEmpty(notifications))
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't find out user account!"
      );
    else {
      return {
        notifications,
        message: "Get notifications success!"
      }
    }
  },
  sendNotification: async (body: INotification) => {
    const { id_user, id_actor, type, id_comment, id_post, id_follow } = body;
    const sql = `INSERT INTO notification (id_user, id_actor, type, id_comment, id_post, id_follow) VALUES ('${id_user}', '${id_actor}', '${type}', ${id_comment ? `'${id_comment}'` : "NULL"}, ${id_post || "NULL"},  ${id_follow || "NULL"})`;
    const notifications: any = await queryDb(sql);
    if (_.isEmpty(notifications))
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't create notification!"
      );
    else {
      const row = await queryDb(`select notification.*, user.fullname, user.avatar , user.username from notification
                  LEFT JOIN user ON notification.id_actor = user.id_user
                  WHERE notification.id_notification = LAST_INSERT_ID();`)
      const userActive = userSockets[id_user!];
      if (userActive && !_.isEmpty(row)) {
        console.log("socket thông báo đến :", userActive.id)
        const noti = row[0]
        io.to(userActive.id).emit('notification', noti);
      }
      return {
        message: "Create notifications success!"
      }
    }
  },
  removeNotification: async (body: INotification) => {
    const { id_noti } = body;
    const sql = `delete from notification where id_notification = '${id_noti}'`;
    const notifications: any = await queryDb(sql);
    if (_.isEmpty(notifications))
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't create notification!"
      );
    else {
      return {
        message: "Create notifications success!"
      }
    }
  }
}
export default authService;