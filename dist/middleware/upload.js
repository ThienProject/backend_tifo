"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const upload = (url) => {
    var storage = multer_1.default.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, 'src/public/' + url); // './public/images/' directory name where save the file
        },
        filename: (req, file, callBack) => {
            const ext = path_1.default.extname(file.originalname);
            const newName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
            callBack(null, newName);
        }
    });
    const upload = (0, multer_1.default)({
        storage: storage
    });
    return upload;
};
exports.default = upload;
