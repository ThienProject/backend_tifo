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
const post_services_1 = __importDefault(require("../services/post.services"));
const http_status_1 = __importDefault(require("http-status"));
const fs = require('fs');
const postController = {
    getPostById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    }),
    getPosts: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const query = req.query;
        try {
            const { posts, message } = yield post_services_1.default.getPosts(query);
            if (posts) {
                return res.status(http_status_1.default.OK).send({
                    posts: posts,
                    message: message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, target, type, description, } = req.body;
        const medias = req.files;
        try {
            const { message } = yield post_services_1.default.create({
                id_user,
                target,
                type,
                description,
                medias
            });
            return res.status(http_status_1.default.CREATED).send({
                message
            });
        }
        catch (error) {
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        return res.status(http_status_1.default.OK).send({});
    }),
    delete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        return res.status(http_status_1.default.OK).send({});
    })
};
exports.default = postController;
