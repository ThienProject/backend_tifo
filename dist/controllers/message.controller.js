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
    getChatsByIDGroup: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const query = req.query;
        const id_group = query.id_group;
        try {
            const { chats, message } = yield message_services_1.default.getChatsByIDGroup(query);
            if (chats) {
                return res.status(http_status_1.default.OK).send({
                    chats: chats,
                    id_group,
                    message: message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    getGroups: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const query = req.query;
        console.log(query);
        try {
            const { groups, message } = yield message_services_1.default.getGroups(query);
            if (groups) {
                return res.status(http_status_1.default.OK).send({
                    groups: groups,
                    message: message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    createChat: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, id_group, message } = req.body;
        try {
            const { chat, date } = yield message_services_1.default.createChat({
                id_user,
                id_group,
                message
            });
            const newChat = {
                chat,
                id_user,
                date,
                id_group,
            };
            __1.io.emit("new-chat", newChat);
            return res.status(http_status_1.default.CREATED).send(newChat);
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = messageController;
