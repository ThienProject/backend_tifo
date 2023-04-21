import uniqid from 'uniqid';
import queryDb from '../configs/connectDB';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { IChat, IGetChatsByIDRoom, IGetRooms, IPayloadSearchRoom } from '../types/message';
import { create } from 'domain';
import { TContext, sendMessage } from '../configs/connectGPT';


var _ = require('lodash');
const idChatbot = 'USER_3FSERABRKLGGAEPGS'
const messageService = {
  createRoom: async (id_user: string, id_friend?: string, firstMessage?: string, type?: string) => {
    console.log("có zô")
    const idFriend = id_friend ? id_friend : 'USER_3FSERABRKLGGAEPGS';
    const roomType = type ? type : 'friend';
    const id_room = uniqid('ROOM_').toUpperCase();
    const sqlRoom = `insert into Room (id_room, type) values('${id_room}', '${roomType}');`;
    const id_user_room_friend = uniqid('RU_').toUpperCase();
    const id_user_room_me = uniqid('RU_').toUpperCase();
    const sqlUserRoom = `insert into user_room (id_user_room, id_user, id_room) values('${id_user_room_friend}', '${idFriend}','${id_room}'),('${id_user_room_me}', '${id_user}','${id_room}');`;
    const room: any = await queryDb(sqlRoom);
    console.log("room----------", room)
    if (room.insertId >= 0) {
      const userRoom: any = await queryDb(sqlUserRoom);
      if (userRoom.insertId >= 0) {
        if (firstMessage) {
          const sqlChat = `insert into chat (id_user_room, message) values ('${id_user_room_me}', '${firstMessage}');`
          return await queryDb(sqlChat);
        } else { return userRoom }
      }
    }
  },
  getRooms: async (query: IGetRooms) => {
    let { id_user: id_me, offset, limit } = query;
    const roomChatbot = await queryDb(`
                            SELECT room.*
                            FROM user_room
                            INNER JOIN room ON user_room.id_room = room.id_room
                            WHERE user_room.id_user = '${id_me}' AND room.id_room IN (
                                SELECT id_room 
                                FROM user_room 
                                WHERE id_user = '${idChatbot}' )`);
    if (roomChatbot.length <= 0) {
      const roomChatBot: any = await messageService.createRoom(id_me!, undefined, undefined, 'chatbot');
      if (roomChatBot.insertId < 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "rooms does not exist !");
      }
    }
    let sql = `SELECT room.id_room,
    room.name, 
    room.avatar as avatar_room,
    room.type,
    user.id_user,
    user.username,
    user.fullname,
    user.avatar,
    chatlimit.id_chat,
    chatlimit.message,
    chatlimit.datetime
    from room 
    join user_room ON room.id_room = user_room.id_room
    JOIN (SELECT user_room.id_room from user_room WHERE user_room.id_user ='${id_me}' limit ${limit} OFFSET ${offset}) as roomFilter on roomFilter.id_room = user_room.id_room
    JOIN user on user.id_user = user_room.id_user
    left JOIN (SELECT chat.*  
      from chat, user_room JOIN (
    		SELECT user_room.id_room
    		from user_room 
    		WHERE user_room.id_user ='${id_me}' 
          	limit ${limit} OFFSET ${offset}) 
      as roomLimit on roomLimit.id_room = user_room.id_room
     WHERE chat.id_user_room = user_room.id_user_room 
     GROUP by user_room.id_room
     ORDER by chat.datetime desc
     )as chatlimit on user_room.id_user_room = chatlimit.id_user_room
      ORDER by chatlimit.datetime  DESC`;
    const rows: any = await queryDb(sql)
    const rooms: any[] = rows;
    if (rooms && rooms.length > 0) {
      const newRooms = rooms.reduce((previousValue, currentValue) => {
        const { id_room, avatar_room, name, type, id_user, username, avatar, fullname, id_chat, message, datetime } = currentValue;
        const user = { id_user, username, fullname, avatar };
        let chat = null;
        const index = previousValue.findIndex((item: any) => item.id_room === currentValue.id_room)

        if (id_chat) {
          const currentDate = datetime;
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1;
          const day = currentDate.getDate();
          const date = `${year}-${month.toString().padStart(2, '0')}-${day}`;
          chat = { [date]: [{ username, fullname, avatar, id_user, id_chat, message, datetime }] };
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
    const { id_room, limit, offset } = query;
    const sql = `select chat.*, user.id_user, user.fullname, user.username, user.avatar from 
              chat 
              LEFT JOIN user_room ON chat.id_user_room = user_room.id_user_room
              Left Join user on user_room.id_user = user.id_user
              where user_room.id_room = '${id_room}'
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
                  WHERE id_room = '${id_room}' AND id_user = '${id_me}'), '${message}');
                  `;
      chat = await queryDb(sql);
    }
    if (chat.insertId >= 0) {
      const getChatRecent: any = await queryDb(`
                  SELECT chat.id_chat, chat.datetime, user_room.id_room, room.avatar as avatar_room, room.type, room.name,
                  user.fullname, user.username, user.avatar 
                  FROM chat 
                  JOIN user_room ON chat.id_user_room = user_room.id_user_room
                  LEFT JOIN room ON user_room.id_room = room.id_room
                  LEFT JOIN  user ON user.id_user = user_room.id_user
                  WHERE chat.id_chat = LAST_INSERT_ID();`)
      const newChat = getChatRecent[0];
      const currentDate = newChat.datetime;
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const date = `${year}-${month.toString().padStart(2, '0')}-${day}`;
      return {
        chat: {
          ...newChat,
          id_user: id_me,
          message
        },
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

    let chat: any;

    const users: any = await queryDb(`select user.id_user, user.fullname, user.avatar, user.username from user where user.id_user = '${id_friend}' or user.id_user = '${id_me}' `);
    console.log(users)
    if (users.length >= 2 && id_me) {
      chat = await messageService.createRoom(id_me, id_friend, message)
    }
    if (chat.insertId >= 0) {
      const getChatRecent: any = await queryDb(`
                  SELECT chat.id_chat, chat.datetime, user_room.id_room, room.avatar as avatar_room, room.type, room.name,
                  user.fullname, user.username, user.avatar 
                  FROM chat 
                  JOIN user_room ON chat.id_user_room = user_room.id_user_room
                  LEFT JOIN room ON user_room.id_room = room.id_room
                  LEFT JOIN  user ON user.id_user = user_room.id_user
                  WHERE chat.id_chat = LAST_INSERT_ID();`)
      const newChat = getChatRecent[0];
      const currentDate = newChat.datetime;
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const date = `${year}-${month.toString().padStart(2, '0')}-${day}`;
      const id_room = newChat.id_room;
      const avatar = newChat.avatar_room;
      const name = newChat.name;
      const type = newChat.type;
      return {
        chat: {
          ...newChat,
          id_user: id_me,
          message
        },
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
  searchRoomOrUser: async (paramsBody: IPayloadSearchRoom) => {
    const { q, id_user, limit, offset } = paramsBody;
    try {
      const users = await queryDb(`
            (SELECT user.id_user, user.fullname, user.username, user.avatar, room.id_room,room.name,  room.avatar as room_avatar, room.type 
FROM user 
LEFT JOIN user_room ON user.id_user = user_room.id_user 
LEFT JOIN room ON room.id_room = user_room.id_room AND (room.type = 'friend' or room.type = 'chatbot')
and user_room.id_room in (SELECT user_room.id_room from user_room  WHERE user_room.id_user ='${id_user}')
WHERE user.id_user <> '${id_user}' and (user.id_user = "${q}" or fullname like "%${q}%" or username like "%${q}%")
GROUP by user.id_user
ORDER BY user.fullname DESC) UNION (select  '', '','','' , room.id_room, room.name,  room.avatar, room.type 
                                 from room 
                                 LEFT JOIN user_room ON room.id_room = user_room.id_room
                                 LEFT JOIN user ON user_room.id_user = user.id_user
                                 and user_room.id_room in (SELECT user_room.id_room from user_room  WHERE user_room.id_user ='${id_user}')
                                  WHERE room.type ='group' and (room.name like "%${q}%")
                                )  
LIMIT ${limit} OFFSET ${offset}
      `)
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
                  WHERE id_room = '${id_room}') as roomNew , chat 
                  where chat.id_user_room = roomNew.id_user_room 
                  order by chat.datetime desc
                  limit 10 `);

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
                  WHERE id_room = '${id_room}' AND id_user = '${idGPT}'), "${responseGPT}"), ((SELECT id_user_room FROM user_room 
                  WHERE id_room = '${id_room}' AND id_user = '${id_me}'), "${message}")
                  ;
                  `;
      chat = await queryDb(sql);
    }
    if (chat && chat.insertId >= 0) {
      const getChatRecent: any = await queryDb(`
                  SELECT chat.id_chat, chat.message, chat.datetime, user_room.id_room, room.avatar as avatar_room, room.type, room.name,
                  user.fullname, user.username, user.avatar 
                  FROM chat 
                  JOIN user_room ON chat.id_user_room = user_room.id_user_room
                  LEFT JOIN room ON user_room.id_room = room.id_room
                  LEFT JOIN  user ON user.id_user = user_room.id_user
                  WHERE chat.id_chat = LAST_INSERT_ID();`)
      const newChat = getChatRecent[0];
      const currentDate = newChat.datetime;
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const date = `${year}-${month.toString().padStart(2, '0')}-${day}`;
      return {
        chat: {
          ...newChat,
          id_user: idGPT,
        },
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