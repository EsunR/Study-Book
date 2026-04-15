// useChat API Route
import {
  streamText,
  convertToModelMessages,
  UIMessage,
  stepCountIs,
  Tool,
  Output,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";
import { model } from "@/lib/model";
import { z } from "zod";

export const maxDuration = 30;

// 定义输出 schema - 使用 discriminatedUnion 实现动态类型
const responseSchema = z.discriminatedUnion("type", [
  // 普通文本回复
  z.object({
    type: z.literal("plain_text"),
    data: z.string().describe("回复的文本内容"),
  }),
  // 天气卡片数据
  z.object({
    type: z.literal("weather_card"),
    data: z.object({
      city: z.string().describe("城市名称"),
      temperature: z.string().describe("温度"),
      condition: z.string().describe("天气状况"),
      humidity: z.string().describe("湿度"),
      wind: z.string().describe("风力信息"),
    }),
  }),
]);

// 自定义消息类型
type ChatUIMessage = UIMessage<
  never,
  {
    weather_card: {
      city: string;
      temperature: string;
      condition: string;
      humidity: string;
      wind: string;
    };
  }
>;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const getWeather: Tool = {
    description: "获取指定城市的天气信息",
    inputSchema: z.object({
      city: z.string().describe("城市名称"),
    }),
    execute: async ({ city }: { city: string }) => {
      const weatherData: Record<string, { temp: string; condition: string }> = {
        北京: { temp: "25°C", condition: "晴天" },
        上海: { temp: "28°C", condition: "多云" },
        广州: { temp: "32°C", condition: "晴天" },
        深圳: { temp: "30°C", condition: "小雨" },
        杭州: { temp: "26°C", condition: "多云" },
      };

      const weather = weatherData[city];

      if(!weather) {
        throw new Error(`无法获取 ${city} 的天气信息`);
      }

      return {
        city,
        temperature: weather.temp,
        condition: weather.condition,
        humidity: "65%",
        wind: "东南风 3级",
      };
    },
  };

  const getCurrentTime: Tool = {
    description: "获取当前时间",
    inputSchema: z.object({}),
    execute: async () => {
      return {
        time: new Date().toLocaleString("zh-CN", {
          timeZone: "Asia/Shanghai",
        }),
      };
    },
  };

  const stream = createUIMessageStream<ChatUIMessage>({
    execute: async ({ writer }) => {
      const result = streamText({
        model,
        system: "你是一个友好的助手，用中文回答问题。你可以使用工具来获取天气信息和当前时间。",
        stopWhen: stepCountIs(10),
        messages: await convertToModelMessages(messages),
        tools: {
          getWeather,
          getCurrentTime,
        },
        // 使用结构化输出
        output: Output.object({
          schema: responseSchema,
        }),
      });

      // 合并工具调用流（会显示工具调用过程）
      writer.merge(result.toUIMessageStream());

      // 等待并获取最终的结构化输出
      const output = await result.output;

      // 追加输出到消息流中 - 提供结构化的数据，前端可以根据 type 字段进行不同的渲染
      if (output.type === "weather_card") {
        writer.write({
          type: "data-weather_card",
          data: output.data,
        });
      }
    },
  });

  return createUIMessageStreamResponse({ stream });
}
