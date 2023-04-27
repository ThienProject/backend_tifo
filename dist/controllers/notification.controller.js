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
    requestFollow: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_follower, id_user } = req.body;
            try {
                const { message } = yield user_services_1.default.requestFollow({ id_follower, id_user });
                if (message) {
                    res.send({
                        message,
                    });
                    const userActive = __1.userSockets[id_user];
                    if (userActive) {
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    },
    acceptFollow: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_follower, id_user } = req.body;
            try {
                const { message, followers } = yield user_services_1.default.acceptFollow({ id_follower, id_user });
                if (message) {
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
            const { id_follower, id_user } = req.body;
            try {
                const { message, followers } = yield user_services_1.default.rejectFollow({ id_follower, id_user });
                if (message) {
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
