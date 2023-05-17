"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
const router = express_1.default.Router();
// router.post(
//   '/register',
//   validate(authValidation.register),
//   authController.register
// );
router.post('/user/gets', admin_controller_1.default.getUsers);
router.post('/user/get', admin_controller_1.default.getUserByID);
router.post('/post/gets', admin_controller_1.default.getPosts);
router.post('/post/get', admin_controller_1.default.getPost);
exports.default = router;
