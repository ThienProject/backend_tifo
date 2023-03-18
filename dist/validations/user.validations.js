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
        }),
    },
    getUsers: {
        body: joi_1.default.object().keys({
            q: joi_1.default.string().required(),
        }),
    },
};
exports.default = userValidation;
