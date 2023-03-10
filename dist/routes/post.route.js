"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middleware/validate"));
const auth_middleware_1 = require("../middleware/auth/auth.middleware");
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const post_validation_1 = __importDefault(require("../validations/post.validation"));
const upload_1 = __importDefault(require("../middleware/upload"));
const router = express_1.default.Router();
router.post('/create', auth_middleware_1.isAuth, (0, upload_1.default)("medias").array('medias[]', 12), (0, validate_1.default)(post_validation_1.default.create), post_controller_1.default.create);
router.post('/update', auth_middleware_1.isAuth, (0, validate_1.default)(post_validation_1.default.update), post_controller_1.default.update);
router.delete('/delete', auth_middleware_1.isAuth, (0, validate_1.default)(post_validation_1.default.delete), auth_middleware_1.isAuth, post_controller_1.default.delete);
router.get('/getPosts', (0, validate_1.default)(post_validation_1.default.getPosts), post_controller_1.default.getPosts);
router.get('/getPostById', (0, validate_1.default)(post_validation_1.default.getPostById), post_controller_1.default.getPostById);
exports.default = router;
