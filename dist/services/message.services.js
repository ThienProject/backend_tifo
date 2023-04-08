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
const connectDB_1 = __importDefault(require("../configs/connectDB"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const path = require('path');
const fs = require('fs');
var _ = require('lodash');
const messageService = {
    getGroups: (query) => __awaiter(void 0, void 0, void 0, function* () {
        let { id_user, offset, limit } = query;
        let sql = `SELECT "group".id_group, "group".name, user.fullname, user.id_user, user.username, chatLimit.id_chat, chatLimit.message, chatLimit.datetime
      from "group"
      JOIN ( 
          select user_group.id_group
          from user_group
          WHERE user_group.id_user = '${id_user}'
          group by user_group.id_user_group
          LIMIT ${limit} OFFSET ${offset}
      ) AS limitGroup ON limitGroup.id_group = "group".id_group 
      LEFT JOIN user_group ON "group".id_group = user_group.id_group
      LEFT JOIN user ON user_group.id_user = user.id_user
      LEFT JOIN 
      (SELECT * FROM (
            select chat.* ,
                    ROW_NUMBER() OVER  (PARTITION BY ug.id_group ORDER BY chat.datetime DESC)  AS row_num_chat
                    from chat JOIN (
                        SELECT user_group.id_user_group, user_group.id_group from 
                        user_group JOIN
                            (select user_group.id_group
                                from user_group
                                WHERE user_group.id_user = '${id_user}'
                                group by  user_group.id_user_group, user_group.id_group
                                limit ${limit} OFFSET ${offset}) as limitGroup ON limitGroup.id_group = user_group.id_group
                    		) 
          				as ug ON ug.id_user_group = chat.id_user_group ) as subquery
            WHERE row_num_chat <= 3)
      as chatLimit On chatLimit.id_user_group = user_group.id_user_group 
      GROUP BY "group".id_group, user.id_user,  chatLimit.id_chat
      ORDER BY chatLimit.datetime DESC`;
        sql = sql.replaceAll('"group"', '`group`');
        const rows = yield (0, connectDB_1.default)(sql);
        const groups = rows;
        if (groups) {
            const newGroups = groups.reduce((previousValue, currentValue) => {
                const { id_group, name, id_user, username, fullname, id_chat, message, datetime } = currentValue;
                const user = { id_user, username, fullname };
                const chat = { username, fullname, id_user, id_chat, message, datetime };
                const index = previousValue.findIndex((item) => item.id_group === currentValue.id_group);
                if (index === -1) {
                    const newGroup = { id_group, name, users: [user], chats: [chat] };
                    previousValue.push(newGroup);
                    return previousValue;
                }
                else {
                    const indexUser = previousValue[index].users.findIndex((u) => u.id_user === user.id_user);
                    if (indexUser === -1) {
                        previousValue[index].users.push(user);
                    }
                    if (chat.id_chat) {
                        previousValue[index].chats.push(chat);
                    }
                    return previousValue;
                }
            }, []);
            return {
                groups: newGroups,
                message: "Get groups success!"
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "groups does not exist !");
        }
    }),
    getChatsByIDGroup: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_group, id_user, limit, offset } = query;
        const sql = `select chat.*, user.id_user, user.fullname, user.username, user.avatar from 
              chat 
              LEFT JOIN user_group ON chat.id_user_group = user_group.id_user_group
              Left Join user on user_group.id_user = user.id_user
              where user_group.id_group = '${id_group}'
              ORDER by chat.datetime DESC
              limit ${limit} offset ${offset}`;
        const rows = yield (0, connectDB_1.default)(sql);
        const chats = rows;
        if (chats.length > 0) {
            const newChats = chats.reduce((previousValue, currentValue) => {
                console.log(currentValue);
                const date = currentValue.datetime.toString().substring(0, 10);
                console.log(date);
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
                message: "Get posts success!"
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This post does not exist !");
        }
    }),
};
exports.default = messageService;
