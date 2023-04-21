"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
const auth_middleware_1 = require("../middleware/auth/auth.middleware");
const router = express_1.default.Router();
router.post('/create', auth_middleware_1.isAuth, message_controller_1.default.createChat);
router.post('/createFirst', auth_middleware_1.isAuth, message_controller_1.default.createFirstChat);
exports.default = router;
