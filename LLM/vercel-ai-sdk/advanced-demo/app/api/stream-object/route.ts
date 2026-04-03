import { streamText, Output } from "ai";
import { z } from "zod";
import { model } from "@/lib/model";
import { articleOutlineSchema, recipeSchema } from "./schema";

export async function POST(req: Request) {
  try {
    const { type, prompt } = await req.json();

    let schema: z.ZodTypeAny;
    let defaultPrompt: string;

    switch (type) {
      case "recipe": {
        schema = recipeSchema;
        defaultPrompt = "生成一道经典川菜的菜谱";
        break;
      }
      case "article":
      default: {
        schema = articleOutlineSchema;
        defaultPrompt = "写一篇关于人工智能未来发展的文章大纲";
        break;
      }
    }

    const result = streamText({
      model,
      output: Output.object({ schema }),
      prompt: prompt || defaultPrompt,
    });

    // 使用 toTextStreamResponse 流式输出
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Stream object error:", error);
    return Response.json({ error: "流式结构化输出失败" }, { status: 500 });
  }
}
