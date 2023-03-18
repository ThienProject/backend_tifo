"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const postValidation = {
    create: {
        body: joi_1.default.object().keys({
            target: joi_1.default.string().required(),
            type: joi_1.default.string().required(),
            description: joi_1.default.string(),
            id_user: joi_1.default.string().required(),
        }),
        files: joi_1.default.array().required().items(joi_1.default.object({
            filename: joi_1.default.string().required(),
            mimetype: joi_1.default.string().valid('image/png', 'image/jpg', 'image/jpeg', 'video/mp4', 'video/quicktime').required(),
            size: joi_1.default.number().max(10 * 1024 * 1024).required(),
            fieldname: joi_1.default.string(),
            encoding: joi_1.default.string(),
            path: joi_1.default.string(),
            destination: joi_1.default.string(),
            originalname: joi_1.default.string()
        })),
    },
    update: {
        body: joi_1.default.object().keys({
            id_post: joi_1.default.string().required(),
            target: joi_1.default.string().allow(),
            type: joi_1.default.string().allow(),
            description: joi_1.default.allow(),
            id_user: joi_1.default.string().allow(),
            medias: joi_1.default.allow()
        }),
        files: joi_1.default.array().allow().items(joi_1.default.object({
            filename: joi_1.default.string().required(),
            mimetype: joi_1.default.string().valid('image/png', 'image/jpg', 'image/jpeg', 'video/mp4', 'video/quicktime').required(),
            size: joi_1.default.number().max(5 * 1024 * 1024).required(),
            fieldname: joi_1.default.string(),
            encoding: joi_1.default.string(),
            path: joi_1.default.string(),
            destination: joi_1.default.string(),
            originalname: joi_1.default.string()
        })),
    },
    delete: {
        body: joi_1.default.object().keys({
            id_post: joi_1.default.string().required(),
        }),
    },
    getPosts: {
        query: joi_1.default.object().keys({
            id_user: joi_1.default.string().allow(null).allow(''),
            limit: joi_1.default.number().required(),
            offset: joi_1.default.number().required(),
        }),
    },
    getPostByID: {
        query: joi_1.default.object().keys({
            id_post: joi_1.default.string().required(),
        }),
    }
};
exports.default = postValidation;
