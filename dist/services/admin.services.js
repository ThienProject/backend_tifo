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
var bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const saltRounds = 10;
const authService = {
    getMe: (id_user) => __awaiter(void 0, void 0, void 0, function* () {
        const rows = yield (0, connectDB_1.default)(`select * from user where id_user="${id_user}"`);
        if (_.isEmpty(rows))
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Can't find out user account!");
        else {
            const user = rows[0];
            const { password } = user, userRest = __rest(user, ["password"]);
            return {
                user,
                message: "Get me success!"
            };
        }
    }),
    getUsers: (paramsBody) => __awaiter(void 0, void 0, void 0, function* () {
        const { offset, limit, filters } = paramsBody;
        let filterSql = '';
        if (filters) {
            for (let i = 0; i < filters.length; i++) {
                if (filters[i] === 'reported') {
                    filterSql += ` and post_reports.count >0  `;
                }
                if (filters[i] === 'banned') {
                    filterSql += ` and banned.id_user IS NOT NULL  `;
                }
            }
        }
        const users = yield (0, connectDB_1.default)(`
      SELECT  count.total, 
    post_reports.count as post_reports,
 		user.id_user,
        role.id_role, role.role, COUNT(post.id_post) AS post_quantity, 
       fullname, username, 
       CASE
         WHEN banned.id_user IS NOT NULL THEN 'banned'
         WHEN post_reports.count > 0 THEN 'reported'
         ELSE user.status
       END AS status,
       phone, email, address, birthday, gender, avatar, cover
        FROM (select count(id_user) as total from user WHERE user.id_role <> 3)as count ,
        user
        RIGHT JOIN role ON role.id_role = user.id_role AND role.id_role <> 3
        LEFT JOIN post ON post.id_user = user.id_user
        LEFT JOIN banned ON banned.id_user = user.id_user
        left JOIN (select post.id_user,COALESCE(count(post.id_post),0) as count from report, post WHERE post.id_post = report.id_post ) as post_reports on post_reports.id_user = user.id_user
        where 1  
        ${filterSql} 
        GROUP BY user.id_user
        ORDER BY status DESC
      limit ${limit} offset ${offset}
      `);
        if (_.isEmpty(users)) {
            return {
                users,
                messages: 'No account !'
            };
        }
        else {
            return {
                users,
                total: users[0].total,
                messages: 'Search success !'
            };
        }
    }),
    getUserByID: ({ id_user }) => __awaiter(void 0, void 0, void 0, function* () {
        const rows = yield (0, connectDB_1.default)(` 
      SELECT  count.total, 
    	post_reports.count as post_reports,
 		user.id_user,
        user.datetime,
        role.id_role, role.role, COUNT(post.id_post) AS post_quantity, 
       fullname, username, 
       CASE
         WHEN banned.id_user IS NOT NULL THEN 'banned'
         WHEN post_reports.count > 0 THEN 'reported'
         ELSE user.status
       END AS status,
       phone, email, address, birthday, gender, avatar, cover
        FROM (select count(id_user) as total from user WHERE user.id_role <> 3)as count ,
        user
        RIGHT JOIN role ON role.id_role = user.id_role AND role.id_role <> 3
        LEFT JOIN post ON post.id_user = user.id_user
        LEFT JOIN banned ON banned.id_user = user.id_user
        left JOIN (select post.id_user,COALESCE(count(post.id_post),0) as count from report, post WHERE post.id_post = report.id_post ) as post_reports on post_reports.id_user = user.id_user
        where user.id_user = '${id_user}'
        GROUP BY user.id_user
        ORDER BY status DESC`);
        if (_.isEmpty(rows))
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Can't find out user account!");
        else {
            const user = rows[0];
            const { password, address, birthday } = user, userRest = __rest(user, ["password", "address", "birthday"]);
            return {
                user: userRest,
                message: "Get user success!"
            };
        }
    }),
};
exports.default = authService;
