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
    getPostByID: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const query = req.query;
        try {
            const { post, message } = yield post_services_1.default.getPostByID(query);
            if (post) {
                return res.status(http_status_1.default.OK).send({
                    post: post,
                    message: message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    getPosts: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const query = req.query;
        try {
            const { posts, message } = yield post_services_1.default.getPosts(query);
            if (posts) {
                return res.status(http_status_1.default.OK).send({
                    type: query.type,
                    posts: posts,
                    message: message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    getPostsByIDUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, offset, limit } = req.query;
        try {
            const { posts, message } = yield post_services_1.default.getPostsByIDUser({ id_user, offset, limit });
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
    getReelsByIDUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, offset, limit } = req.query;
        try {
            const { posts, message } = yield post_services_1.default.getReelsByIDUser({ id_user, offset, limit });
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
    getSavesByIDUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, offset, limit } = req.query;
        try {
            const { posts, message } = yield post_services_1.default.getSavesByIDUser({ id_user, offset, limit });
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
            const { message, post } = yield post_services_1.default.create({
                id_user,
                target,
                type,
                description,
                medias
            });
            return res.status(http_status_1.default.CREATED).send({
                message,
                post
            });
        }
        catch (error) {
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_post, view, banned_reason, is_banned, id_user, target, description, } = req.body;
        const medias = req.files;
        try {
            const { message, post } = yield post_services_1.default.update({
                id_post,
                view,
                banned_reason,
                is_banned,
                id_user,
                target,
                description,
                medias
            });
            return res.status(http_status_1.default.CREATED).send({
                message, post
            });
        }
        catch (error) {
            next(error);
        }
    }),
    updateLove: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_post, isLove, id_user } = req.body;
        try {
            const { message, loves } = yield post_services_1.default.updateLove({
                id_post,
                isLove,
                id_user
            });
            return res.status(http_status_1.default.CREATED).send({
                message, loves
            });
        }
        catch (error) {
            next(error);
        }
    }),
    replaceMedias: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const medias = req.files;
        try {
            const bodyMediasOLD = req.body.old_medias;
            const old_medias = typeof bodyMediasOLD === "string" ? JSON.parse(bodyMediasOLD) : bodyMediasOLD;
            const { message } = yield post_services_1.default.replaceMedias({
                old_medias, medias
            });
            return res.status(http_status_1.default.CREATED).send({
                message
            });
        }
        catch (error) {
            next(error);
        }
    }),
    deleteMedias: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { medias } = req.body;
        // console.log(medias);
        try {
            const { message } = yield post_services_1.default.deleteMedias({
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
    delete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_post } = req.body;
        try {
            const { message } = yield post_services_1.default.delete({ id_post });
            if (message) {
                return res.status(http_status_1.default.OK).send({
                    id_post,
                    message: message
                });
            }
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = postController;
