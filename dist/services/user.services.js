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
const __1 = require("..");
var _ = require('lodash');
const userService = {
    getUser: ({ id_me, id_user }) => __awaiter(void 0, void 0, void 0, function* () {
        const rows = yield (0, connectDB_1.default)(`select user.*, follow.status as follow
    from user 
    left join follow on follow.id_user = user.id_user 
    				and  follow.id_follower ='${id_me}'
    WHERE user.id_user='${id_user}'`);
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
        const { q, offset, limit, id_user } = paramsBody;
        const users = yield (0, connectDB_1.default)(`
      select id_user,	id_role,	fullname,	username,	description,	phone,	email,	address,	birthday,	gender,	avatar,	cover from user 
      where id_user <> '${id_user}' and (id_user = "${q}" or fullname like "%${q}%" or username like "%${q}%") and user.id_role = 2
      order by fullname desc
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
                messages: 'Search success !'
            };
        }
    }),
    getUsersNotInRoom: (paramsBody) => __awaiter(void 0, void 0, void 0, function* () {
        const { q, offset, limit, id_user, id_room } = paramsBody;
        const users = yield (0, connectDB_1.default)(`
      select id_user,	id_role,	fullname,	username,	description,	phone,	email,	address,	birthday,	gender,	avatar,	cover from user 
      where id_user <> '${id_user}' and (id_user = "${q}" or fullname like "%${q}%" or username like "%${q}%") and user.id_role = 2
      and id_user not in (select user_room.id_user from user_room where id_room = "${id_room}")
      order by fullname desc
      limit ${limit} offset ${offset}
      `);
        console.log(`
      select id_user,	id_role,	fullname,	username,	description,	phone,	email,	address,	birthday,	gender,	avatar,	cover from user 
      where id_user <> '${id_user}' and (id_user = "${q}" or fullname like "%${q}%" or username like "%${q}%") and user.id_role = 2
      and id_user not in (select user_room.id_user from user_room where id_room = "${id_room}")
      order by fullname desc
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
                messages: 'Search success !'
            };
        }
    }),
    getUserSuggests: (paramsBody) => __awaiter(void 0, void 0, void 0, function* () {
        const { offset, limit, id_user } = paramsBody;
        const users = yield (0, connectDB_1.default)(`
      select user.id_user,	id_role,	fullname,	username,	description,	phone,	email,	address,	birthday,	gender,	avatar,	cover from user 
      where user.id_user <> '${id_user}' and user.id_user not in (select follow.id_user from follow WHERE follow.id_follower = '${id_user}' ) and user.id_role = 2
      GROUP by user.id_user 
      order by fullname desc
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
                messages: 'Search success !'
            };
        }
    }),
    requestFollow: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_follower, id_user } = body;
        let sql = `insert into follow (id_user, id_follower, status) values ('${id_user}', '${id_follower}','waiting')`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            console.log(row);
            return {
                id_follow: row.insertId,
                message: 'request follow success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'request follow failed, please try again later!');
        }
    }),
    acceptFollow: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_follower, id_user } = body;
        const sql = `update follow set status = 'accept' where id_user = '${id_user}' and id_follower = '${id_follower}'`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            let sql = `select count(id_follower) as followers from follow where id_user =  '${id_user}'`;
            const row = yield (0, connectDB_1.default)(sql);
            const followers = row[0].followers;
            return {
                followers: followers,
                message: 'accept follow success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'accept follow failed, please try again later!');
        }
    }),
    unfollow: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_follower, id_user } = body;
        const sql = `delete from follow where id_user = '${id_user}' and id_follower = '${id_follower}'`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            let sql = `select count(id_follower) as followers from follow where id_user =  '${id_user}'`;
            const row = yield (0, connectDB_1.default)(sql);
            const followers = row[0].followers;
            return {
                followers: followers,
                message: 'unfollow success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'unfollow failed, please try again later!');
        }
    }),
    rejectFollow: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_follower, id_user } = body;
        const sql = `update follow set status = 'reject' where id_user = '${id_user}' and id_follower = '${id_follower}'`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            let sql = `select count(id_follower) as followers from follow where id_user =  '${id_user}'`;
            const row = yield (0, connectDB_1.default)(sql);
            const followers = row[0].followers;
            return {
                followers: followers,
                message: 'accept follow success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'accept follow failed, please try again later!');
        }
    }),
    setOffline: (id_user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sql = `update user set off_time = NOW(), status = 'offline' where id_user = '${id_user}'`;
            const row = yield (0, connectDB_1.default)(sql);
            if (row.insertId >= 0) {
                __1.io.emit('status', { id_user, status: 'offline' });
                return {
                    message: 'ok'
                };
            }
            else {
                console.log('offline failed, please try again later!');
                // throw new ApiError(httpStatus.BAD_REQUEST, 'offline failed, please try again later!');
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    setOnline: (id_user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sql = `update user set  status = 'online' where id_user = '${id_user}'`;
            const row = yield (0, connectDB_1.default)(sql);
            if (row.insertId >= 0) {
                __1.io.emit('status', { id_user, status: 'online' });
                return {
                    message: 'ok'
                };
            }
            else {
                console.log('offline failed, please try again later!');
                // throw new ApiError(httpStatus.BAD_REQUEST, 'offline failed, please try again later!');
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
};
exports.default = userService;
