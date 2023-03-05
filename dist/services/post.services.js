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
var _ = require('lodash');
const postService = {
    create: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, target, type, description, medias } = body;
        const id_post = (0, uniqid_1.default)('POST_').toUpperCase();
        const row = yield (0, connectDB_1.default)(`insert into post (id_post,id_user, target, type, description) value ('${id_post}', '${id_user}', '${target}', '${type}', '${description}')`);
        if (row.insertId >= 0) {
            if (medias) {
                let queryMedia = `insert into media (id_media, id_post, media_link, type_media) value `;
                for (let i = 0; i < (medias === null || medias === void 0 ? void 0 : medias.length); i++) {
                    const id_media = (0, uniqid_1.default)('MEDIA_').toUpperCase();
                    const file = medias[i];
                    const mimetype = file.mimetype.split('/')[0];
                    queryMedia += `('${id_media}', '${id_post}', '${file.filename}', '${mimetype}'),`;
                }
                queryMedia = queryMedia.substring(0, queryMedia.length - 1);
                const rowImg = yield (0, connectDB_1.default)(queryMedia);
                if (rowImg.insertId >= 0) {
                    return {
                        message: 'Create post success !'
                    };
                }
                else {
                    throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'An error occurred with medias, please try again later!');
                }
            }
            else {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'An error occurred with medias, please try again later!');
            }
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'create post failed, please try again later!');
        }
    }),
    getPosts: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, offset, limit } = query;
        const sql = `SELECT post.*, user.username, user.fullname, user.avatar  FROM post, user, follow WHERE user.id_user =
    '${id_user}' and follow.id_follower = '${id_user}' and follow.id_user = post.id_user and post.target = 'public' limit ${limit} offset ${offset}`;
        console.log(sql);
        const rows = yield (0, connectDB_1.default)(sql);
        if (_.isEmpty(rows))
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Can't find out posts!");
        else {
            const posts = rows;
            for (let i = 0; i <= posts.length - 1; i++) {
                const id_post = posts[i].id_post;
                const comments = yield (0, connectDB_1.default)(`select *from comment where id_post = '${id_post}'`);
                posts[i].comments = comments;
                const medias = yield (0, connectDB_1.default)(`select *from media where id_post = '${id_post}'`);
                posts[i].medias = medias;
            }
            return {
                posts,
                message: "Get posts success!"
            };
        }
    })
};
exports.default = postService;
