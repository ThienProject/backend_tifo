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
exports.sendMessage = void 0;
const axios_1 = __importDefault(require("axios"));
const freeze_1 = __importDefault(require("./freeze"));
const model = 'text-davinci-003';
const apiKey = freeze_1.default.apiKey;
const sendMessage = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const promptHis = context.reduce((acc, obj) => {
        return `${acc}${obj.content}\n`;
    }, `Bạn là một chatbot trong mạng xã hội với username là 'tifo-chatbot'. Bạn có nhiệm vụ trò chuyện với mọi người dùng. Dưới đây là đoạn hội thoại của chúng ta. hãy tiếp tục cuộc hội thoại này!.\n
`);
    return yield axios_1.default
        .post('https://api.openai.com/v1/engines/' + model + '/completions', {
        prompt: promptHis,
        max_tokens: 500,
        n: 1,
        stop: null,
        temperature: 0.4
    }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + apiKey
        }
    })
        .then((response) => {
        console.log("có kết quả : ", response.data.choices);
        return response.data.choices[0].text;
    })
        .catch((error) => {
        console.log("có lỗi api gpt", error);
        throw error;
    });
});
exports.sendMessage = sendMessage;
