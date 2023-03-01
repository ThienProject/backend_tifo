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
var _ = require('lodash');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const authService = {
    register: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, fullname, username, password } = body;
        const id_user = (0, uniqid_1.default)('USER-').toUpperCase();
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
        const rows = yield (0, connectDB_1.default)(`insert into user(email, fullname,username, password, id_role, id_user) values('${email}','${fullname}','${username}','${hashPassword}','${id_role}','${id_user}')`);
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
    getMe: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const rows = yield (0, connectDB_1.default)(`select * from user where email="${email}"`);
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
    })
};
exports.default = authService;
