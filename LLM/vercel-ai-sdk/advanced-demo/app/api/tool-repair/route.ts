import { generateText, tool } from 'ai';
import { z } from 'zod';
import { model } from '@/lib/model';

// 定义一个可能产生无效调用的工具
const dataQueryTool = tool({
  description: '查询数据库中的数据',
  inputSchema: z.object({
    table: z.string().describe('表名'),
    fields: z.array(z.string()).describe('要查询的字段'),
    filter: z.object({
      field: z.string(),
      operator: z.enum(['eq', 'gt', 'lt', 'contains']),
      value: z.union([z.string(), z.number()]),
    }).describe('过滤条件'),
  }),
  execute: async ({ table, fields, filter }) => {
    return {
      table,
      fields,
      filter,
      results: [
        { id: 1, name: '示例数据1', value: 100 },
        { id: 2, name: '示例数据2', value: 200 },
      ],
    };
  },
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await generateText({
      model,
      tools: {
        queryData: dataQueryTool,
      },
      prompt,
    });

    return Response.json({
      text: result.text,
      toolCalls: result.toolCalls,
      toolResults: result.toolResults,
      usage: result.usage,
    });
  } catch (error) {
    console.error('Tool repair error:', error);
    return Response.json({ error: '工具修复失败' }, { status: 500 });
  }
}
