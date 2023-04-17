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
exports.isAuth = void 0;
const JWT_1 = require("./JWT");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Lấy access token từ header
    try {
        const accessTokenFromHeader = req.headers.authorization;
        const refreshTokenFromHeader = ((_a = req.headers.refreshtoken) === null || _a === void 0 ? void 0 : _a.toString()) || '';
        const accessToken = accessTokenFromHeader === null || accessTokenFromHeader === void 0 ? void 0 : accessTokenFromHeader.split(' ')[1];
        const refreshToken = refreshTokenFromHeader && refreshTokenFromHeader.split(' ')[1];
        const isValidToken = accessToken && (0, JWT_1.validateToken)(accessToken);
        // console.log("isValidToken", isValidToken);
        // console.log("accessToken", accessTokenFromHeader);
        // console.log("refreshToken--------------------------------------------------------------------------");
        // console.log("refreshToken", refreshToken);
        if (!isValidToken) {
            const verifiedRefreshToken = refreshToken && (0, JWT_1.validateRefreshToken)(refreshToken);
            console.log("verifiedRefreshToken", verifiedRefreshToken);
            if (!verifiedRefreshToken) {
                console.log("....................................");
                next();
                // return  res.status(401).send();
            }
        }
        return next();
    }
    catch (error) {
        next(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Login timeout. Please login again !'));
    }
});
exports.isAuth = isAuth;
