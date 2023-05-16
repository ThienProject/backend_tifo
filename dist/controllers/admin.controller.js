"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_services_1 = __importDefault(require("../services/admin.services"));
const authController = {
    getUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { offset, limit, id_role, filters } = req.body;
        try {
            const { users, messages, total } = yield admin_services_1.default.getUsers({ offset, limit, id_role, filters });
            if (users) {
                res.send({
                    users, total, messages
                });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    getUserByID: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_user } = req.body;
            try {
                const { user, message } = yield admin_services_1.default.getUserByID({ id_user });
                if (user) {
                    res.send({
                        user
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = authController;
