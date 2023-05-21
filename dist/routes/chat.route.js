"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
const auth_middleware_1 = require("../middleware/auth/auth.middleware");
const upload_1 = __importDefault(require("../middleware/upload"));
const router = express_1.default.Router();
router.post('/create', auth_middleware_1.isAuth, (0, upload_1.default)("messages").single('image'), message_controller_1.default.createChat);
router.post('/createFirst', auth_middleware_1.isAuth, message_controller_1.default.createFirstChat);
router.post('/deletes', auth_middleware_1.isAuth, message_controller_1.default.deleteChats);
exports.default = router;
