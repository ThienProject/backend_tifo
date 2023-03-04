"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const freeze = Object.freeze({
    JWT_SECRET: "tifosecret",
    SECRET_REFRESH: "tifosecretrefreshsecret",
    tokenLife: '12h',
    refreshTokenLife: '12h'
});
exports.default = freeze;
