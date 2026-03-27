import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText, jsonSchema } from "ai";
import "dotenv/config";

const customOpenai = createOpenAICompatible({
  name: "qianfan",
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.API_BASE_URL!,
});

const model = customOpenai("minimax-m2.5");

const result = await generateText({
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
        console.log(`查询天气: ${city}`);
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
  prompt: "你好",
});

console.log(result.reasoningText);
