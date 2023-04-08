"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
const router = express_1.default.Router();
router.get('/getChatsByIDGroup', message_controller_1.default.getChatsByIDGroup);
router.get('/gets', message_controller_1.default.getGroups);
exports.default = router;
