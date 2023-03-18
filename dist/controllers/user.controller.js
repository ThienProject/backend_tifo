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
const http_status_1 = __importDefault(require("http-status"));
const user_services_1 = __importDefault(require("../services/user.services"));
const userController = {
    getUser: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user } = req.body;
            try {
                const { user, message } = yield user_services_1.default.getUser(id_user);
                if (user) {
                    res.send({
                        user
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    },
    getUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { q } = req.body;
        try {
            const { users, messages } = yield user_services_1.default.getUsers({ q });
            if (users) {
                res.send({
                    users, messages
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    getPosts: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, offset, limit } = req.query;
        try {
            const { posts, message } = yield user_services_1.default.getPosts({ id_user, offset, limit });
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
    getReels: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, offset, limit } = req.query;
        try {
            const { posts, message } = yield user_services_1.default.getReels({ id_user, offset, limit });
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
    getSaves: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, offset, limit } = req.query;
        try {
            const { posts, message } = yield user_services_1.default.getSaves({ id_user, offset, limit });
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
};
exports.default = userController;
