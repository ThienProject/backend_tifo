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
const __1 = require("..");
const auth_services_1 = __importDefault(require("../services/auth.services"));
const __2 = require("..");
const userController = {
    getUser: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user, id_me } = req.body;
            try {
                const { user, message } = yield user_services_1.default.getUser({ id_me, id_user });
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
    requestFollow: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_follower, id_user } = req.body;
            try {
                const { message, id_follow } = yield user_services_1.default.requestFollow({ id_follower, id_user });
                if (message) {
                    yield auth_services_1.default.sendNotification({ id_follow, id_actor: id_follower, id_user, type: 'follow' });
                    res.send({
                        message,
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    },
    acceptFollow: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_follower, id_user, id_noti, id_follow } = req.body;
            try {
                const { message, followers } = yield user_services_1.default.acceptFollow({ id_follower, id_user });
                if (message) {
                    if (id_noti) {
                        yield auth_services_1.default.sendNotification({ id_follow, id_actor: id_user, id_user: id_follower, type: 'accept_follow' });
                        yield auth_services_1.default.removeNotification({ id_noti });
                    }
                    res.send({
                        message,
                        followers
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    },
    unfollow: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_follower, id_user } = req.body;
            try {
                const { message, followers } = yield user_services_1.default.unfollow({ id_follower, id_user });
                if (message) {
                    const userActive = __1.userSockets[id_user];
                    if (userActive) {
                        __2.io.to(userActive.id).emit('delete-notification', { id_actor: id_follower, id_user });
                    }
                    res.send({
                        message,
                        followers
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    },
    rejectFollow: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_follower, id_user, id_noti } = req.body;
            try {
                const { message, followers } = yield user_services_1.default.rejectFollow({ id_follower, id_user });
                if (message) {
                    if (id_noti) {
                        yield auth_services_1.default.removeNotification({ id_noti });
                    }
                    res.send({
                        message,
                        followers
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    },
    getUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { q, offset, limit, id_user } = req.query;
        try {
            const { users, messages } = yield user_services_1.default.getUsers({ q, offset, limit, id_user });
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
    getFollowers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user } = req.query;
        try {
            const { users, messages } = yield user_services_1.default.getFollowers({ id_user });
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
    getFollowings: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user } = req.query;
        try {
            const { users, messages } = yield user_services_1.default.getFollowings({ id_user });
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
    getUserSuggests: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { offset, limit, id_user } = req.query;
        try {
            const { users, messages } = yield user_services_1.default.getUserSuggests({ offset, limit, id_user });
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
    getUsersNotInRoom: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { q, offset, limit, id_user, id_room } = req.query;
        try {
            const { users, messages } = yield user_services_1.default.getUsersNotInRoom({ q, offset, limit, id_user, id_room });
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
    reportPost: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_post, id_user, reason, } = req.body;
        try {
            const { message } = yield user_services_1.default.reportPost({
                id_post,
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
};
exports.default = userController;
