// useObject API Route
import { streamObject } from 'ai';
import { z } from 'zod';
import { model } from '@/lib/model';

export const maxDuration = 30;

// 定义输出 Schema
const schema = z.object({
  name: z.string().describe('姓名'),
  age: z.number().describe('年龄'),
  skills: z.array(z.string()).describe('技能列表'),
  bio: z.string().describe('个人简介'),
  experience: z.number().describe('工作年限'),
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamObject({
    model,
    system: '你是一个人才档案生成器。根据提示生成虚拟的人才档案。',
    schema,
    prompt,
  });

  return result.toTextStreamResponse();
}
