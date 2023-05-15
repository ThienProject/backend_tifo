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
const __1 = require("..");
var _ = require('lodash');
var bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const saltRounds = 10;
const authService = {
    register: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, fullname, username, password } = body;
        const id_user = (0, uniqid_1.default)('USER_').toUpperCase();
        const id_role = 2;
        let user = yield (0, connectDB_1.default)(`select * from user where email="${email}"`);
        if (!_.isEmpty(user)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This email already exists !");
        }
        user = yield (0, connectDB_1.default)(`select * from user where username ="${username}"`);
        if (!_.isEmpty(user)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This username already exists !");
        }
        const hashPassword = yield bcrypt.hash(password, saltRounds);
        const rows = yield (0, connectDB_1.default)(`insert into user(email, fullname,username, password, id_role, id_user, avatar) values('${email}','${fullname}','${username}','${hashPassword}','${id_role}','${id_user}', 'account.jpg')`);
        if (rows.insertId >= 0) {
            const users = yield (0, connectDB_1.default)(`select * from user where email='${email}'`);
            const _a = users[0], { password } = _a, other = __rest(_a, ["password"]);
            return {
                user: other,
                message: 'Register success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Registration failed, please try again later!');
        }
    }),
    login: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = body;
        const row = yield (0, connectDB_1.default)(`select * from user where email ="${email}"`);
        if (_.isEmpty(row)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
        }
        const user = row[0];
        const match = yield bcrypt.compare(password, user.password.trim());
        if (match) {
            const { password } = user, userRest = __rest(user, ["password"]);
            return {
                user: userRest,
                message: "Logged in successfully !"
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Password incorrect');
        }
    }),
    updateInfo: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, email, phone, fullname, username, description, birthday, gender } = body;
        const check = yield (0, connectDB_1.default)(`(select username, email, phone from user WHERE id_user = null)
      UNION (select username, '', '' from user where (username = '${username}') and id_user <>'${id_user}') 
      UNION (select '', email,'' from user where ( email =  '${email}') and id_user <> '${id_user}')
      UNION (select '','',phone from user where (phone ='') and id_user <> '${id_user}')`);
        if (!_.isEmpty(check)) {
            const rules = [];
            check.forEach((error) => {
                if (error.email) {
                    rules.push('email');
                }
                if (error.username) {
                    rules.push('username');
                }
                if (error.phone) {
                    rules.push('phone');
                }
            });
            return {
                rules: rules,
                message: "duplicate"
            };
        }
        ;
        const row = yield (0, connectDB_1.default)(`update user set email = "${email}", phone = "${phone}", fullname = "${fullname}", username  = "${username}", description  = "${description}", birthday  = "${birthday}", gender = '${gender}' where id_user = '${id_user}'`);
        if (row.insertId < 0) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Update fail!');
        }
        else {
            const { user } = yield authService.getMe(id_user);
            if (_.isEmpty(user)) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'can not find user!');
            }
            else {
                return {
                    user,
                    message: 'update info success!'
                };
            }
        }
    }),
    updatePassword: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, password, currentPassword } = body;
        const row = yield (0, connectDB_1.default)(`select * from user where id_user ="${id_user}"`);
        if (_.isEmpty(row)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
        }
        const user = row[0];
        const match = yield bcrypt.compare(currentPassword, user.password.trim());
        if (match) {
            const hashPassword = yield bcrypt.hash(password, saltRounds);
            const changePass = yield (0, connectDB_1.default)(`update user set password  = "${hashPassword}" where id_user = '${id_user}'`);
            if (changePass.insertId < 0) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'invalid');
            }
            else {
                return {
                    message: 'update password success!'
                };
            }
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'invalid');
        }
    }),
    updateImage: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { image, type, id_user } = body;
        const oldImage = yield (0, connectDB_1.default)(`select ${type} from user where id_user = '${id_user}'`);
        if (!_.isEmpty(oldImage)) {
            console.log(oldImage[0][type]);
            const imagePath = path.join(__dirname, '../../src/public/users', oldImage[0][type]);
            if (fs.existsSync(imagePath)) {
                // Sử dụng phương thức unlink để xóa tập tin
                yield fs.unlink(imagePath, (err) => {
                    if (err) {
                        return {
                            message: err
                        };
                    }
                });
            }
            else {
                console.log("can't find out file in server " + " in " + imagePath);
            }
        }
        const row = yield (0, connectDB_1.default)(`update user set ${type} = '${image.filename}' where id_user = '${id_user}'`);
        if (_.isEmpty(row)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
        }
        else {
            const { user } = yield authService.getMe(id_user);
            return { message: 'ok', user };
        }
    }),
    updateInvisible: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, invisible } = body;
        const row = yield (0, connectDB_1.default)(`update user set invisible = '${invisible}' where id_user = '${id_user}'`);
        if (_.isEmpty(row)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
        }
        else {
            return { message: 'ok' };
        }
    }),
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
    getNotifications: ({ id_user, limit, offset, time, category, sort }) => __awaiter(void 0, void 0, void 0, function* () {
        let newTime = '';
        switch (time) {
            case 'today':
                newTime += ' and DATE(notificaion.datetime) = CURDATE()';
                break;
            case 'year':
                newTime = ' and YEAR(notificaion.datetime) = YEAR(CURDATE())';
                break;
            case 'week':
                newTime = ' and YEAR(notificaion.datetime) = YEAR(CURDATE()) and WEEK(notificaion.datetime) = WEEK(CURDATE())';
                break;
            case 'month':
                newTime = ' and YEAR(notificaion.datetime) = YEAR(CURDATE()) and MONTH(notificaion.datetime) = MONTH(CURDATE())';
                break;
            default:
                newTime = '';
                break;
        }
        const sql = `select notification.*, notification.id_follow,  user.fullname, user.avatar , user.username from notification
    LEFT JOIN user ON notification.id_actor = user.id_user
    where notification.id_user="${id_user}"
    ${category === 'all' ? '' : `and notification.type = "${category}"`}
     ${newTime}
    order by  notification.datetime ${sort}
    limit ${limit} offset ${offset} `;
        const notifications = yield (0, connectDB_1.default)(sql);
        if (_.isEmpty(notifications))
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Can't find out user account!");
        else {
            return {
                notifications,
                message: "Get notifications success!"
            };
        }
    }),
    sendNotification: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, id_actor, type, id_comment, id_post, id_follow } = body;
        const sql = `INSERT INTO notification (id_user, id_actor, type, id_comment, id_post, id_follow) VALUES ('${id_user}', '${id_actor}', '${type}', ${id_comment ? `'${id_comment}'` : "NULL"}, ${id_post || "NULL"},  ${id_follow || "NULL"})`;
        const notifications = yield (0, connectDB_1.default)(sql);
        if (_.isEmpty(notifications))
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Can't create notification!");
        else {
            const row = yield (0, connectDB_1.default)(`select notification.*, user.fullname, user.avatar , user.username from notification
                  LEFT JOIN user ON notification.id_actor = user.id_user
                  WHERE notification.id_notification = LAST_INSERT_ID();`);
            const userActive = __1.userSockets[id_user];
            if (userActive && !_.isEmpty(row)) {
                console.log("socket thông báo đến :", userActive.id);
                const noti = row[0];
                __1.io.to(userActive.id).emit('notification', noti);
            }
            return {
                message: "Create notifications success!"
            };
        }
    }),
    removeNotification: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_noti } = body;
        const sql = `delete from notification where id_notification = '${id_noti}'`;
        const notifications = yield (0, connectDB_1.default)(sql);
        if (_.isEmpty(notifications))
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Can't create notification!");
        else {
            return {
                message: "Create notifications success!"
            };
        }
    })
};
exports.default = authService;
