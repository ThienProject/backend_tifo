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
const message_services_1 = __importDefault(require("../services/message.services"));
const http_status_1 = __importDefault(require("http-status"));
const __1 = require("..");
const messageController = {
    getChatsByIDRoom: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const query = req.query;
        const id_room = query.id_room;
        try {
            const { chats, message, room } = yield message_services_1.default.getChatsByIDRoom(query);
            // console.log(room)
            if (chats) {
                return res.status(http_status_1.default.OK).send({
                    chats: chats,
                    id_room,
                    room,
                    message: message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    getRooms: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const query = req.query;
        try {
            const { rooms, message } = yield message_services_1.default.getRooms(query);
            if (rooms) {
                rooms.forEach((room) => {
                    room.users.forEach((user) => {
                        const userSocket = __1.userSockets[user.id_user];
                        if (userSocket) {
                            userSocket.join(room.id_room);
                        }
                    });
                });
                return res.status(http_status_1.default.OK).send({
                    rooms: rooms,
                    message: message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    getUsersByIDRoom: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const query = req.query;
        try {
            const { users, message } = yield message_services_1.default.getUsersByIDRoom(query);
            if (users) {
                return res.status(http_status_1.default.OK).send({
                    users,
                    message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    deleteRoom: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_room } = req.body;
        try {
            const { message } = yield message_services_1.default.deleteRoom({
                id_room
            });
            return res.status(http_status_1.default.CREATED).send(message);
        }
        catch (error) {
            next(error);
        }
    }),
    deleteUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_room, id_user, id_owner } = req.body;
        try {
            const { message, chat, avatar, date } = yield message_services_1.default.deleteUser({
                id_room, id_user, id_owner
            });
            if (id_owner) {
                __1.io.to(id_room).emit('delete_member', { id_user, id_room, message, chat, avatar, date });
            }
            const userSocket = __1.userSockets[id_user];
            if (userSocket) {
                userSocket.leave(id_room);
            }
            return res.status(http_status_1.default.CREATED).send({ message, id_room, id_owner });
        }
        catch (error) {
            next(error);
        }
    }),
    addMembers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { users, id_room, id_user } = req.body;
        try {
            if (users) {
                const { message, chats, limit, room, newUsers } = yield message_services_1.default.addMembers({
                    users, id_room, id_user
                });
                users.forEach((user) => {
                    const userSocket = __1.userSockets[user.id_user];
                    if (userSocket) {
                        userSocket.join(id_room);
                    }
                });
                __1.io.to(id_room).emit('add_members', { users: newUsers, id_room, message, chats, limit, room });
                return res.status(http_status_1.default.CREATED).send({ id_room, message, chats, limit, users });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    searchRoomOrUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const query = req.query;
        try {
            const { users, message } = yield message_services_1.default.searchRoomOrUser(query);
            if (users) {
                return res.status(http_status_1.default.OK).send({
                    users,
                    message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    createChat: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, id_room, id_friend, isChatbot, message } = req.body;
        try {
            if (!isChatbot) {
                const { chat, date } = yield message_services_1.default.createChat({
                    id_user,
                    id_room,
                    message,
                    id_friend
                });
                const newChat = {
                    chat,
                    id_user,
                    date,
                    id_room
                };
                __1.io.emit("new-chat", newChat);
                return res.status(http_status_1.default.CREATED).send({ chat });
            }
            else {
                const { chat, date } = yield message_services_1.default.createChatGPT({
                    id_user,
                    id_room,
                    message
                });
                const newChat = {
                    chat,
                    id_user,
                    date,
                    id_room,
                    isChatbot
                };
                return res.status(http_status_1.default.CREATED).send(newChat);
            }
        }
        catch (error) {
            next(error);
        }
    }),
    deleteChats: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, id_room } = req.body;
        try {
            const { message } = yield message_services_1.default.deleteChats({
                id_user,
                id_room
            });
            return res.status(http_status_1.default.CREATED).send(message);
        }
        catch (error) {
            next(error);
        }
    }),
    createFirstChat: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, id_friend, message } = req.body;
        try {
            const result = yield message_services_1.default.createFirstChat({
                id_user,
                message,
                id_friend
            });
            const newChat = Object.assign({}, result);
            result.users.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
                const userSocket = __1.userSockets[user.id_user];
                if (userSocket) {
                    userSocket.join(result.id_room);
                }
            }));
            __1.io.to(result.id_room).emit("first-chat", newChat);
            return res.status(http_status_1.default.CREATED).send({ message: 'ok', id_room: result.id_room });
        }
        catch (error) {
            next(error);
        }
    }),
    createRoom: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { users, name, type } = req.body;
        try {
            if (users) {
                const { id_room, chat, avatar, date } = yield message_services_1.default.createRoom({
                    users,
                    name,
                    type: 'group'
                });
                users.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
                    const userSocket = __1.userSockets[user.id_user];
                    if (userSocket) {
                        userSocket.join(id_room);
                    }
                }));
                const newUsers = users.map((item) => { if (item.isOwner)
                    item.role = 1; return item; });
                __1.io.to(id_room).emit('create-room', { name, id_room, chat, avatar, date, users: newUsers, type: 'group' });
                return res.status(http_status_1.default.CREATED).send({ chat });
            }
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = messageController;
