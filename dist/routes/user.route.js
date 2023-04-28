"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validate_1 = __importDefault(require("../middleware/validate"));
const user_validations_1 = __importDefault(require("../validations/user.validations"));
const auth_middleware_1 = require("../middleware/auth/auth.middleware");
const router = express_1.default.Router();
router.get('/gets', (0, validate_1.default)(user_validations_1.default.getUsers), user_controller_1.default.getUsers);
router.get('/suggests/gets', user_controller_1.default.getUserSuggests);
router.post('/get', (0, validate_1.default)(user_validations_1.default.getUser), user_controller_1.default.getUser);
router.post('/follow/request', auth_middleware_1.isAuth, (0, validate_1.default)(user_validations_1.default.follow), user_controller_1.default.requestFollow);
router.post('/follow/accept', auth_middleware_1.isAuth, (0, validate_1.default)(user_validations_1.default.follow), user_controller_1.default.acceptFollow);
router.post('/follow/reject', auth_middleware_1.isAuth, (0, validate_1.default)(user_validations_1.default.follow), user_controller_1.default.rejectFollow);
router.post('/unfollow', auth_middleware_1.isAuth, (0, validate_1.default)(user_validations_1.default.follow), user_controller_1.default.unfollow);
exports.default = router;
