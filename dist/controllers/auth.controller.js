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
const auth_services_1 = __importDefault(require("../services/auth.services"));
const JWT_1 = require("../middleware/auth/JWT");
const http_status_1 = __importDefault(require("http-status"));
const authController = {
    getMe: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user } = req.body;
            try {
                const { user, message } = yield auth_services_1.default.getMe(id_user);
                if (user) {
                    res.send({
                        user, message
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    },
    getNotifications: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user } = req.body;
        try {
            const { notifications, message } = yield auth_services_1.default.getNotifications(id_user);
            if (notifications) {
                res.send({
                    notifications, message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    sendNotification: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, id_actor, content, type } = req.body;
        try {
            const { message } = yield auth_services_1.default.sendNotification({ id_user, id_actor, content, type });
            if (message) {
                res.send({
                    message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, fullname, username } = req.body;
        try {
            const { user, message } = yield auth_services_1.default.register({ email, password, fullname, username });
            if (user) {
                res.status(http_status_1.default.CREATED).send({
                    user, message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const { user, message } = yield auth_services_1.default.login({ email, password });
            if (user) {
                const { accessToken, refreshToken } = (0, JWT_1.generateToken)(user);
                res.status(http_status_1.default.OK).send({
                    user, message,
                    accessToken,
                    refreshToken
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    updateInfo: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, email, phone, fullname, username, description, birthday, gender } = req.body;
        try {
            const { user, message, rules } = yield auth_services_1.default.updateInfo({ id_user, email, phone, fullname, username, description, birthday, gender });
            if (user) {
                const { accessToken, refreshToken } = (0, JWT_1.generateToken)(user);
                res.status(http_status_1.default.OK).send({
                    user, message, accessToken, refreshToken
                });
            }
            if (rules) {
                res.status(http_status_1.default.OK).send({
                    message, rules
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    updatePassword: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, password, currentPassword } = req.body;
        try {
            const { message } = yield auth_services_1.default.updatePassword({ id_user, password, currentPassword });
            if (message) {
                res.status(http_status_1.default.OK).send({
                    message
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    updateImage: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { type, id_user } = req.body;
        const image = req.file;
        try {
            const { message, user } = yield auth_services_1.default.updateImage({ image, type, id_user });
            if (message) {
                if (user) {
                    const { accessToken, refreshToken } = (0, JWT_1.generateToken)(user);
                    res.status(http_status_1.default.OK).send({
                        user, message, accessToken, refreshToken, user_image: image === null || image === void 0 ? void 0 : image.filename, type
                    });
                }
            }
        }
        catch (error) {
            next(error);
        }
    }),
    updateInvisible: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user, invisible } = req.body;
        try {
            const { message } = yield auth_services_1.default.updateInvisible({ id_user, invisible });
            if (message) {
                res.status(http_status_1.default.OK).send({
                    message, invisible
                });
            }
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = authController;
