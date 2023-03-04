"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRefreshToken = exports.validateToken = exports.generateToken = void 0;
const { sign, verify } = require("jsonwebtoken");
const freeze_1 = __importDefault(require("../../configs/freeze"));
const generateToken = (payload) => {
    const { id_user, username, id_role } = payload;
    const accessToken = sign({ id_user, username, id_role }, freeze_1.default.JWT_SECRET, {
        expiresIn: freeze_1.default.tokenLife,
    });
    const refreshToken = sign({ id_user, username, id_role }, freeze_1.default.SECRET_REFRESH, {
        expiresIn: freeze_1.default.refreshTokenLife,
    });
    return { accessToken, refreshToken };
};
exports.generateToken = generateToken;
const validateToken = (accessToken) => {
    const key = freeze_1.default.JWT_SECRET;
    try {
        const validToken = verify(accessToken, key);
        return validToken;
    }
    catch (error) {
        return false;
    }
};
exports.validateToken = validateToken;
const validateRefreshToken = (refreshToken) => {
    const key = freeze_1.default.SECRET_REFRESH;
    const validToken = verify(refreshToken, key);
    return validToken;
};
exports.validateRefreshToken = validateRefreshToken;
