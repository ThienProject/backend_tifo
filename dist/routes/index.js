"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const post_route_1 = __importDefault(require("./post.route"));
const comment_route_1 = __importDefault(require("./comment.route"));
const group_route_1 = __importDefault(require("./group.route"));
const chat_route_1 = __importDefault(require("./chat.route"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: '/search',
        route: user_route_1.default,
    },
    {
        path: '/auth',
        route: auth_route_1.default,
    },
    {
        path: '/post',
        route: post_route_1.default,
    },
    {
        path: '/user',
        route: user_route_1.default,
    },
    {
        path: '/comment',
        route: comment_route_1.default,
    },
    {
        path: '/group',
        route: group_route_1.default,
    },
    {
        path: '/chat',
        route: chat_route_1.default,
    },
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
