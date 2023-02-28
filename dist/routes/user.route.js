"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
// import validate from '../middlewares/validate';
// import authValidation from '../validations/auth.validation';
const router = express_1.default.Router();
router.get('/search', 
// validate(authValidation.register),
user_controller_1.default.getUsers);
exports.default = router;
