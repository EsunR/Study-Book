import { z } from "zod";

// --- 递归 SchemaNode 验证（仅服务端使用）---

const schemaNodeSchema: z.ZodType<Record<string, unknown>> = z.lazy(() =>
  z.object({
    type: z.string(),
    className: z.string().optional(),
    props: z.record(z.string(), z.unknown()).optional(),
    children: z.array(schemaNodeSchema).optional(),
  })
);

/** 解析 sections[].schema 的 JSON 字符串并验证 */
export function parseSectionSchema(jsonStr: string): Record<string, unknown> {
  const parsed = JSON.parse(jsonStr);
  return schemaNodeSchema.parse(parsed) as Record<string, unknown>;
}

// --- 工具输入 Schema（LLM 填写）---
// schema 字段用 string，LLM 在 JSON 字符串中编写 SchemaNode 树

export const submitSchemaInput = z.object({
  meta: z.object({
    title: z.string().describe("页面标题"),
    description: z.string().optional().describe("页面描述"),
    keywords: z.array(z.string()).optional().describe("页面关键词"),
  }),
  theme: z.object({
    primary: z
      .string()
      .describe("主题色，十六进制，如 #6366f1"),
    secondary: z.string().optional().describe("辅助色"),
    accent: z.string().optional().describe("强调色"),
    background: z
      .string()
      .optional()
      .describe("页面背景色，如 #ffffff、#f5f5f5、#1a1a2e"),
    surface: z.string().optional().describe("卡片/容器背景色"),
    textPrimary: z.string().optional().describe("主文字颜色"),
    textSecondary: z.string().optional().describe("次文字颜色"),
  }),
  sections: z.array(
    z.object({
      id: z.string().describe("区块唯一标识，如 hero、products、about"),
      name: z.string().describe("区块名称，如 产品展示、公司简介"),
      visible: z.boolean().optional().describe("是否可见，默认 true"),
      schema: z
        .string()
        .describe(
          'SchemaNode 树的 JSON 字符串。示例：{"type":"Card","children":[{"type":"CardHeader","children":[{"type":"CardTitle","props":{"text":"热门产品"}}]}]}'
        ),
    })
  ),
});
