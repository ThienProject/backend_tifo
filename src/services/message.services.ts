import uniqid from 'uniqid';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { IChat, IGetChatsByIDRoom, IGetRooms, IPayloadDleChats, IPayloadSearchRoom } from '../types/message';
import { TContext, sendMessage } from '../configs/connectGPT';


var _ = require('lodash');
const idChatbot = 'USER_3FSERABRKLGGAEPGS'
const checkRoomID = async (id_user: string, id_friend?: string) => {
  const sql = ` SELECT room.id_room
                FROM user_room
                INNER JOIN room ON user_room.id_room = room.id_room
                WHERE user_room.id_user = "${id_user}" 
                      AND room.id_room IN (
                                          SELECT id_room 
                                          FROM user_room 
                                          WHERE id_user = "${id_friend}" )
                      AND room.type = 'friend'
                                                      `;
  const room: any = await queryDb(sql);
  if (room[0]) {
    return room[0].id_room;
  }
  return false;
};
const getChatRecent = async () => {
  const chat: any = await queryDb(`
                  SELECT 
                  chat.id_chat, chat.datetime, chat.message, 
                  user_room.id_room, room.avatar as avatar_room, room.type, room.name,
                  user.id_user, user.fullname, user.username, user.avatar 
                  FROM chat 
                  JOIN user_room ON chat.id_user_room = user_room.id_user_room
                  LEFT JOIN room ON user_room.id_room = room.id_room
                  LEFT JOIN  user ON user.id_user = user_room.id_user
                  WHERE chat.id_chat = LAST_INSERT_ID();`)
  const newChat = chat[0];
  const currentDate = newChat.datetime;
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const date = `${year}-${month.toString().padStart(2, '0')}-${day}`;
  const id_room = newChat.id_room;
  const avatar = newChat.avatar_room;
  const name = newChat.name;
  const type = newChat.type;
  return { newChat, date, id_room, avatar, name, type };
}
const messageService = {
  createRoom: async ({ users, firstMessage, type = 'friend', name }: { users: { id_user: string, isOwner?: boolean }[], firstMessage?: string, type?: string, name?: string }) => {
    let id_room = '';
    let messageCreateGroup = '';
    if (users.length == 2)
      id_room = await checkRoomID(users[0].id_user, users[1].id_user);
    if (!id_room) {
      id_room = uniqid('ROOM_').toUpperCase();
      const sqlRoom = `insert into Room (id_room, type, name) values("${id_room}", "${type}", ${name ? `"${name}"` : null});`;
      const room: any = await queryDb(sqlRoom);
      if (room.insertId >= 0) {
        let id_owner = '';
        let sqlUserRoom = 'insert into user_room (id_user_room, id_user, id_room, role) values'
        users.forEach((user) => {
          const id_user_room = uniqid('RU_').toUpperCase();
          let role = 2;
          if (user.isOwner) {
            id_owner = id_user_room;
            role = 1;
          }
          sqlUserRoom += `("${id_user_room}", "${user.id_user}","${id_room}",${role}),`;
        })
        sqlUserRoom = sqlUserRoom.substring(0, sqlUserRoom.length - 1);
        const userRoom: any = await queryDb(sqlUserRoom);
        if (userRoom.insertId >= 0) {
          if (users.length > 2) {
            messageCreateGroup = 'I created this chat room!'
          }
          const message = firstMessage || messageCreateGroup;
          if (message) {
            const sqlChat = `insert into chat (id_user_room, message) values ("${id_owner}", "${message}");`
            const roomChat: any = await queryDb(sqlChat);
            if (roomChat.insertId < 0) {
              throw new ApiError(httpStatus.BAD_REQUEST, "`insert into chat fail !");
            }
          }
        }
      }
    }
    const { date, avatar, newChat } = await getChatRecent();
    return { id_room, chat: newChat, date, avatar };
  },
  getRooms: async (query: IGetRooms) => {
    let { id_user: id_me, offset, limit } = query;
    const roomChatbot = await queryDb(`
                            SELECT room.*
                            FROM user_room
                            INNER JOIN room ON user_room.id_room = room.id_room
                            WHERE user_room.id_user = "${id_me}" AND room.id_room IN (
                                SELECT id_room 
                                FROM user_room 
                                WHERE id_user = "${idChatbot}" )`);
    if (roomChatbot.length <= 0) {
      const roomChatBot: any = await messageService.createRoom({ users: [{ id_user: id_me!, isOwner: true }, { id_user: idChatbot }], type: 'chatbot' });
    }
    let sql = `SELECT room.id_room,
    room.name, 
    room.avatar as avatar_room,
    room.type,
    user.id_user,
    user.username,
    user.fullname,
    user.avatar,
    user.off_time,
    user.status,
    chatlimit.id_chat,
    chatlimit.message,
    chatlimit.datetime
    from room 
    join user_room ON room.id_room = user_room.id_room
    JOIN (SELECT user_room.id_room from user_room WHERE user_room.id_user ="${id_me}" 	limit ${limit} OFFSET ${offset}) as roomFilter on roomFilter.id_room = user_room.id_room
    JOIN user on user.id_user = user_room.id_user and user.status <> "banned"
    left JOIN ( 
            SELECT chat.* 
      		from user_room 
        	JOIN (
                SELECT user_room.id_room
                from user_room 
                WHERE user_room.id_user ="${id_me}" 
                GROUP by user_room.id_room
                limit ${limit} OFFSET ${offset}) as roomLimit on roomLimit.id_room = user_room.id_room
        	
            left JOIN chat on chat.id_user_room = user_room.id_user_room
            right JOIN (
                SELECT id_user_room, MAX(datetime) AS max_datetime
                FROM chat RIGHT JOIN chat_copy on chat_copy.id_chat = chat.id_chat 
        						and chat_copy.id_user = "${id_me}"
                GROUP BY chat.id_chat
                ORDER by chat.datetime DESC) AS latest_chat ON 
        									chat.id_user_room = latest_chat.id_user_room AND 												chat.datetime = latest_chat.max_datetime
        	
            GROUP by user_room.id_room
            ORDER by chat.datetime DESC) as chatlimit on
             								 user_room.id_user_room = chatlimit.id_user_room
     ORDER by chatlimit.datetime  DESC`;
    const rows: any = await queryDb(sql)
    const rooms: any[] = rows;
    if (rooms && rooms.length > 0) {
      const newRooms = rooms.reduce((previousValue, currentValue) => {
        const { id_room, avatar_room, name, type, id_user, username, status, off_time, avatar, fullname, id_chat, message, datetime } = currentValue;
        const user = { id_user, username, status, off_time, fullname, avatar };
        let chat = null;
        const index = previousValue.findIndex((item: any) => item.id_room === currentValue.id_room)

        if (id_chat) {
          const currentDate = datetime;
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1;
          const day = currentDate.getDate();
          const date = `${year}-${month.toString().padStart(2, '0')}-${day}`;
          chat = { [date]: [{ username, status, off_time, fullname, avatar, id_user, id_chat, message, datetime }] };
        }
        if (index === -1) {
          const newRoom: any = {
            id_room, name, avatar: avatar_room, type, users: [], chats: [chat]
          }
          if (user.id_user !== id_me) {
            newRoom.users = [user];
          }
          previousValue.push(newRoom);
          return previousValue
        } else {
          const indexUser = previousValue[index].users.findIndex((u: any) => u.id_user === user.id_user)
          if (user.id_user !== id_me || indexUser === -1) { previousValue[index].users.push(user); }
          if (id_chat) {
            previousValue[index].chats.push({ chat });
          }
          return previousValue;
        }
      }, [])
      return {
        rooms: newRooms,
        message: "Get rooms success!"
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "rooms does not exist !");
    }

  },
  getChatsByIDRoom: async (query: IGetChatsByIDRoom) => {
    const { id_user, id_room, limit, offset } = query;
    const sql = `select chat.*, user.id_user, user.fullname, user.username, user.avatar from 
              chat 
              LEFT JOIN user_room ON chat.id_user_room = user_room.id_user_room
              Left Join user on user_room.id_user = user.id_user
              right join chat_copy on chat_copy.id_chat = chat.id_chat and chat_copy.id_user = '${id_user}'
              where user_room.id_room = "${id_room}"
              ORDER by chat.datetime DESC
              limit ${limit} offset ${offset}`;
    const rows: any = await queryDb(sql);
    const chats: any[] = rows.reverse();
    if (chats.length > 0) {
      const newChats = chats.reduce((previousValue, currentValue) => {
        const currentDate = currentValue.datetime;
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const date = `${year}-${month.toString().padStart(2, '0')}-${day}`;
        const index = previousValue.findIndex((item: any) => Object.keys(item)[0] === date);
        if (index === -1) {
          previousValue.push({
            [date]: [currentValue]
          })
          return previousValue;
        } else {
          previousValue[index][date].push(
            currentValue
          )
          return previousValue;
        }
      }, [])
      return {
        chats: newChats,
        message: "Get chats success!"
      }
    }
    else {
      return {
        chats: [],
        message: "no chat yet!"
      }
    }
  },
  createChat: async (body: IChat) => {
    const {
      id_user: id_me,
      id_room,
      message,
    } = body

    let chat: any;
    if (id_room) {
      const sql = `INSERT INTO chat (id_user_room, message)
                  VALUES ((SELECT id_user_room FROM user_room 
                  WHERE id_room = "${id_room}" AND id_user = "${id_me}"), "${message?.replaceAll('"', '""')}");
                  `;
      chat = await queryDb(sql);
    }
    if (chat.insertId >= 0) {
      const { newChat, date, id_room } = await getChatRecent();
      return {
        chat: newChat,
        date,
        id_room,
        message: 'Create chat success !'
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'create chat failed, please try again later!');
    }
  },
  createFirstChat: async (body: IChat) => {
    const {
      id_user: id_me,
      message,
      id_friend
    } = body

    let room: any;

    const users: any = await queryDb(`select user.id_user, user.fullname, user.avatar, user.username from user where user.id_user = "${id_friend}" or user.id_user = "${id_me}" `);

    if (users.length >= 2 && id_me) {
      room = await messageService.createRoom({ users: [{ id_user: id_me!, isOwner: true }, { id_user: id_friend! }], firstMessage: message })
    }
    if (room) {
      const { newChat, date, id_room, avatar, name, type } = await getChatRecent();
      return {
        chat: newChat,
        users: users,
        date,
        id_room,
        avatar,
        type,
        name,
        message: 'Create chat success !'
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'create chat failed, please try again later!');
    }
  },
  deleteChats: async (body: IPayloadDleChats) => {
    const {
      id_user,
      id_room
    } = body
    const clearChats: any = await queryDb(`DELETE from chat_copy where chat_copy.id_user = "${id_user}" and chat_copy.id_chat in (select chat.id_chat from chat, user_room where user_room.id_room = "${id_room}" and chat.id_user_room = user_room.id_user_room  )`)
    if (clearChats.insertId >= 0) {
      return {
        message: 'Clear chat success !'
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'create chat failed, please try again later!');
    }
  },
  searchRoomOrUser: async (paramsBody: IPayloadSearchRoom) => {
    const { q, id_user, limit, offset } = paramsBody;
    try {
      const sql = `
            (SELECT user.id_user, user.fullname, user.username, user.avatar, room.id_room,room.name,  room.avatar as room_avatar, room.type
            FROM user
            LEFT JOIN user_room ON user.id_user = user_room.id_user
            left JOIN (SELECT  room.* from user_room, room  WHERE room.id_room = user_room.id_room and (room.type = 'friend' or room.type = 'chatbot') and user_room.id_user ="${id_user}") as Meroom on Meroom.id_room = user_room.id_room
            left JOIN room on room.id_room = Meroom.id_room
            WHERE user.id_user <> "${id_user}" and (user.id_user = "${id_user}" or fullname like "%${q}%" or username like "%${q}%")
            GROUP by  user.id_user
            ORDER BY user.fullname DESC) 
            UNION (select  '', '','','' , room.id_room, room.name,  room.avatar, room.type
                                 from room
                                 LEFT JOIN user_room ON room.id_room = user_room.id_room
                                 LEFT JOIN user ON user_room.id_user = user.id_user
                                 and user_room.id_room in (SELECT user_room.id_room from user_room  WHERE user_room.id_user ="${id_user}")
                                  WHERE room.type ='group' and (room.name like "%${q}%")
                                )  
            LIMIT ${limit} OFFSET ${offset} `;
      const users = await queryDb(sql)
      if (_.isEmpty(users)) {
        return {
          users,
          message: 'No account !'
        }
      }
      else {
        return {
          users,
          message: 'Search success !'
        }
      }
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error ? error.toString() : 'error');
    }

  },
  createChatGPT: async (body: IChat) => {
    const idGPT = 'USER_3FSERABRKLGGAEPGS';
    const {
      id_user: id_me,
      id_room,
      message,
    } = body
    let chat: any | null = null;
    let responseGPT = ''
    try {
      const getQuestionOld = await queryDb(`SELECT 
                  chat.message, chat.id_user_room from 
                  (SELECT id_user_room FROM user_room
                  WHERE id_room = "${id_room}") as roomNew , chat 
                  where chat.id_user_room = roomNew.id_user_room 
                  order by chat.datetime desc
                  limit 6 `);

      let contextMess: TContext = [];
      getQuestionOld.forEach((element, index) => {
        if (index % 2 === 0) {
          contextMess.push({ "role": "user", "content": element.message })
        }
        else {
          contextMess.push({ "role": "chatbot", "content": element.message })
        }
      });
      contextMess.push({ "role": "user", "content": message! })
      responseGPT = await sendMessage(contextMess);
    } catch (error: any) {
      throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
    if (id_room && responseGPT) {
      const sql = `INSERT INTO chat (id_user_room, message)
                  VALUES ((SELECT id_user_room FROM user_room
                  WHERE id_room = "${id_room}" AND id_user = "${idGPT}"), "${responseGPT}"), ((SELECT id_user_room FROM user_room 
                  WHERE id_room = "${id_room}" AND id_user = "${id_me}"), "${message}")
                  ;
                  `;
      chat = await queryDb(sql);
    }
    if (chat && chat.insertId >= 0) {
      const { newChat, date, id_room, avatar, name, type } = await getChatRecent();
      return {
        chat: newChat,
        date,
        id_room,
        message: 'gpt chat response success !'
      }
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'create chat failed, please try again later!');
    }
  },
}

export default messageService