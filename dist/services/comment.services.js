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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectDB_1 = __importDefault(require("../configs/connectDB"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
var _ = require('lodash');
const commentServices = {
    create: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, id_post, id_reply = 0, id_parent = 0, comment } = body;
        const sql = `insert into comment (id_post, id_user, id_parent, id_reply, comment) value ('${id_post}', '${id_user}', '${id_parent}', '${id_reply}', '${comment}')`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            const lastRow = yield (0, connectDB_1.default)('SELECT comment.*, user.id_user, user.avatar, user.fullname, user.username FROM comment, user WHERE user.id_user = comment.id_user ORDER BY id_comment DESC LIMIT 1');
            const commentRow = lastRow && lastRow[0];
            const id_reply = commentRow === null || commentRow === void 0 ? void 0 : commentRow.id_reply;
            if (id_reply != 0) {
                const replyRow = yield (0, connectDB_1.default)(`SELECT  comment.*, user.id_user, user.avatar, user.fullname, user.username FROM comment, user WHERE id_comment =  '${id_reply}' and user.id_user = comment.id_user`);
                commentRow.reply = replyRow && replyRow[0];
            }
            return {
                newComment: commentRow,
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'create comments failed, please try again later!');
        }
    }),
    getComments: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_post } = query;
        const comments = yield (0, connectDB_1.default)(`select comment.*, user.id_user,user.avatar, user.fullname, user.username from comment, user where id_post = '${id_post}' and user.id_user = comment.id_user `);
        const roofCmt = [...comments];
        // console.log(comments)
        const solveComment = (comments) => {
            var _a;
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].id_parent == 0) {
                    for (let j = 0; j < comments.length; j++) {
                        if (comments[i]) {
                            if (comments[i].id_comment === comments[j].id_parent) {
                                // console.log("id_comment", comments[j].id_parent)
                                if (!Array.isArray(comments[i].children)) {
                                    comments[i].children = [];
                                }
                                if (comments[j].id_reply != 0) {
                                    const index = roofCmt.findIndex((item) => comments[j].id_reply === item.id_comment);
                                    if (index != -1) {
                                        const _b = roofCmt[index], { children } = _b, userReply = __rest(_b, ["children"]);
                                        comments[j].reply = userReply;
                                    }
                                }
                                (_a = comments[i].children) === null || _a === void 0 ? void 0 : _a.push(comments[j]);
                                comments.splice(j, 1);
                                if (j > 0) {
                                    j--;
                                }
                                if (i > 0) {
                                    i--;
                                }
                            }
                        }
                    }
                }
            }
        };
        solveComment(comments);
        return {
            comments,
        };
    }),
    deleteComment: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_comment } = body;
        const result = yield (0, connectDB_1.default)(`delete FROM comment where id_comment = '${id_comment}' or id_parent = '${id_comment}'`);
        if (result.insertId >= 0) {
            return {
                message: 'delete comment success !',
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'delete comment fail');
        }
    }),
    updateComment: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_comment, comment } = body;
        const sql = `update comment set comment = '${comment}' where id_comment = '${id_comment}'`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            return {
                message: 'update comment success!',
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'create comments failed, please try again later!');
        }
    }),
};
exports.default = commentServices;
