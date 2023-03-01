"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const freeze_1 = __importDefault(require("../configs/freeze"));
const generateToken = (payload) => {
    const { _id, isAdmin } = payload;
    const accessToken = jsonwebtoken_1.default.sign({ _id, isAdmin }, freeze_1.default.JWT_SECRET + '', {
        expiresIn: freeze_1.default.tokenLife,
    });
    const refreshToken = jsonwebtoken_1.default.sign({ _id, isAdmin }, freeze_1.default.SECRET_REFRESH + '', {
        expiresIn: freeze_1.default.refreshTokenLife,
    });
    return { accessToken, refreshToken };
};
const authService = {
    generateToken,
};
exports.default = authService;
