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
var _ = require('lodash');
const userService = {
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
};
exports.default = userService;
