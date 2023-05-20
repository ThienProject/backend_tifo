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
const admin_services_1 = __importDefault(require("../services/admin.services"));
const http_status_1 = __importDefault(require("http-status"));
const auth_services_1 = __importDefault(require("../services/auth.services"));
const authController = {
    getUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { offset, limit, id_role, filters } = req.body;
        try {
            const { users, messages, total } = yield admin_services_1.default.getUsers({ offset, limit, id_role, filters });
            if (users) {
                res.send({
                    users, total, messages
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    getPosts: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { offset, limit, id_user, filters } = req.body;
        try {
            const { posts, total, message } = yield admin_services_1.default.getPosts({ offset, limit, id_user, filters });
            if (posts) {
                res.send({
                    posts, total, message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    getPost: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const query = req.body;
        try {
            const { post, message } = yield admin_services_1.default.getPost(query);
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
    getUserByID: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user } = req.body;
            try {
                const { user, message } = yield admin_services_1.default.getUserByID({ id_user });
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
    lockUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, reason, } = req.body;
        try {
            const { message } = yield admin_services_1.default.lockUser({
                id_user,
                reason
            });
            return res.status(http_status_1.default.CREATED).send({
                message,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    lockPost: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_post, id_user, reason, } = req.body;
        try {
            const { message } = yield admin_services_1.default.lockPost({
                id_post,
                reason
            });
            if (message) {
                yield auth_services_1.default.sendNotification({ id_post, id_user, type: 'banned_post' });
                res.send({
                    message,
                });
            }
            return res.status(http_status_1.default.CREATED).send({
                message,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    userStatistics: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { total, increaseMonth } = yield admin_services_1.default.userStatistics();
            if (total) {
                res.send({
                    total,
                    increaseMonth
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    userStatisticsAge: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { statistics } = yield admin_services_1.default.userStatisticsAge();
            if (statistics) {
                res.send({
                    statistics
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    followStatistics: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { users } = yield admin_services_1.default.followStatistics();
            if (users) {
                res.send({
                    users
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    postStatistics: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { statistics } = yield admin_services_1.default.postStatistics();
            if (statistics) {
                res.send({
                    statistics
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = authController;
