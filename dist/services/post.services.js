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
const uniqid_1 = __importDefault(require("uniqid"));
const connectDB_1 = __importDefault(require("../configs/connectDB"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const path = require('path');
const fs = require('fs');
var _ = require('lodash');
const postService = {
    create: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, target, type, description, medias } = body;
        const id_post = (0, uniqid_1.default)('POST_').toUpperCase();
        const sql = `insert into post (id_post,id_user, target, type, description) value ('${id_post}', '${id_user}', '${target}', '${type}', '${description}')`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            if (medias) {
                let queryMedia = `insert into media (id_media, id_post, media_link, type) value `;
                for (let i = 0; i < (medias === null || medias === void 0 ? void 0 : medias.length); i++) {
                    const id_media = (0, uniqid_1.default)('MEDIA_').toUpperCase();
                    const file = medias[i];
                    const mimetype = file.mimetype.split('/')[0];
                    queryMedia += `('${id_media}', '${id_post}', '${file.filename}', '${mimetype}'),`;
                }
                queryMedia = queryMedia.substring(0, queryMedia.length - 1);
                const rowImg = yield (0, connectDB_1.default)(queryMedia);
                if (rowImg.insertId >= 0) {
                    const { post } = yield postService.getPostByID({ id_post: id_post });
                    return {
                        post,
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
    getPostsByIDUser: (query) => __awaiter(void 0, void 0, void 0, function* () {
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
    getReelsByIDUser: (query) => __awaiter(void 0, void 0, void 0, function* () {
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
    getSavesByIDUser: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, offset, limit } = query;
        const sql = `SELECT post.* ,user.id_user, user.username, user.avatar, user.fullname from user, save, post where user.id_user = '${id_user}' and post.id_post = save.id_post and save.id_user = user.id_user limit ${limit} offset ${offset}`;
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
    getPosts: (query) => __awaiter(void 0, void 0, void 0, function* () {
        let { id_user, offset, limit, type } = query;
        if (!type) {
            type = 'post';
        }
        const sql = id_user !== ''
            ?
                `SELECT post.*, user.username, user.avatar, user.fullname, (SELECT COUNT(*) FROM love       WHERE love.id_post = post.id_post) AS loves,
      CASE WHEN LovePost.id_user = '${id_user}' THEN true ELSE false END AS isLove,
      CASE WHEN save.id_user = '${id_user}' THEN true ELSE false END AS isSave
      FROM post
      LEFT JOIN save ON post.id_post = save.id_post
      LEFT JOIN user ON post.id_user = user.id_user
      LEFT JOIN (SELECT love.id_post, love.id_user from love WHERE love.id_user =  '${id_user}' ) 
      as LovePost ON post.id_post = LovePost.id_post
      right JOIN follow ON follow.id_user = post.id_user AND (post.target = 'follower'
       AND   follow.id_follower = '${id_user}' and follow.status ='accept')
                        OR post.target = 'public' or post.id_user = '${id_user}'
      WHERE post.type = '${type}' AND post.is_banned = 0 and post.id_user not in (select banned.id_user from banned)
      GROUP BY post.id_post
      ORDER BY post.date_time DESC
        LIMIT ${limit} OFFSET ${offset};`
            :
                `SELECT post.*, user.username, user.fullname, user.avatar, (SELECT COUNT(*) FROM love 	WHERE love.id_post = post.id_post) AS loves
        FROM post 
        LEFT JOIN user ON post.id_user = user.id_user 
        LEFT JOIN love ON love.id_post = post.id_post 
        WHERE post.target = 'public' AND post.type = '${type}' AND post.is_banned = 0 and post.id_user not in (select banned.id_user from banned)
        GROUP BY post.id_post, user.id_user
        ORDER BY post.date_time DESC
        LIMIT ${limit} OFFSET ${offset};`;
        console.log(sql);
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
    getPostByID: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_post, id_user } = query;
        const sql = `SELECT post.*,  
              user.id_user,
              user.username,
              user.avatar,
              user.fullname,
              count(love.id_user) as loves
              ${id_user ? `, CASE WHEN love.id_user = '${id_user}' THEN true ELSE false END AS isLove` : ' '} 
              ${id_user ? `, CASE WHEN save.id_user = '${id_user}' THEN true ELSE false END AS isSave` : ' '} 

              FROM post, user, love, save 
              where 
              post.id_user = user.id_user 
              and post.id_post = '${id_post}' 
              and love.id_post = post.id_post
              and save.id_post = post.id_post`;
        const rows = yield (0, connectDB_1.default)(sql);
        if (rows.length > 0) {
            const post = rows[0];
            const commentLength = yield (0, connectDB_1.default)(`select count(comment.id_comment) as commentLength from comment where comment.id_post = '${id_post}' `);
            // const comments = await queryDb(`select comment.*, user.id_user,user.avatar, user.fullname, user.username from comment, user where id_post = '${id_post}' and user.id_user = comment.id_user `);
            post.commentLength = commentLength ? commentLength[0].commentLength : 0;
            const medias = yield (0, connectDB_1.default)(`select *from media where id_post = '${id_post}'`);
            post.medias = medias;
            return {
                post,
                message: "Get posts success!"
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This post does not exist !");
        }
    }),
    update: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { medias, id_post } = body, restBody = __rest(body, ["medias", "id_post"]);
        let sql = `update post set `;
        for (const key in restBody) {
            if (Object.hasOwnProperty.call(restBody, key)) {
                const value = restBody[key];
                if (value)
                    sql += ` ${key} = '${value}' , `;
            }
        }
        sql = sql.replace(/, $/, '');
        sql += `where id_post = '${id_post}'`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            if (medias && medias.length > 0) {
                let queryMedia = `insert into media (id_media, id_post, media_link, type) value `;
                for (let i = 0; i < (medias === null || medias === void 0 ? void 0 : medias.length); i++) {
                    const id_media = (0, uniqid_1.default)('MEDIA_').toUpperCase();
                    const file = medias[i];
                    const mimetype = file.mimetype.split('/')[0];
                    queryMedia += `('${id_media}', '${id_post}', '${file.filename}', '${mimetype}'),`;
                }
                queryMedia = queryMedia.substring(0, queryMedia.length - 1);
                const rowImg = yield (0, connectDB_1.default)(queryMedia);
            }
            const { post } = yield postService.getPostByID({ id_post });
            return {
                post,
                message: 'update post success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'update post failed, please try again later!');
        }
    }),
    updateLove: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_post, isLove, id_user } = body;
        let sql = isLove ? `insert into love value ('${id_user}', '${id_post}')` : `delete from love where id_user = '${id_user}' and id_post = '${id_post}'`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            let sql = `select count(id_user) as love from love where id_post =  '${id_post}'`;
            const row = yield (0, connectDB_1.default)(sql);
            const loves = row[0].love;
            return {
                loves: loves,
                message: 'love post success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'love post failed, please try again later!');
        }
    }),
    updateSave: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_post, isSave, id_user } = body;
        let sql = isSave ? `insert into save(id_user, id_post) value ('${id_user}', '${id_post}')` : `delete from save where id_user = '${id_user}' and id_post = '${id_post}'`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            let sql = `select count(id_user) as save from save where id_post =  '${id_post}'`;
            const row = yield (0, connectDB_1.default)(sql);
            const saves = row[0].save;
            return {
                saves: saves,
                message: 'save post success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'love post failed, please try again later!');
        }
    }),
    delete: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_post } = body;
        const sqlMedia = `select * from media where id_post = '${id_post}'`;
        const rowMedia = yield (0, connectDB_1.default)(sqlMedia);
        if (rowMedia.length >= 0) {
            const sqlDlePost = `delete from post where id_post = '${id_post}'`;
            const rowDlePost = yield (0, connectDB_1.default)(sqlDlePost);
            if (rowDlePost.insertId >= 0 && rowMedia.length > 0) {
                for (let i = 0; i < rowMedia.length; i++) {
                    const oldFile = rowMedia[i];
                    const imagePath = path.join(__dirname, '../../src/public/medias', oldFile.media_link);
                    if (fs.existsSync(imagePath)) {
                        // Sử dụng phương thức unlink để xóa tập tin
                        yield fs.unlink(imagePath, (err) => {
                            if (err) {
                                return {
                                    message: err
                                };
                            }
                        });
                        console.log("delete success!");
                    }
                    else {
                        console.log("can't find out file in server " + " in " + imagePath);
                    }
                }
            }
            else {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Delete post failed, please try again later!');
            }
            return {
                message: 'Delete post success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Can not find any media');
        }
    }),
    replaceMedias: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { old_medias, medias } = body;
        if (medias && medias.length > 0) {
            let queryMedia = `update media set `;
            let querySetFileName = `media_link = CASE `;
            let querySetFileType = `, type = CASE `;
            let queryWhere = ' where ';
            for (let i = 0; i < medias.length; i++) {
                const oldFile = old_medias[i];
                const newFile = medias[i];
                const mimetype = newFile.mimetype.split('/')[0];
                querySetFileName += `when media.id_media = '${oldFile.id_media}' then '${newFile.filename}' `;
                querySetFileType += `when media.id_media = '${oldFile.id_media}' then '${mimetype}' `;
                queryWhere += `id_media = '${oldFile.id_media}' or `;
            }
            querySetFileName += 'END';
            querySetFileType += 'END';
            queryWhere = queryWhere.replace(/or $/, '');
            queryMedia += querySetFileName + querySetFileType + queryWhere;
            const rowImgs = yield (0, connectDB_1.default)(queryMedia);
            if (rowImgs.insertId >= 0) {
                for (let i = 0; i < medias.length; i++) {
                    const oldFile = old_medias[i];
                    const imagePath = path.join(__dirname, '../../src/public/medias', oldFile.media_link);
                    if (fs.existsSync(imagePath)) {
                        // Sử dụng phương thức unlink để xóa tập tin
                        yield fs.unlink(imagePath, (err) => {
                            if (err) {
                                return {
                                    message: err
                                };
                            }
                        });
                        // return {
                        //   message: 'Update image success !'
                        // }
                        console.log("delete success!");
                    }
                    else {
                        // return {
                        //   message: "can't find out file in server " + " in " + imagePath
                        // }
                        console.log("can't find out file in server " + " in " + imagePath);
                    }
                }
                return { message: "ok" };
            }
            else {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'An error occurred with media, please try again later!');
            }
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'replace medias failed, please try again later!');
        }
    }),
    deleteMedias: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { medias } = body;
        if (medias && medias.length > 0) {
            let queryMedia = `delete FROM media where `;
            for (let i = 0; i < medias.length; i++) {
                const { id_media, media_link } = medias[i];
                queryMedia += `id_media = '${id_media}' or `;
            }
            queryMedia = queryMedia.substring(0, queryMedia.length - 3);
            const rowImgs = yield (0, connectDB_1.default)(queryMedia);
            if (rowImgs.insertId >= 0) {
                for (let i = 0; i < medias.length; i++) {
                    const oldFile = medias[i];
                    const imagePath = path.join(__dirname, '../../src/public/medias', oldFile.media_link);
                    if (fs.existsSync(imagePath)) {
                        // Sử dụng phương thức unlink để xóa tập tin
                        yield fs.unlink(imagePath, (err) => {
                            if (err) {
                                return {
                                    message: err
                                };
                            }
                        });
                        console.log("delete success!");
                    }
                    else {
                        // return {
                        //   message: "can't find out file in server " + " in " + imagePath
                        // }
                        console.log("can't find out file in server " + " in " + imagePath);
                    }
                }
                return { message: "ok" };
            }
            else {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'An error occurred with media, please try again later!');
            }
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'delete media, please try again later!');
        }
    })
};
exports.default = postService;
