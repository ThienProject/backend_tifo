"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_middleware_1 = require("../middleware/auth/auth.middleware");
const validate_1 = __importDefault(require("../middleware/validate"));
const auth_validations_1 = __importDefault(require("../validations/auth.validations"));
const router = express_1.default.Router();
router.post('/register', (0, validate_1.default)(auth_validations_1.default.register), auth_controller_1.default.register);
router.post('/login', (0, validate_1.default)(auth_validations_1.default.login), auth_controller_1.default.login);
router.post('/getMe', (0, validate_1.default)(auth_validations_1.default.getMe), auth_middleware_1.isAuth, auth_controller_1.default.getMe);
exports.default = router;
