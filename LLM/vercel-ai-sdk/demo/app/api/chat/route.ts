// useChat API Route
import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { model } from '@/lib/model';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model,
    system: '你是一个友好的助手，用中文回答问题。',
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
