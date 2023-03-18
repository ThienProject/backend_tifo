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
const userService = {
    getUser: (id_user) => __awaiter(void 0, void 0, void 0, function* () {
        const rows = yield (0, connectDB_1.default)(`select * from user where id_user="${id_user}"`);
        if (_.isEmpty(rows))
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Can't find out user account!");
        else {
            const user = rows[0];
            const { password, address, birthday } = user, userRest = __rest(user, ["password", "address", "birthday"]);
            return {
                user: userRest,
                message: "Get me success!"
            };
        }
    }),
    getUsers: (paramsBody) => __awaiter(void 0, void 0, void 0, function* () {
        const { q } = paramsBody;
        const users = yield (0, connectDB_1.default)(`select id_user,	id_role,	fullname,	username,	description,	phone,	email,	address,	birthday,	gender,	avatar,	cover from user where id_user like "%${q}%" or fullname like "%${q}%" or username like "%${q}%"`);
        if (_.isEmpty(users)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Can't find out any user account !");
        }
        else {
            return {
                users,
                messages: 'Search success !'
            };
        }
    }),
    getPosts: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, offset, limit } = query;
        const sql = `SELECT post.*, user.id_user, user.username, user.avatar, user.fullname from user, post where post.id_user = user.id_user and post.type ='post' and user.id_user = '${id_user}' limit ${limit} offset ${offset}`;
        const rows = yield (0, connectDB_1.default)(sql);
        const posts = rows;
        for (let i = 0; i <= posts.length - 1; i++) {
            const id_post = posts[i].id_post;
            const commentLength = yield (0, connectDB_1.default)(`select count(comment.id_comment) as commentLength from comment where comment.id_post = '${id_post}' `);
            // const comments = await queryDb(`select comment.*, user.id_user,user.avatar, user.fullname, user.username from comment, user where id_post = '${id_post}' and user.id_user = comment.id_user `);
            posts[i].commentLength = commentLength ? commentLength[0].commentLength : 0;
            const medias = yield (0, connectDB_1.default)(`select *from media where id_post = '${id_post}'`);
            posts[i].medias = medias;
        }
        return {
            posts,
            message: "Get posts success!"
        };
    }),
    getReels: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, offset, limit } = query;
        const sql = `SELECT post.*, user.id_user, user.username, user.avatar, user.fullname from user, post where post.id_user = user.id_user and post.type ='reel' and user.id_user = '${id_user}' limit ${limit} offset ${offset}`;
        const rows = yield (0, connectDB_1.default)(sql);
        const posts = rows;
        for (let i = 0; i <= posts.length - 1; i++) {
            const id_post = posts[i].id_post;
            const commentLength = yield (0, connectDB_1.default)(`select count(comment.id_comment) as commentLength from comment where comment.id_post = '${id_post}' `);
            // const comments = await queryDb(`select comment.*, user.id_user,user.avatar, user.fullname, user.username from comment, user where id_post = '${id_post}' and user.id_user = comment.id_user `);
            posts[i].commentLength = commentLength ? commentLength[0].commentLength : 0;
            const medias = yield (0, connectDB_1.default)(`select *from media where id_post = '${id_post}'`);
            posts[i].medias = medias;
        }
        return {
            posts,
            message: "Get posts success!"
        };
    }),
    getSaves: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, offset, limit } = query;
        const sql = `SELECT post.* ,user.id_user, user.username, user.avatar, user.fullname from user, save, post where post.id_user = user.id_user and post.type ='post' and user.id_user = '${id_user}' and post.id_post = save.id_post and save.id_user = user.id_user limit ${limit} offset ${offset}`;
        const rows = yield (0, connectDB_1.default)(sql);
        const posts = rows;
        for (let i = 0; i <= posts.length - 1; i++) {
            const id_post = posts[i].id_post;
            const commentLength = yield (0, connectDB_1.default)(`select count(comment.id_comment) as commentLength from comment where comment.id_post = '${id_post}' `);
            // const comments = await queryDb(`select comment.*, user.id_user,user.avatar, user.fullname, user.username from comment, user where id_post = '${id_post}' and user.id_user = comment.id_user `);
            posts[i].commentLength = commentLength ? commentLength[0].commentLength : 0;
            const medias = yield (0, connectDB_1.default)(`select *from media where id_post = '${id_post}'`);
            posts[i].medias = medias;
        }
        return {
            posts,
            message: "Get posts success!"
        };
    })
};
exports.default = userService;
