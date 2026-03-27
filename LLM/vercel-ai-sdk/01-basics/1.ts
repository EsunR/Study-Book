import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText, streamText } from "ai";
import "dotenv/config";

const customOpenai = createOpenAICompatible({
  name: "qianfan",
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.API_BASE_URL!,
});

const model = customOpenai("minimax-m2.5");
const result = await generateText({
  model,
  prompt: "写一首诗",
  system: "你是一个诗人，擅长写古风诗歌",
  onFinish: (result) => {
    console.log("FINISH", result);
  },
});

console.log(result);
