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
exports.executeDb = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
// // create the connection to database
const config = {
    db: {
        host: process.env.HOST_DOMAIN || 'mysql-152494-0.cloudclusters.net',
        port: process.env.PORT_DATABASE || 10010,
        user: process.env.USER || 'admin',
        password: process.env.PASSWORD || 'R2p4wdLg',
        database: process.env.DATABASE || 'tifo',
        connectionLimit: 10,
        waitForConnections: true
    },
};
console.log(config);
// const config = {
//   db: {
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'tifo',
//     connectionLimit: 10,
//     waitForConnections: true
//   },
// };
const pool = promise_1.default.createPool(config.db);
function queryDb(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield pool.getConnection();
        try {
            const [rows] = yield connection.query(query);
            return rows;
        }
        finally {
            connection.release();
        }
    });
}
function executeDb(query, values) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield pool.getConnection();
        try {
            const [result] = yield connection.execute(query, values);
            console.log({ result });
            return result;
        }
        finally {
            connection.release();
        }
    });
}
exports.executeDb = executeDb;
exports.default = queryDb;
