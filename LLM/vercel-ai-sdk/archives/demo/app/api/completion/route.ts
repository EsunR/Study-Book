// useCompletion API Route
import { streamText } from 'ai';
import { model } from '@/lib/model';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model,
    system: '你是一个专业的写作助手。请根据用户的提示生成高质量的内容。',
    prompt,
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse();
}
