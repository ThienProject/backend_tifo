"use strict";
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
const connectDB_1 = __importDefault(require("../configs/connectDB"));
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
const messageService = {
    createRoom: (id_user, id_friend, firstMessage, type) => __awaiter(void 0, void 0, void 0, function* () {
        const idFriend = id_friend ? id_friend : idChatbot;
        const roomType = type ? type : 'friend';
        let id_room = '';
        id_room = yield checkRoomID(id_user, id_friend);
        if (!id_room) {
            id_room = (0, uniqid_1.default)('ROOM_').toUpperCase();
            const sqlRoom = `insert into Room (id_room, type) values("${id_room}", "${roomType}");`;
            const id_user_room_friend = (0, uniqid_1.default)('RU_').toUpperCase();
            const id_user_room_me = (0, uniqid_1.default)('RU_').toUpperCase();
            const sqlUserRoom = `insert into user_room (id_user_room, id_user, id_room) values("${id_user_room_friend}", "${idFriend}","${id_room}"),("${id_user_room_me}", "${id_user}","${id_room}");`;
            const room = yield (0, connectDB_1.default)(sqlRoom);
            if (room.insertId >= 0) {
                const userRoom = yield (0, connectDB_1.default)(sqlUserRoom);
                if (userRoom.insertId >= 0) {
                    if (firstMessage) {
                        const sqlChat = `insert into chat (id_user_room, message) values ("${id_user_room_me}", "${firstMessage}");`;
                        return yield (0, connectDB_1.default)(sqlChat);
                    }
                    else {
                        return userRoom;
                    }
                }
            }
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
            const roomChatBot = yield messageService.createRoom(id_me, undefined, undefined, 'chatbot');
            if (roomChatBot.insertId < 0) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "rooms does not exist !");
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
        const rows = yield (0, connectDB_1.default)(sql);
        const rooms = rows;
        if (rooms && rooms.length > 0) {
            const newRooms = rooms.reduce((previousValue, currentValue) => {
                const { id_room, avatar_room, name, type, id_user, username, status, off_time, avatar, fullname, id_chat, message, datetime } = currentValue;
                const user = { id_user, username, status, off_time, fullname, avatar };
                let chat = null;
                const index = previousValue.findIndex((item) => item.id_room === currentValue.id_room);
                if (id_chat) {
                    const currentDate = datetime;
                    const year = currentDate.getFullYear();
                    const month = currentDate.getMonth() + 1;
                    const day = currentDate.getDate();
                    const date = `${year}-${month.toString().padStart(2, '0')}-${day}`;
                    chat = { [date]: [{ username, status, off_time, fullname, avatar, id_user, id_chat, message, datetime }] };
                }
                if (index === -1) {
                    const newRoom = {
                        id_room, name, avatar: avatar_room, type, users: [], chats: [chat]
                    };
                    if (user.id_user !== id_me) {
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
    getChatsByIDRoom: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, id_room, limit, offset } = query;
        const sql = `select chat.*, user.id_user, user.fullname, user.username, user.avatar from 
              chat 
              LEFT JOIN user_room ON chat.id_user_room = user_room.id_user_room
              Left Join user on user_room.id_user = user.id_user
              right join chat_copy on chat_copy.id_chat = chat.id_chat and chat_copy.id_user = '${id_user}'
              where user_room.id_room = "${id_room}"
              ORDER by chat.datetime DESC
              limit ${limit} offset ${offset}`;
        const rows = yield (0, connectDB_1.default)(sql);
        const chats = rows.reverse();
        if (chats.length > 0) {
            const newChats = chats.reduce((previousValue, currentValue) => {
                const currentDate = currentValue.datetime;
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth() + 1;
                const day = currentDate.getDate();
                const date = `${year}-${month.toString().padStart(2, '0')}-${day}`;
                const index = previousValue.findIndex((item) => Object.keys(item)[0] === date);
                if (index === -1) {
                    previousValue.push({
                        [date]: [currentValue]
                    });
                    return previousValue;
                }
                else {
                    previousValue[index][date].push(currentValue);
                    return previousValue;
                }
            }, []);
            return {
                chats: newChats,
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
        const { id_user: id_me, id_room, message, } = body;
        let chat;
        if (id_room) {
            const sql = `INSERT INTO chat (id_user_room, message)
                  VALUES ((SELECT id_user_room FROM user_room 
                  WHERE id_room = "${id_room}" AND id_user = "${id_me}"), "${message === null || message === void 0 ? void 0 : message.replaceAll('"', '""')}");
                  `;
            chat = yield (0, connectDB_1.default)(sql);
        }
        if (chat.insertId >= 0) {
            const getChatRecent = yield (0, connectDB_1.default)(`
                  SELECT chat.id_chat, chat.datetime, user_room.id_room, room.avatar as avatar_room, room.type, room.name,
                  user.fullname, user.username, user.avatar 
                  FROM chat 
                  JOIN user_room ON chat.id_user_room = user_room.id_user_room
                  LEFT JOIN room ON user_room.id_room = room.id_room
                  LEFT JOIN  user ON user.id_user = user_room.id_user
                  WHERE chat.id_chat = LAST_INSERT_ID();`);
            const newChat = getChatRecent[0];
            const currentDate = newChat.datetime;
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const day = currentDate.getDate();
            const date = `${year}-${month.toString().padStart(2, '0')}-${day}`;
            return {
                chat: Object.assign(Object.assign({}, newChat), { id_user: id_me, message }),
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
        let chat;
        const users = yield (0, connectDB_1.default)(`select user.id_user, user.fullname, user.avatar, user.username from user where user.id_user = "${id_friend}" or user.id_user = "${id_me}" `);
        if (users.length >= 2 && id_me) {
            chat = yield messageService.createRoom(id_me, id_friend, message);
        }
        if (chat.insertId >= 0) {
            const getChatRecent = yield (0, connectDB_1.default)(`
                  SELECT chat.id_chat, chat.datetime, user_room.id_room, room.avatar as avatar_room, room.type, room.name,
                  user.fullname, user.username, user.avatar 
                  FROM chat 
                  JOIN user_room ON chat.id_user_room = user_room.id_user_room
                  LEFT JOIN room ON user_room.id_room = room.id_room
                  LEFT JOIN  user ON user.id_user = user_room.id_user
                  WHERE chat.id_chat = LAST_INSERT_ID();`);
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
                chat: Object.assign(Object.assign({}, newChat), { id_user: id_me, message }),
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
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'create chat failed, please try again later!');
        }
    }),
    searchRoomOrUser: (paramsBody) => __awaiter(void 0, void 0, void 0, function* () {
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
            const users = yield (0, connectDB_1.default)(sql);
            if (_.isEmpty(users)) {
                return {
                    users,
                    message: 'No account !'
                };
            }
            else {
                return {
                    users,
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
            const sql = `INSERT INTO chat (id_user_room, message)
                  VALUES ((SELECT id_user_room FROM user_room
                  WHERE id_room = "${id_room}" AND id_user = "${idGPT}"), "${responseGPT}"), ((SELECT id_user_room FROM user_room 
                  WHERE id_room = "${id_room}" AND id_user = "${id_me}"), "${message}")
                  ;
                  `;
            chat = yield (0, connectDB_1.default)(sql);
        }
        if (chat && chat.insertId >= 0) {
            const getChatRecent = yield (0, connectDB_1.default)(`
                  SELECT chat.id_chat, chat.message, chat.datetime, user_room.id_room, room.avatar as avatar_room, room.type, room.name,
                  user.fullname, user.username, user.avatar 
                  FROM chat 
                  JOIN user_room ON chat.id_user_room = user_room.id_user_room
                  LEFT JOIN room ON user_room.id_room = room.id_room
                  LEFT JOIN  user ON user.id_user = user_room.id_user
                  WHERE chat.id_chat = LAST_INSERT_ID();`);
            const newChat = getChatRecent[0];
            const currentDate = newChat.datetime;
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const day = currentDate.getDate();
            const date = `${year}-${month.toString().padStart(2, '0')}-${day}`;
            return {
                chat: Object.assign(Object.assign({}, newChat), { id_user: idGPT }),
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
