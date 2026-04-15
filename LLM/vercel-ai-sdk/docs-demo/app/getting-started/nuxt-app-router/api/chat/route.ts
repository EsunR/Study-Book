import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from "ai";
import { model } from "@/lib/model";
import { z } from "zod";

const weatherTool = tool({
  description: "获取指定城市的天气信息（华氏度）",
  inputSchema: z.object({
    location: z.string().describe("城市名称"),
  }),
  execute: async ({ location }) => {
    const weatherData: Record<string, { temp: number; condition: string }> = {
      北京: { temp: 77, condition: "晴天" },
      上海: { temp: 82, condition: "多云" },
      广州: { temp: 90, condition: "晴天" },
      深圳: { temp: 86, condition: "小雨" },
      杭州: { temp: 79, condition: "多云" },
      "New York": { temp: 72, condition: "Sunny" },
      London: { temp: 59, condition: "Rainy" },
    };

    const weather = weatherData[location];
    if (!weather) {
      throw new Error(`无法获取 ${location} 的天气信息`);
    }
    return {
      location,
      temperature: weather.temp,
      condition: weather.condition,
    };
  },
});

const convertFahrenheitToCelsiusTool = tool({
  description: "将华氏温度转换为摄氏温度",
  inputSchema: z.object({
    temperature: z.number().describe("华氏温度"),
  }),
  execute: async ({ temperature }) => {
    const celsius = Math.round((temperature - 32) * (5 / 9));
    return { celsius };
  },
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  console.log(JSON.stringify(messages));
  const modelMessages = await convertToModelMessages(messages);
  console.log(JSON.stringify(modelMessages));

  const result = streamText({
    model,
    system: "你是一个友好的助手，用中文回答问题。你可以使用工具来获取天气信息和转换温度。",
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      weather: weatherTool,
      convertFahrenheitToCelsius: convertFahrenheitToCelsiusTool,
    },
    onStepFinish: ({ toolResults }) => {
      console.log("Step finished:", toolResults);
    },
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse();
}
