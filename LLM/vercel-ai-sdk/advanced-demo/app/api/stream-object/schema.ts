import { z } from "zod";

// 文章大纲 Schema
export const articleOutlineSchema = z.object({
  title: z.string().describe("文章标题"),
  summary: z.string().describe("文章摘要"),
  sections: z
    .array(
      z.object({
        heading: z.string().describe("章节标题"),
        points: z.array(z.string()).describe("章节要点"),
      })
    )
    .describe("章节列表"),
  keywords: z.array(z.string()).describe("关键词"),
});

// 菜谱 Schema
export const recipeSchema = z.object({
  name: z.string().describe("菜名"),
  cuisine: z.string().describe("菜系"),
  difficulty: z.enum(["简单", "中等", "困难"]).describe("难度"),
  time: z.string().describe("预计烹饪时间"),
  ingredients: z
    .array(
      z.object({
        name: z.string().describe("食材名称"),
        amount: z.string().describe("用量"),
      })
    )
    .describe("食材列表"),
  steps: z
    .array(
      z.object({
        step: z.number().describe("步骤编号"),
        instruction: z.string().describe("操作说明"),
        tips: z.string().optional().describe("小贴士"),
      })
    )
    .describe("烹饪步骤"),
});

export type ArticleOutline = z.infer<typeof articleOutlineSchema>;
export type Recipe = z.infer<typeof recipeSchema>;
