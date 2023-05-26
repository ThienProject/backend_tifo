"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const authValidation = {
    getMe: {
        body: joi_1.default.object().keys({
            email: joi_1.default.string().required().email(),
        }),
    },
    login: {
        body: joi_1.default.object().keys({
            email: joi_1.default.string().required().email(),
            password: joi_1.default.string().required(),
        }),
    },
    loginGoogle: {
        body: joi_1.default.object().keys({
            email: joi_1.default.string().required().email(),
        }),
    },
    register: {
        body: joi_1.default.object().keys({
            fullname: joi_1.default.string().required(),
            email: joi_1.default.string().required().email(),
            password: joi_1.default.string().required(),
            username: joi_1.default.string().required(),
            birthday: joi_1.default.string().required(),
        }),
    },
    updateProfile: {
        body: joi_1.default.object().keys({
            fullname: joi_1.default.string().required(),
            email: joi_1.default.string().required().email(),
            gender: joi_1.default.string().required(),
            phone: joi_1.default.string().required(),
            birthDay: joi_1.default.string().required(),
            city: joi_1.default.string().required(),
            id_user: joi_1.default.string().required(),
            address: joi_1.default.string().required(),
            // avatar: Joi.string().required(),
        }),
    },
};
exports.default = authValidation;
