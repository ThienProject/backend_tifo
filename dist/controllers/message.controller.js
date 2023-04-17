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
            const { chats, message } = yield message_services_1.default.getChatsByIDRoom(query);
            if (chats) {
                return res.status(http_status_1.default.OK).send({
                    chats: chats,
                    id_room,
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
        console.log(query);
        try {
            const { rooms, message } = yield message_services_1.default.getRooms(query);
            if (rooms) {
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
    searchRoomOrUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const query = req.query;
        console.log(query);
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
        const { id_user, id_room, id_friend, message } = req.body;
        try {
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
            console.log(newChat);
            __1.io.emit("first-chat", newChat);
            return res.status(http_status_1.default.CREATED).send({ message: 'ok', id_room: result.id_room });
        }
        catch (error) {
            next(error);
        }
    }),
    createChatGPT: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, id_room, message } = req.body;
        try {
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
            };
            return res.status(http_status_1.default.CREATED).send(newChat);
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = messageController;
