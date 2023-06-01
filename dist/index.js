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
exports.userSockets = exports.io = void 0;
const express_1 = __importDefault(require("express"));
const fs = require('fs');
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const error_1 = require("./middleware/error");
const multer_1 = __importDefault(require("multer"));
const https = require('https');
const user_services_1 = __importDefault(require("./services/user.services"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
(0, morgan_1.default)('dev'); // log info request
app.use(express_1.default.json()); // convert json to javascript type;
app.use(express_1.default.urlencoded({ extended: true })); //convert application/x-www-form-urlencoded (form data)
// config path media
app.use('/', express_1.default.static('src/public'));
app.use((err, req, res, next) => {
    if (err instanceof multer_1.default.MulterError) {
        // A Multer error occurred when uploading the files
        console.log('Multer error:', err);
        res.status(500).send('Multer error');
    }
    else {
        // An unknown error occurred
        console.log('Unknown error:', err);
        res.status(500).send('Unknown error');
    }
});
app.use((0, cors_1.default)({
    // origin: 'http://localhost:3000', // Hoặc cấu hình nguồn gốc của bạn (ví dụ: 'http://localhost:3000')
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
}));
// v1 api routes
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use(error_1.errorConverter);
app.use(error_1.errorHandler);
const server = require('http').createServer(app);
exports.io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
    }
});
exports.userSockets = {};
exports.io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.id_user = socket.handshake.query.id_user;
    console.log(`⚡: ${socket.id_user} user just connected!`);
    exports.userSockets[socket.id_user] = socket;
    if (socket.id_user && socket.id_user != 'undefined') {
        yield user_services_1.default.setOnline(socket.id_user);
    }
    socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("🔥: A user disconnected " + socket.id_user);
        if (socket.id_user && socket.id_user != 'undefined') {
            yield user_services_1.default.setOffline(socket.id_user);
        }
        delete exports.userSockets[socket.id_user];
    }));
}));
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
