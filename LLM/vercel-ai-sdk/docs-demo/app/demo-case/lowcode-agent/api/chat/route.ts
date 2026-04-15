import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
import { model } from "@/lib/model";
import { submitSchemaInput, parseSectionSchema } from "./tool-schema";
import { buildSystemPrompt } from "./system-prompt";

const submitSchemaTool = tool({
  description: "生成低代码页面 schema。当收集完用户需求、信息足够时调用此工具",
  inputSchema: submitSchemaInput,
  execute: async (input) => {
    // 解析每个 section 的 schema JSON 字符串
    const sections = input.sections.map((section) => {
      let parsedSchema;
      try {
        parsedSchema = parseSectionSchema(section.schema);
      } catch (e) {
        parsedSchema = {
          type: "Section",
          props: { title: section.name },
          children: [
            {
              type: "Text",
              props: {
                text: `⚠ Schema 解析错误: ${e instanceof Error ? e.message : "未知错误"}`,
              },
            },
          ],
        };
      }

      return {
        id: section.id,
        name: section.name,
        visible: section.visible,
        schema: parsedSchema,
      };
    });

    return {
      meta: input.meta,
      theme: input.theme,
      sections,
    };
  },
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model,
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      submitSchema: submitSchemaTool,
    },
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse();
}
