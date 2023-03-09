"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth/auth.middleware");
const comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
const router = express_1.default.Router();
router.post('/create', auth_middleware_1.isAuth, comment_controller_1.default.create);
router.delete('/delete', auth_middleware_1.isAuth, comment_controller_1.default.delete);
router.post('/update', auth_middleware_1.isAuth, comment_controller_1.default.update);
router.get('/get', comment_controller_1.default.getComments);
exports.default = router;
