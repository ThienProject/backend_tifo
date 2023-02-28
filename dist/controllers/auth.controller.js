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
const authController = {
    getMe: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const { user, messages } = yield auth_services_1.default.getMe(email);
                if (user) {
                    res.send({
                        user, messages
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    },
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, fullname, username } = req.body;
        try {
            const { user, messages } = yield auth_services_1.default.register({ email, password, fullname, username });
            if (user) {
                res.send({
                    user, messages
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
            const { user, messages } = yield auth_services_1.default.login({ email, password });
            if (user) {
                res.send({
                    user, messages
                });
            }
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = authController;
