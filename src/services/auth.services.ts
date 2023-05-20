import uniqid from 'uniqid';
import { IUser } from '../types/user';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { INotification, IPayloadNoti } from '../types/notification';
import { io, userSockets } from '..';

var _ = require('lodash');
var bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const saltRounds = 10;

const authService = {
  register: async (body: IUser) => {
    const { email, fullname, username, password, birthday } = body;
    const id_user = uniqid('USER_').toUpperCase();
    const id_role = 2;
    let user = await queryDb(`select * from 
    user where email="${email}"  `);
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
      `insert into user(email, fullname,username, password, id_role, id_user, avatar, birthday) values('${email}','${fullname}','${username}','${hashPassword}','${id_role}','${id_user}', 'account.jpg', '${birthday}')`
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
    const row: any = await queryDb(`select * from user where  user.id_user not in (select banned.id_user from banned) and email ="${email}"`);
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
  updateInfo: async (body: IUser) => {
    const { id_user, email, phone, fullname, username, description, birthday, gender } = body;
    const check: any = await queryDb(`(select username, email, phone from user WHERE id_user = null)
      UNION (select username, '', '' from user where (username = '${username}') and id_user <>'${id_user}') 
      UNION (select '', email,'' from user where ( email =  '${email}') and id_user <> '${id_user}')
      UNION (select '','',phone from user where (phone ='') and id_user <> '${id_user}')`);
    if (check[0] || !_.isEmpty(check)) {
      const rules: any[] = [];
      check.forEach((error: any) => {
        if (error.email) {
          rules.push('email')
        }
        if (error.username) {
          rules.push('username')
        }
        if (error.phone) {
          rules.push('phone')
        }
      })
      return {
        rules: rules,
        message: "duplicate"
      }
    };
    const row: any = await queryDb(`update user set email = "${email}", phone = "${phone}", fullname = "${fullname}", username  = "${username}", description  = "${description}", birthday  = "${birthday}", gender = '${gender}' where id_user = '${id_user}'`);
    if (row.insertId < 0) {
      throw new ApiError(
        httpStatus.BAD_REQUEST, 'Update fail!');
    }
    else {
      const { user } = await authService.getMe(id_user!);
      if (_.isEmpty(user)) {
        throw new ApiError(
          httpStatus.BAD_REQUEST, 'can not find user!');
      } else {
        return {
          user,
          message: 'update info success!'
        }
      }
    }
  },
  updatePassword: async (body: any) => {
    const { id_user, password, currentPassword } = body;
    const row: any = await queryDb(`select * from user where id_user ="${id_user}"`);
    if (_.isEmpty(row)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST, 'User does not exist');
    }
    const user = row[0];
    const match = await bcrypt.compare(currentPassword, user.password.trim());
    if (match) {
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const changePass: any = await queryDb(`update user set password  = "${hashPassword}" where id_user = '${id_user}'`);
      if (changePass.insertId < 0) {
        throw new ApiError(
          httpStatus.BAD_REQUEST, 'invalid');
      }
      else {
        return {
          message: 'update password success!'
        }
      }
    }
    else {
      throw new ApiError(
        httpStatus.BAD_REQUEST, 'invalid'
      )
    }

  },
  updateImage: async (body: any) => {
    const { image, type, id_user } = body;
    const oldImage: any = await queryDb(`select ${type} from user where id_user = '${id_user}'`);
    if (!_.isEmpty(oldImage[0][type])) {
      const imagePath = path.join(__dirname, '../../src/public/users', oldImage[0][type]);
      if (fs.existsSync(imagePath)) {
        // Sử dụng phương thức unlink để xóa tập tin
        await fs.unlink(imagePath, (err: any) => {
          if (err) {
            return {
              message: err
            }
          }
        });
      } else {
        console.log("can't find out file in server " + " in " + imagePath)
      }
    }
    const row: any = await queryDb(`update user set ${type} = '${image.filename}' where id_user = '${id_user}'`);
    if (_.isEmpty(row)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST, 'User does not exist');
    }
    else {
      const { user } = await authService.getMe(id_user!);
      return { message: 'ok', user }
    }
  },
  updateInvisible: async (body: IUser) => {
    const { id_user, invisible } = body;
    const row: any = await queryDb(`update user set invisible = '${invisible}' where id_user = '${id_user}'`);
    if (_.isEmpty(row)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST, 'User does not exist');
    }
    else {
      return { message: 'ok' }
    }
  },
  getMe: async (id_user: string) => {
    const rows: any = await queryDb(`select * from user where id_user="${id_user}"`);
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
  getNotifications: async ({ id_user, limit, offset, time, category, sort }: IPayloadNoti) => {
    let newTime = '';
    switch (time) {
      case 'today': newTime += ' and DATE(notification.datetime) = CURDATE()'; break;
      case 'year': newTime = ' and YEAR(notification.datetime) = YEAR(CURDATE())'; break;
      case 'week': newTime = ' and YEAR(notification.datetime) = YEAR(CURDATE()) and WEEK(notification.datetime) = WEEK(CURDATE())'; break
      case 'month': newTime = ' and YEAR(notification.datetime) = YEAR(CURDATE()) and MONTH(notification.datetime) = MONTH(CURDATE())'; break
      default: newTime = ''
        break;
    }
    let type = '';
    if (category === 'follow') {
      type = ` and notification.type in ("follow"  , "accept_follow", "request_follow")`;
    } else {
      type = ` and notification.type = "${category}"`
    }
    const sql = `select notification.*, notification.id_follow,  user.fullname, user.avatar , user.username from notification
    LEFT JOIN user ON notification.id_actor = user.id_user
    where notification.id_user="${id_user}"
    ${category === 'all' ? '' : type}
     ${newTime}
    order by  notification.datetime ${sort}
    limit ${limit} offset ${offset} `
    const notifications: any = await queryDb(sql);
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
    const sql = `INSERT INTO notification (id_user, id_actor, type, id_comment, id_post, id_follow) VALUES ('${id_user}', '${id_actor}', '${type}', ${id_comment ? `'${id_comment}'` : "NULL"}, ${id_post ? `'${id_post}'` : 'NULL'},  ${id_follow || "NULL"})`;
    console.log(sql)
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