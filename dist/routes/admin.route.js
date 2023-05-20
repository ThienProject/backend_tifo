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
router.post('/post/lock', admin_controller_1.default.lockPost);
router.post('/user/lock', admin_controller_1.default.lockUser);
router.post('/user/statistics', admin_controller_1.default.userStatistics);
router.post('/user/statistics/age', admin_controller_1.default.userStatisticsAge),
    router.post('/follow/statistics', admin_controller_1.default.followStatistics),
    router.post('/post/statistics', admin_controller_1.default.postStatistics);
exports.default = router;
