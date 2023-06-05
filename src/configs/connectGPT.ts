import axios from 'axios';

const model = 'text-davinci-003';
const apiKey = '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';
// const context = [
//   { "role": "user", "content": "Tôi là Thiên." },
//   // { "role": "chatbot", "content": "" },
// ];

type TMessage = { role: string, content: string }
export type TContext = TMessage[];
export const sendMessage = async (context: TContext) => {
  const promptHis = context.reduce((acc, obj) => {
    return `${acc}${obj.content}\n`;
  }, `Bạn là một chatbot trong mạng xã hội với username là 'tifo-chatbot'. Bạn có nhiệm vụ trò chuyện với mọi người dùng. Dưới đây là đoạn hội thoại của chúng ta. hãy tiếp tục cuộc hội thoại này!.\n
`);
  return await axios
    .post(
      'https://api.openai.com/v1/engines/' + model + '/completions',
      {
        prompt: promptHis,
        max_tokens: 500,
        n: 1,
        stop: null,
        temperature: 0.4
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apiKey
        }
      }
    )
    .then((response) => {
      console.log("có kết quả : ", response.data.choices)
      return response.data.choices[0].text;
    })
    .catch((error) => {
      console.log("có lỗi api gpt", error)
      throw error
    });
};
