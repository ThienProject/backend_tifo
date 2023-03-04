"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const postValidation = {
    create: {
        body: joi_1.default.object().keys({
            medias: joi_1.default.allow().required(),
            id_target: joi_1.default.string().required(),
            id_type: joi_1.default.string().required(),
            description: joi_1.default.string(),
            id_user: joi_1.default.string().required()
        }),
    },
    update: {
        body: joi_1.default.object().keys({
            id_post: joi_1.default.string().required(),
        }),
    },
    delete: {
        body: joi_1.default.object().keys({
            id_post: joi_1.default.string().required(),
        }),
    },
    getPostById: {
        body: joi_1.default.object().keys({
            id_post: joi_1.default.string().required(),
        }),
    },
    getPosts: {
        body: joi_1.default.object().keys({
            id_post: joi_1.default.string().required(),
            limit: joi_1.default.string().required(),
        }),
    }
};
exports.default = postValidation;
