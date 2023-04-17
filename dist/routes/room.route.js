"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
const auth_middleware_1 = require("../middleware/auth/auth.middleware");
const validate_1 = __importDefault(require("../middleware/validate"));
const room_validation_1 = __importDefault(require("../validations/room.validation"));
const router = express_1.default.Router();
router.get('/getChatsByIDRoom', auth_middleware_1.isAuth, message_controller_1.default.getChatsByIDRoom);
router.get('/gets', 
// isAuth,
message_controller_1.default.getRooms);
router.get('/search', auth_middleware_1.isAuth, (0, validate_1.default)(room_validation_1.default.searchRoomOrUser), message_controller_1.default.searchRoomOrUser);
exports.default = router;
