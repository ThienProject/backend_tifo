"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userValidation = {
    getUser: {
        body: joi_1.default.object().keys({
            id_user: joi_1.default.string().required(),
            id_me: joi_1.default.string().allow(null),
        }),
    },
    follow: {
        body: joi_1.default.object().keys({
            id_noti: joi_1.default.number().allow(null),
            id_follower: joi_1.default.string().required(),
            id_user: joi_1.default.string().required(),
        }),
    },
    getUsers: {
        query: joi_1.default.object().keys({
            id_user: joi_1.default.string().allow(null),
            q: joi_1.default.string().required(),
            limit: joi_1.default.number().required(),
            offset: joi_1.default.number().required(),
        }),
    },
};
exports.default = userValidation;
