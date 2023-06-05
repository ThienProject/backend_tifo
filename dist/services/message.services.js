"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("uniqid"));
const connectDB_1 = __importStar(require("../configs/connectDB"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const connectGPT_1 = require("../configs/connectGPT");
var _ = require('lodash');
const idChatbot = 'USER_3FSERABRKLGGAEPGS';
const checkRoomID = (id_user, id_friend) => __awaiter(void 0, void 0, void 0, function* () {
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
    const room = yield (0, connectDB_1.default)(sql);
    if (room[0]) {
        return room[0].id_room;
    }
    return false;
});
const getChatRecent = () => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield (0, connectDB_1.default)(`
                  SELECT 
                  chat.id_chat, chat.datetime, chat.message, chat.type as chat_type, chat.id_affected, chat.image,
                  chat_affected.username as affected_username,
                  user_room.id_room, room.avatar as avatar_room, room.type, room.name,
                  user.id_user, user.fullname, user.username, user.avatar 
                  FROM chat 
                  JOIN user_room ON chat.id_user_room = user_room.id_user_room
                  LEFT JOIN room ON user_room.id_room = room.id_room
                  LEFT JOIN user ON user.id_user = user_room.id_user
                  left join (select chat.id_chat, user.* from user, chat where chat.id_chat = LAST_INSERT_ID() and chat.id_affected = user.id_user ) as chat_affected on chat_affected.id_chat = chat.id_chat
                  WHERE chat.id_chat = LAST_INSERT_ID()
                  order by chat.datetime
                  ;`);
    const newChat = chat[0];
    const currentDate = newChat.datetime;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const id_room = newChat.id_room;
    const avatar = newChat.avatar_room;
    const name = newChat.name;
    const type = newChat.type;
    newChat.type = newChat.chat_type;
    return { newChat, date, id_room, avatar, name, type };
});
const messageService = {
    createRoom: ({ users, firstMessage, type = 'friend', name }) => __awaiter(void 0, void 0, void 0, function* () {
        let id_room = '';
        if (users.length == 2)
            id_room = yield checkRoomID(users[0].id_user, users[1].id_user);
        if (!id_room) {
            id_room = (0, uniqid_1.default)('ROOM_').toUpperCase();
            const sqlRoom = `insert into room (id_room, type, name) values("${id_room}", "${type}", ${name ? `"${name}"` : null});`;
            const room = yield (0, connectDB_1.default)(sqlRoom);
            if (room.insertId >= 0) {
                let id_owner = '';
                let sqlUserRoom = 'insert into user_room (id_user_room, id_user, id_room, role) values';
                users.forEach((user) => {
                    const id_user_room = (0, uniqid_1.default)('RU_').toUpperCase();
                    let role = 2;
                    if (user.isOwner) {
                        id_owner = id_user_room;
                        role = 1;
                    }
                    sqlUserRoom += `("${id_user_room}", "${user.id_user}","${id_room}",${role}),`;
                });
                sqlUserRoom = sqlUserRoom.substring(0, sqlUserRoom.length - 1);
                const userRoom = yield (0, connectDB_1.default)(sqlUserRoom);
                if (userRoom.insertId >= 0) {
                    const message = firstMessage;
                    let sqlChat = '';
                    if (message) {
                        sqlChat = `insert into chat (id_user_room, message) values ("${id_owner}", "${message}");`;
                    }
                    else {
                        sqlChat = `insert into chat (id_user_room, type) values ("${id_owner}", "create");`;
                    }
                    const roomChat = yield (0, connectDB_1.default)(sqlChat);
                    if (roomChat.insertId < 0) {
                        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "`insert into chat fail !");
                    }
                }
            }
        }
        const { date, avatar, newChat } = yield getChatRecent();
        return { id_room, chat: newChat, date, avatar };
    }),
    addMembers: ({ users, id_room, id_user }) => __awaiter(void 0, void 0, void 0, function* () {
        let sqlUserRoom = 'insert into user_room (id_user_room, id_user, id_room, role) values';
        let sqlActions = `insert into chat (id_user_room, type, id_affected) values`;
        let sqlGetUserNew = 'select user.id_user, user.username, user.avatar, user.fullname from user where ';
        users.forEach((user) => {
            const id_user_room = (0, uniqid_1.default)('RU_').toUpperCase();
            let role = 2;
            if (user.isOwner) {
                role = 1;
            }
            sqlUserRoom += `("${id_user_room}", "${user.id_user}","${id_room}",${role}),`;
            sqlActions += `((select user_room.id_user_room from user_room where id_room = '${id_room}' and id_user = '${id_user}'), "add", "${user.id_user}"),`;
            sqlGetUserNew += `id_user = "${user.id_user}" or `;
        });
        sqlUserRoom = sqlUserRoom.substring(0, sqlUserRoom.length - 1);
        sqlActions = sqlActions.substring(0, sqlActions.length - 1);
        sqlGetUserNew = sqlGetUserNew.substring(0, sqlGetUserNew.length - 3);
        const userRoom = yield (0, connectDB_1.default)(sqlUserRoom);
        if (userRoom.insertId >= 0) {
            yield (0, connectDB_1.default)(sqlActions);
            const { chats, room } = yield messageService.getChatsByIDRoom({ id_room, id_user, limit: users.length });
            const newUsers = yield (0, connectDB_1.default)(sqlGetUserNew);
            return {
                chats: chats,
                limit: users.length,
                newUsers,
                room,
                message: 'add members success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "`add members fail !");
        }
    }),
    getUsersByIDRoom: (paramsBody) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_room } = paramsBody;
        try {
            const sql = `
            SELECT user.id_user, user.fullname, user.username, user.avatar, user_room.role
            FROM user
            LEFT JOIN user_room ON user.id_user = user_room.id_user
            where user_room.id_room = '${id_room}'
            `;
            const users = yield (0, connectDB_1.default)(sql);
            if (_.isEmpty(users)) {
                return {
                    users,
                    message: 'No users in room !'
                };
            }
            else {
                return {
                    users,
                    message: 'get users success !'
                };
            }
        }
        catch (error) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error ? error.toString() : 'error');
        }
    }),
    getRooms: (query) => __awaiter(void 0, void 0, void 0, function* () {
        let { id_user: id_me, offset, limit } = query;
        const roomChatbot = yield (0, connectDB_1.default)(`
                            SELECT room.*
                            FROM user_room
                            INNER JOIN room ON user_room.id_room = room.id_room
                            WHERE user_room.id_user = "${id_me}" AND room.id_room IN (
                                SELECT id_room 
                                FROM user_room 
                                WHERE id_user = "${idChatbot}" )`);
        if (roomChatbot.length <= 0) {
            yield messageService.createRoom({ users: [{ id_user: id_me, isOwner: true }, { id_user: idChatbot }], type: 'chatbot' });
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
    user.invisible,
    user_room.role,
    chatlimit.id_chat,
    chatlimit.message,
    chatlimit.type as chat_type,
    chatlimit.id_affected,
    chatlimit.affected_username,
    chatlimit.datetime
    from room 
    join user_room ON room.id_room = user_room.id_room
    JOIN (SELECT user_room.id_room from user_room WHERE user_room.id_user ="${id_me}" 	limit ${limit} OFFSET ${offset}) as roomFilter on roomFilter.id_room = user_room.id_room
    JOIN user on user.id_user = user_room.id_user  and user.id_user not in (select banned.id_user from banned)
    left JOIN ( 
            SELECT chat.* , user.username as affected_username
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
        									chat.id_user_room = latest_chat.id_user_room AND chat.datetime = latest_chat.max_datetime
            left join user on user.id_user = chat.id_affected
            GROUP by user_room.id_room
            ORDER by chat.datetime DESC) as chatlimit on
             								 user_room.id_user_room = chatlimit.id_user_room
     ORDER by chatlimit.datetime  DESC`;
        const rows = yield (0, connectDB_1.default)(sql);
        const rooms = rows;
        if (rooms && rooms.length > 0) {
            const newRooms = rooms.reduce((previousValue, currentValue) => {
                const { id_room, avatar_room, name, type, id_user, username, status, off_time, chat_type, affected_username, invisible, role, avatar, fullname, id_chat, message, datetime } = currentValue;
                const user = { id_user, username, status, off_time, invisible, role, fullname, avatar };
                let chat = null;
                const index = previousValue.findIndex((item) => item.id_room === currentValue.id_room);
                if (id_chat) {
                    const currentDate = datetime;
                    const year = currentDate.getFullYear();
                    const month = currentDate.getMonth() + 1;
                    const day = currentDate.getDate();
                    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                    chat = { [date]: [{ username, status, off_time, invisible, fullname, avatar, id_user, id_chat, message, datetime, type: chat_type, affected_username }] };
                }
                if (index === -1) {
                    const newRoom = {
                        id_room, name, avatar: avatar_room, type, users: [], chats: [chat]
                    };
                    if (user.id_user !== id_me || newRoom.type === 'group') {
                        newRoom.users = [user];
                    }
                    previousValue.push(newRoom);
                    return previousValue;
                }
                else {
                    const indexUser = previousValue[index].users.findIndex((u) => u.id_user === user.id_user);
                    if (user.id_user !== id_me || indexUser === -1) {
                        previousValue[index].users.push(user);
                    }
                    if (id_chat) {
                        previousValue[index].chats.push({ chat });
                    }
                    return previousValue;
                }
            }, []);
            return {
                rooms: newRooms,
                message: "Get rooms success!"
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "rooms does not exist !");
        }
    }),
    deleteRoom: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_room } = body;
        const clearChats = yield (0, connectDB_1.default)(`DELETE from room where room.id_room = "${id_room}"`);
        if (clearChats.insertId >= 0) {
            return {
                message: 'Delete room success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Delete room failed, please try again later!');
        }
    }),
    deleteUser: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_room, id_user, id_owner } = body;
        const clearChats = yield (0, connectDB_1.default)(`DELETE from user_room where user_room.id_user = "${id_user}" and user_room.id_room = "${id_room}"`);
        if (clearChats.insertId >= 0) {
            if (id_owner) {
                const sqlChat = `insert into chat (id_user_room, type, id_affected) values ((select user_room.id_user_room from user_room where id_room = '${id_room}' and id_user = "${id_owner}"), "remove", "${id_user}" );`;
                const roomChat = yield (0, connectDB_1.default)(sqlChat);
                if ((roomChat.insertId >= 0)) {
                    const { date, avatar, newChat } = yield getChatRecent();
                    return { id_room, chat: newChat, date, avatar, message: 'Delete room success !' };
                }
                else {
                    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Delete room failed, please try again later!');
                }
            }
            else {
                return { id_room, message: 'Delete room success !' };
            }
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Delete room failed, please try again later!');
        }
    }),
    getChatsByIDRoom: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, id_room, limit, offset } = query;
        const sql = `select * from
                (select chat.*, user.id_user,
                  chat_affected.username as affected_username   
                  from
                  chat
                  LEFT JOIN user_room ON chat.id_user_room = user_room.id_user_room
                  Left Join user on user_room.id_user = user.id_user  

                  right join chat_copy on chat_copy.id_chat = chat.id_chat and chat_copy.id_user = '${id_user}'
                  left join (select chat.id_chat, user.* from user, chat WHERE chat.id_affected = user.id_user ) as chat_affected on chat_affected.id_chat = chat.id_chat
                  left join room on room.id_room = user_room.id_room  

                  where user_room.id_room =  "${id_room}"  

                  ORDER by chat.datetime DESC
                  limit ${limit} OFFSET ${offset || 0}   ) as chatFilter right JOIN  (select  user.id_user,
                  user.fullname,
                  user.username,
                  user.avatar  ,
                    room.id_room,
                    room.type as room_type,
                    room.avatar as room_avatar,
                    room.name
                   from user,  user_room , room
                   WHERE user_room.id_room =  "${id_room}" 

                   and room.id_room = user_room.id_room
                   and user_room.id_user = user.id_user   )
                   as userInRom on userInRom.id_user = chatFilter.id_user 
                   ORDER by chatFilter.datetime DESC
                   `;
        const rows = yield (0, connectDB_1.default)(sql);
        const chats = rows.reverse();
        if (chats.length > 0) {
            const { room_type: type, id_room, name, room_avatar } = chats[0];
            const newChats = chats.reduce((previousValue, currentValue) => {
                var _a;
                const { avatar, username, fullname, id_user } = currentValue;
                const indexUser = previousValue.users.findIndex((item) => item.id_user === id_user);
                if (indexUser == -1) {
                    previousValue.users.push({ avatar, username, fullname, id_user });
                }
                if (currentValue.id_chat) {
                    const currentDate = currentValue.datetime;
                    const year = currentDate.getFullYear();
                    const month = currentDate.getMonth() + 1;
                    const day = currentDate.getDate();
                    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                    const index = (_a = previousValue.chats) === null || _a === void 0 ? void 0 : _a.findIndex((item) => Object.keys(item)[0] === date);
                    if (index === -1) {
                        previousValue.chats.push({
                            [date]: [currentValue]
                        });
                    }
                    else {
                        previousValue.chats[index][date].push(currentValue);
                    }
                }
                return previousValue;
            }, { chats: [], users: [] });
            return {
                chats: newChats.chats,
                room: { type, id_room, name, avatar: room_avatar, users: newChats.users },
                message: "Get chats success!"
            };
        }
        else {
            return {
                chats: [],
                message: "no chat yet!"
            };
        }
    }),
    createChat: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user: id_me, id_room, message, type, image } = body;
        let chat;
        if (id_room) {
            const sql = `INSERT INTO chat (id_user_room, message, type, image)
                  VALUES ((SELECT id_user_room FROM user_room 
                  WHERE id_room = "${id_room}" AND id_user = "${id_me}"), ?, ?, ?);
                  `;
            chat = yield (0, connectDB_1.executeDb)(sql, [message || null, type || null, image || null]);
        }
        if ((chat === null || chat === void 0 ? void 0 : chat.insertId) >= 0) {
            const { newChat, date, id_room } = yield getChatRecent();
            return {
                chat: newChat,
                date,
                id_room,
                message: 'Create chat success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'create chat failed, please try again later!');
        }
    }),
    createFirstChat: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user: id_me, message, id_friend } = body;
        let room;
        const users = yield (0, connectDB_1.default)(`select user.id_user, user.fullname, user.avatar, user.username from user where user.id_user = "${id_friend}" or user.id_user = "${id_me}" `);
        if (users.length >= 2 && id_me) {
            room = yield messageService.createRoom({ users: [{ id_user: id_me, isOwner: true }, { id_user: id_friend }], firstMessage: message });
        }
        if (room) {
            const { newChat, date, id_room, avatar, name, type } = yield getChatRecent();
            return {
                chat: newChat,
                users: users,
                date,
                id_room,
                avatar,
                type,
                name,
                message: 'Create chat success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'create chat failed, please try again later!');
        }
    }),
    deleteChats: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, id_room } = body;
        const clearChats = yield (0, connectDB_1.default)(`DELETE from chat_copy where chat_copy.id_user = "${id_user}" and chat_copy.id_chat in (select chat.id_chat from chat, user_room where user_room.id_room = "${id_room}" and chat.id_user_room = user_room.id_user_room  )`);
        if (clearChats.insertId >= 0) {
            return {
                message: 'Clear chat success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Clear chat failed, please try again later!');
        }
    }),
    searchRoomOrUser: (paramsBody) => __awaiter(void 0, void 0, void 0, function* () {
        const { q, id_user, limit, offset } = paramsBody;
        try {
            const sql = `
            (SELECT user.id_user, user.fullname, user.username, user.avatar, room.id_room,room.name,  room.avatar as room_avatar, room.type
            FROM user
            LEFT JOIN user_room ON user.id_user = user_room.id_user
            left JOIN (SELECT  room.* from user_room, room  WHERE room.id_room = user_room.id_room and (room.type = 'friend' or room.type = 'chatbot') and user_room.id_user ="${id_user}") 
              as Meroom on Meroom.id_room = user_room.id_room  
            left JOIN room on room.id_room = Meroom.id_room
            WHERE user.id_user not in (select banned.id_user from banned) and user.id_user <> "${id_user}" and (user.id_user = "${id_user}" or fullname like "%${q}%" or username like "%${q}%")
            GROUP by user.id_user, room.id_room
            ORDER BY user.fullname , room.id_room DESC) 
            UNION (select  '', '','','' , room.id_room, room.name,  room.avatar, room.type
                                 from room
                                 LEFT JOIN user_room ON room.id_room = user_room.id_room
                                 LEFT JOIN user ON user_room.id_user = user.id_user 
                                 and user_room.id_room in (SELECT user_room.id_room from user_room  WHERE user_room.id_user ="${id_user}")
                                  
                                  WHERE room.type ='group' and (room.name like "%${q}%") and user.id_user  not in (select banned.id_user from banned)
                                )  
            LIMIT ${limit} OFFSET ${offset} `;
            const users = yield (0, connectDB_1.default)(sql);
            const newUsers = users.reduce((array, currentValue) => {
                const indexUser = array.findIndex((item) => item.id_user === currentValue.id_user);
                if (indexUser != -1) {
                    if (currentValue.id_room) {
                        array[indexUser] = currentValue;
                    }
                }
                else {
                    array.push(currentValue);
                }
                return array;
            }, []);
            if (_.isEmpty(users)) {
                return {
                    users,
                    message: 'No account !'
                };
            }
            else {
                return {
                    users: newUsers,
                    message: 'Search success !'
                };
            }
        }
        catch (error) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error ? error.toString() : 'error');
        }
    }),
    createChatGPT: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const idGPT = 'USER_3FSERABRKLGGAEPGS';
        const { id_user: id_me, id_room, message, } = body;
        let chat = null;
        let responseGPT = '';
        try {
            const getQuestionOld = yield (0, connectDB_1.default)(`SELECT 
                  chat.message, chat.id_user_room from 
                  (SELECT id_user_room FROM user_room
                  WHERE id_room = "${id_room}") as roomNew , chat 
                  where chat.id_user_room = roomNew.id_user_room 
                  order by chat.datetime desc
                  limit 6 `);
            let contextMess = [];
            getQuestionOld.forEach((element, index) => {
                if (index % 2 === 0) {
                    contextMess.push({ "role": "user", "content": element.message });
                }
                else {
                    contextMess.push({ "role": "chatbot", "content": element.message });
                }
            });
            contextMess.push({ "role": "user", "content": message });
            responseGPT = yield (0, connectGPT_1.sendMessage)(contextMess);
        }
        catch (error) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error);
        }
        if (id_room && responseGPT) {
            const sql = `INSERT INTO chat (id_user_room, message, datetime)
                  VALUES 
                  ((SELECT id_user_room FROM user_room
                  WHERE id_room = "${id_room}" AND id_user = "${idGPT}"), "${responseGPT}",(DATE_ADD(NOW(), INTERVAL 1 SECOND))),
                  ((SELECT id_user_room FROM user_room
                  WHERE id_room = "${id_room}" AND id_user = "${id_me}"), "${message}", (NOW()));
                  `;
            chat = yield (0, connectDB_1.default)(sql);
        }
        if (chat && chat.insertId >= 0) {
            const { newChat, date, id_room, avatar, name, type } = yield getChatRecent();
            return {
                chat: newChat,
                date,
                id_room,
                message: 'gpt chat response success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'create chat failed, please try again later!');
        }
    }),
};
exports.default = messageService;
