"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const postValidation = {
    create: {
        body: joi_1.default.object().keys({
            medias: joi_1.default.array().required().items(joi_1.default.object({
                filename: joi_1.default.string().required(),
                mimetype: joi_1.default.string().valid('image/png', 'image/jpg', 'image/jpeg', 'video/mp4', 'video/quicktime').required(),
                size: joi_1.default.number().max(10 * 1024 * 1024).required() // 10MB
            })),
            target: joi_1.default.string().required(),
            type: joi_1.default.string().required(),
            description: joi_1.default.string(),
            id_user: joi_1.default.string().required(),
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
        query: joi_1.default.object().keys({
            id_user: joi_1.default.string().required(),
            limit: joi_1.default.number().required(),
            offset: joi_1.default.number().required(),
        }),
    }
};
exports.default = postValidation;
