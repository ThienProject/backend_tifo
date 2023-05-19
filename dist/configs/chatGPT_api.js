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
const model = 'text-davinci-003';
const apiKey = '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';
const sendMessage = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default
        .post('https://api.openai.com/v1/engines/' + model + '/completions', {
        prompt: prompt,
        max_tokens: 500,
        n: 1,
        stop: null,
        temperature: 0.5
    }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + apiKey
        }
    })
        .then((response) => {
        console.log(response.data.choices[0].text);
        return response.data.choices[0].text;
    })
        .catch((error) => {
        console.error(error);
    });
});
exports.sendMessage = sendMessage;
