"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validate_1 = __importDefault(require("../middleware/validate"));
const post_validation_1 = __importDefault(require("../validations/post.validation"));
const user_validations_1 = __importDefault(require("../validations/user.validations"));
const router = express_1.default.Router();
router.get('/search', (0, validate_1.default)(user_validations_1.default.getUsers), user_controller_1.default.getUsers);
router.post('/get', (0, validate_1.default)(user_validations_1.default.getUser), user_controller_1.default.getUser);
router.get('/getPosts', (0, validate_1.default)(post_validation_1.default.getPosts), user_controller_1.default.getPosts);
router.get('/getReels', (0, validate_1.default)(post_validation_1.default.getPosts), user_controller_1.default.getReels);
router.get('/getSaves', (0, validate_1.default)(post_validation_1.default.getPosts), user_controller_1.default.getSaves);
exports.default = router;
