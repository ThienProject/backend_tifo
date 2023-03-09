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
const comment_services_1 = __importDefault(require("../services/comment.services"));
const http_status_1 = __importDefault(require("http-status"));
const __1 = require("..");
const fs = require('fs');
const commentController = {
    getComments: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const query = req.query;
        try {
            const { comments } = yield comment_services_1.default.getComments(query);
            if (comments) {
                return res.status(http_status_1.default.OK).send({
                    comments: comments,
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, id_post, id_reply, id_parent, comment, } = req.body;
        try {
            const { newComment } = yield comment_services_1.default.create({
                id_user,
                id_post,
                id_reply,
                id_parent,
                comment
            });
            __1.io.emit("new-comment", { newComment });
            return res.status(http_status_1.default.CREATED).send({
                newComment
            });
        }
        catch (error) {
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_parent, id_comment, id_user, comment } = req.body;
        try {
            const { message } = yield comment_services_1.default.updateComment({
                id_comment,
                comment,
                id_parent,
                id_user
            });
            __1.io.emit("edit-comment", {
                editComment: {
                    id_comment,
                    comment,
                    id_parent,
                    id_user
                }
            });
            return res.status(http_status_1.default.OK).send({
                message
            });
        }
        catch (error) {
            next(error);
        }
    }),
    delete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_comment, id_parent, id_user, } = req.body;
        try {
            const { message } = yield comment_services_1.default.deleteComment({ id_comment });
            __1.io.emit("delete-comment", {
                deleteComment: {
                    id_comment,
                    id_parent,
                    id_user
                }
            });
            return res.status(http_status_1.default.OK).send({
                message
            });
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = commentController;
