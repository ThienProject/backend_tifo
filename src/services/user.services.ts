import uniqid from 'uniqid';
import { IUser } from '../types/user';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { io, userSockets } from '..';
var _ = require('lodash');
const userService = {
  getUser: async ({ id_me, id_user }: { id_me?: string, id_user: string }) => {
    const rows: any = await queryDb(`select user.*, follow.status as follow
    from user 
    left join follow on follow.id_user = user.id_user 
    				and  follow.id_follower ='${id_me}'
    WHERE user.id_user='${id_user}'`);
    if (_.isEmpty(rows))
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Can't find out user account!"
      );
    else {
      const user = rows[0];
      const { password, address, birthday, ...userRest } = user;
      return {
        user: userRest,
        message: "Get me success!"
      }
    }
  },
  getUsers: async (paramsBody: any) => {
    const { q, offset, limit, id_user } = paramsBody;
    const users = await queryDb(`
      select id_user,	id_role,	fullname,	username,	description,	phone,	email,	address,	birthday,	gender,	avatar,	cover from user 
      where id_user <> '${id_user}' and (id_user = "${q}" or fullname like "%${q}%" or username like "%${q}%") and user.id_role = 2
      order by fullname desc
      limit ${limit} offset ${offset}
      `
    )
    if (_.isEmpty(users)) {
      return {
        users,
        messages: 'No account !'
      }
    }
    else {
      return {
        users,
        messages: 'Search success !'
      }
    }
  },
  getUsersNotInRoom: async (paramsBody: any) => {
    const { q, offset, limit, id_user, id_room } = paramsBody;
    const users = await queryDb(`
      select id_user,	id_role,	fullname,	username,	description,	phone,	email,	address,	birthday,	gender,	avatar,	cover from user 
      where id_user <> '${id_user}' and (id_user = "${q}" or fullname like "%${q}%" or username like "%${q}%") and user.id_role = 2
      and id_user not in (select user_room.id_user from user_room where id_room = "${id_room}")
      order by fullname desc
      limit ${limit} offset ${offset}
      `
    )
    console.log(`
      select id_user,	id_role,	fullname,	username,	description,	phone,	email,	address,	birthday,	gender,	avatar,	cover from user 
      where id_user <> '${id_user}' and (id_user = "${q}" or fullname like "%${q}%" or username like "%${q}%") and user.id_role = 2
      and id_user not in (select user_room.id_user from user_room where id_room = "${id_room}")
      order by fullname desc
      limit ${limit} offset ${offset}
      `)
    if (_.isEmpty(users)) {
      return {
        users,
        messages: 'No account !'
      }
    }
    else {
      return {
        users,
        messages: 'Search success !'
      }
    }
  },
  getUserSuggests: async (paramsBody: any) => {
    const { offset, limit, id_user } = paramsBody;
    const users = await queryDb(`
      select user.id_user,	id_role,	fullname,	username,	description,	phone,	email,	address,	birthday,	gender,	avatar,	cover from user 
      where user.id_user <> '${id_user}' and user.id_user not in (select follow.id_user from follow WHERE follow.id_follower = '${id_user}' ) and user.id_role = 2
      GROUP by user.id_user 
      order by fullname desc
      limit ${limit} offset ${offset}
      `
    )
    if (_.isEmpty(users)) {
      return {
        users,
        messages: 'No account !'
      }
    }
    else {
      return {
        users,
        messages: 'Search success !'
      }
    }
  },

  requestFollow: async (body: any) => {
    const { id_follower, id_user } = body;
    let sql = `insert into follow (id_user, id_follower, status) values ('${id_user}', '${id_follower}','waiting')`;
    const row: any = await queryDb(sql);

    if (row.insertId >= 0) {
      console.log(row);
      return {
        id_follow: row.insertId,
        message: 'request follow success !'
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'request follow failed, please try again later!');
    }
  },
  acceptFollow: async (body: any) => {
    const { id_follower, id_user } = body;
    const sql = `update follow set status = 'accept' where id_user = '${id_user}' and id_follower = '${id_follower}'`;
    const row: any = await queryDb(sql);
    if (row.insertId >= 0) {
      let sql = `select count(id_follower) as followers from follow where id_user =  '${id_user}'`
      const row: any = await queryDb(sql);
      const followers = row[0].followers;
      return {
        followers: followers,
        message: 'accept follow success !'
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'accept follow failed, please try again later!');
    }
  },
  unfollow: async (body: any) => {
    const { id_follower, id_user } = body;
    const sql = `delete from follow where id_user = '${id_user}' and id_follower = '${id_follower}'`;
    const row: any = await queryDb(sql);
    if (row.insertId >= 0) {
      let sql = `select count(id_follower) as followers from follow where id_user =  '${id_user}'`
      const row: any = await queryDb(sql);
      const followers = row[0].followers;
      return {
        followers: followers,
        message: 'unfollow success !'
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'unfollow failed, please try again later!');
    }
  },
  rejectFollow: async (body: any) => {
    const { id_follower, id_user } = body;
    const sql = `update follow set status = 'reject' where id_user = '${id_user}' and id_follower = '${id_follower}'`;
    const row: any = await queryDb(sql);
    if (row.insertId >= 0) {
      let sql = `select count(id_follower) as followers from follow where id_user =  '${id_user}'`
      const row: any = await queryDb(sql);
      const followers = row[0].followers;
      return {
        followers: followers,
        message: 'accept follow success !'
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'accept follow failed, please try again later!');
    }
  },
  setOffline: async (id_user: string) => {
    try {
      const sql = `update user set off_time = NOW(), status = 'offline' where id_user = '${id_user}'`;
      const row: any = await queryDb(sql);
      if (row.insertId >= 0) {
        io.emit('status', { id_user, status: 'offline' });

        return {
          message: 'ok'
        }
      } else {
        console.log('offline failed, please try again later!')
        // throw new ApiError(httpStatus.BAD_REQUEST, 'offline failed, please try again later!');
      }
    } catch (error) {
      console.log(error)
    }
  },
  setOnline: async (id_user: string) => {
    try {
      const sql = `update user set  status = 'online' where id_user = '${id_user}'`;
      const row: any = await queryDb(sql);
      if (row.insertId >= 0) {
        io.emit('status', { id_user, status: 'online' });
        return {
          message: 'ok'
        }
      } else {
        console.log('offline failed, please try again later!')
        // throw new ApiError(httpStatus.BAD_REQUEST, 'offline failed, please try again later!');
      }
    } catch (error) {
      console.log(error)
    }
  },

}
export default userService;