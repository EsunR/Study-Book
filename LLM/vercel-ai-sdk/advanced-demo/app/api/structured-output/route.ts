import { generateText, Output } from 'ai';
import { z } from 'zod';
import { model } from '@/lib/model';

// 定义 Schema
const personSchema = z.object({
  name: z.string().describe('人物姓名'),
  age: z.number().describe('年龄'),
  occupation: z.string().describe('职业'),
  skills: z.array(z.string()).describe('技能列表'),
  education: z.object({
    degree: z.string().describe('学位'),
    school: z.string().describe('学校'),
  }).describe('教育背景'),
});

const weatherSchema = z.object({
  location: z.string(),
  temperature: z.number(),
  condition: z.string(),
  humidity: z.number(),
});

export async function POST(req: Request) {
  try {
    const { type, prompt } = await req.json();

    let result;

    switch (type) {
      case 'object': {
        // 对象输出
        result = await generateText({
          model,
          output: Output.object({ schema: personSchema }),
          prompt: prompt || '生成一个软件工程师的档案',
        });
        return Response.json({ type: 'object', output: result.output });
      }

      case 'array': {
        // 数组输出
        result = await generateText({
          model,
          output: Output.array({ element: weatherSchema }),
          prompt: prompt || '列出北京、上海、广州三个城市的天气信息',
        });
        return Response.json({ type: 'array', output: result.output });
      }

      case 'choice': {
        // 选择输出
        result = await generateText({
          model,
          output: Output.choice({
            options: ['positive', 'negative', 'neutral'] as const,
          }),
          prompt: prompt || '分析这句话的情感：今天天气真不错！',
        });
        return Response.json({ type: 'choice', output: result.output });
      }

      case 'json': {
        // 自由 JSON 输出
        result = await generateText({
          model,
          output: Output.json(),
          prompt: prompt || '返回一个包含城市名称、人口和著名景点的 JSON 对象',
        });
        return Response.json({ type: 'json', output: result.output });
      }

      case 'text':
      default: {
        // 纯文本输出
        result = await generateText({
          model,
          output: Output.text(),
          prompt: prompt || '用一句话解释什么是人工智能',
        });
        return Response.json({ type: 'text', output: result.output });
      }
    }
  } catch (error) {
    console.error('Structured output error:', error);
    return Response.json({ error: '生成失败', details: String(error) }, { status: 500 });
  }
}
