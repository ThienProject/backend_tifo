"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const error_1 = require("./middleware/error");
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
(0, morgan_1.default)('dev'); // log info request
app.use(express_1.default.json()); // convert json to javascript type;
app.use(express_1.default.urlencoded({ extended: true })); //convert application/x-www-form-urlencoded (form data)
// config path media
app.use('/', express_1.default.static('public'));
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
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});