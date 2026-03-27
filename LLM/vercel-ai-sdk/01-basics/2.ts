import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { jsonSchema, stepCountIs, streamText } from "ai";
import "dotenv/config";

const customOpenai = createOpenAICompatible({
  name: "qianfan",
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.API_BASE_URL!,
});

const model = customOpenai("minimax-m2.5");

const result = streamText({
  model,
  tools: {
    getWeather: {
      description: "获取指定城市的天气信息",
      inputSchema: jsonSchema({
        type: "object",
        properties: {
          city: {
            type: "string",
            description: "城市名称，如 '旧金山'",
          },
        },
        required: ["city"],
      }),
      execute: async ({ city }) => {
        // 模拟天气数据
        await new Promise((r) => setTimeout(r, 200));
        return {
          city,
          temperature: "20°C",
          condition: "晴朗",
        };
      },
    },
  },
  prompt: "查询旧金山天气",
  stopWhen: stepCountIs(5),
});

for await (const part of result.fullStream) {
  switch (part.type) {
    // 文本
    case "text-delta":
      process.stdout.write(part.text);
      break;
    case 'text-start':
      console.log("=======文本开始=======");
      break;
    case 'text-end':
      console.log("\n=======文本结束=======");
      break;
    // 思考
    case "reasoning-delta":
      process.stdout.write(part.text);
      break;
    case 'reasoning-start':
      console.log("=======思考开始=======");
      break;
    case 'reasoning-end':
      console.log("\n=======思考结束=======");
      break;
    // 工具调用
    case "tool-call":
      console.log("工具调用:", part.toolCallId, part.toolName, part.input);
      break;
    case "tool-result":
      console.log("工具结果:", part.output);
      break;
    case "error":
      console.error("错误:", part.error);
      break;
    case "finish":
      console.log("完成");
      break;
  }

  // console.log(`[${part.type}]`, part);
}
