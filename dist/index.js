"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const error_1 = require("./middleware/error");
const multer_1 = __importDefault(require("multer"));
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
    origin: 'http://localhost:3000',
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
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
});
exports.io.on("connection", (socket) => {
    console.log("connection io");
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("disconnect", () => {
        console.log("🔥: A user disconnected");
    });
});
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
