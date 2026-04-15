# 第二阶段：前端集成

> 学习 AI SDK UI 模块，使用 React Hooks 快速构建 AI 交互界面。

## 快速开始

```bash
# 进入 demo 目录
cd demo

# 安装依赖（如果还没安装）
npm install

# 配置环境变量
# 编辑 .env.local 文件，填入你的 API Key
# OPENAI_API_KEY=your_api_key_here

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看示例。

## 学习目标

- 掌握 `useChat` 构建聊天应用
- 掌握 `useCompletion` 实现文本补全
- 掌握 `useObject` 生成结构化数据
- 理解前后端数据同步机制
- 学会处理工具调用和附件

---

## 1. AI SDK UI 概述

AI SDK UI 是一个**框架无关**的工具包，简化了聊天流和 UI 更新的管理。

### 支持的框架

| 框架 | 包名 |
|------|------|
| React | `@ai-sdk/react` |
| Vue.js | `@ai-sdk/vue` |
| Svelte | `@ai-sdk/svelte` |
| Angular | `@ai-sdk/angular` |
| SolidJS | `ai-sdk-solid`（社区） |

### 核心功能

- **消息流式传输**：实时流式传输 AI 消息
- **状态管理**：自动管理输入、消息、状态、错误
- **无缝集成**：轻松集成到任何设计或布局

### 架构模式

```
┌─────────────────┐     HTTP/Stream     ┌─────────────────┐
│   React 前端     │ ◄──────────────────► │   API Route     │
│  (useChat 等)   │                      │ (streamText)    │
└─────────────────┘                      └─────────────────┘
```

---

## 2. useChat - 聊天应用

`useChat` 是构建聊天机器人最常用的 Hook。

### API Route（服务端）

```typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, UIMessage } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

### React 组件（前端）

```tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState('');

  return (
    <>
      {messages.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, index) =>
            part.type === 'text' ? <span key={index}>{part.text}</span> : null,
          )}
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Say something..."
        />
        <button type="submit" disabled={status !== 'ready'}>
          Submit
        </button>
      </form>
    </>
  );
}
```

### useChat 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| `messages` | UIMessage[] | 消息列表 |
| `sendMessage` | function | 发送消息 |
| `status` | string | 状态：`submitted`/`streaming`/`ready`/`error` |
| `error` | Error | 错误信息 |
| `stop` | function | 停止流式输出 |
| `regenerate` | function | 重新生成最后一条回复 |
| `setMessages` | function | 直接修改消息列表 |

### 消息结构

```typescript
interface UIMessage {
  id: string;
  role: 'user' | 'assistant';
  parts: MessagePart[];  // 推荐：使用 parts 渲染
  content: string;       // 向后兼容：纯文本内容
  createdAt?: Date;
  metadata?: Record<string, unknown>;  // 自定义元数据
}

type MessagePart =
  | { type: 'text'; text: string }
  | { type: 'tool-invocation'; ... }
  | { type: 'reasoning'; text: string }
  | { type: 'source-url'; url: string; title?: string }
  | { type: 'file'; url: string; mediaType?: string };
```

---

## 3. 状态管理

### Status 状态

```tsx
const { status, stop } = useChat();

// status 可能的值：
// - 'submitted': 消息已发送，等待响应流开始
// - 'streaming': 响应正在流式传输
// - 'ready': 响应完成，可以发送新消息
// - 'error': 发生错误

return (
  <>
    {(status === 'submitted' || status === 'streaming') && (
      <div>
        {status === 'submitted' && <Spinner />}
        <button onClick={stop}>Stop</button>
      </div>
    )}
  </>
);
```

### 错误处理

```tsx
const { error, regenerate } = useChat();

if (error) {
  return (
    <div>
      <p>发生错误</p>
      <button onClick={regenerate}>重试</button>
    </div>
  );
}
```

### 修改消息

```tsx
const { messages, setMessages } = useChat();

const handleDelete = (id: string) => {
  setMessages(messages.filter(message => message.id !== id));
};
```

---

## 4. 请求配置

### 请求级配置（推荐）

```tsx
sendMessage(
  { text: input },
  {
    headers: {
      Authorization: 'Bearer token123',
    },
    body: {
      temperature: 0.7,
      max_tokens: 100,
      user_id: '123',
    },
    metadata: {
      userId: 'user123',
    },
  },
);
```

### Hook 级配置

```tsx
const { messages, sendMessage } = useChat({
  transport: new DefaultChatTransport({
    api: '/api/custom-chat',
    headers: {
      Authorization: 'your_token',
    },
    body: {
      user_id: '123',
    },
    credentials: 'same-origin',
  }),
});
```

### 服务端接收

```typescript
export async function POST(req: Request) {
  const { messages, user_id, temperature } = await req.json();
  // ...
}
```

---

## 5. 消息元数据

服务端可以发送元数据，客户端可以访问：

### 服务端

```typescript
return result.toUIMessageStreamResponse({
  messageMetadata: ({ part }) => {
    if (part.type === 'start') {
      return {
        createdAt: Date.now(),
        model: 'gpt-4o',
      };
    }
    if (part.type === 'finish') {
      return {
        totalTokens: part.totalUsage.totalTokens,
      };
    }
  },
});
```

### 客户端

```tsx
{messages.map(message => (
  <div key={message.id}>
    {message.metadata?.createdAt &&
      new Date(message.metadata.createdAt).toLocaleTimeString()}
    {message.metadata?.totalTokens &&
      <span>{message.metadata.totalTokens} tokens</span>}
  </div>
))}
```

---

## 6. 附件支持

### 文件输入

```tsx
const [files, setFiles] = useState<FileList | undefined>();

<form onSubmit={e => {
  e.preventDefault();
  sendMessage({ text: input, files });
  setFiles(undefined);
}}>
  <input
    type="file"
    onChange={e => setFiles(e.target.files)}
    multiple
  />
</form>
```

### 渲染附件

```tsx
{message.parts.map((part, index) => {
  if (part.type === 'text') {
    return <span key={index}>{part.text}</span>;
  }
  if (part.type === 'file' && part.mediaType?.startsWith('image/')) {
    return <img key={index} src={part.url} alt={part.filename} />;
  }
  return null;
})}
```

---

## 7. useCompletion - 文本补全

`useCompletion` 适用于单次文本生成场景，如内容创作、代码补全。

### API Route

```typescript
// app/api/completion/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    prompt,
  });

  return result.toTextStreamResponse();
}
```

### React 组件

```tsx
'use client';

import { useCompletion } from '@ai-sdk/react';

export default function Completion() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="输入提示词..."
        />
        <button type="submit">生成</button>
      </form>
      <div>{completion}</div>
    </div>
  );
}
```

### useCompletion 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| `completion` | string | 生成的文本 |
| `input` | string | 当前输入值 |
| `complete` | function | 手动触发生成 |
| `isLoading` | boolean | 是否正在加载 |
| `error` | Error | 错误信息 |

---

## 8. useObject - 结构化数据生成

`useObject` 用于实时生成符合 Schema 的结构化数据。

### API Route

```typescript
// app/api/object/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText, Output } from 'ai';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  age: z.number(),
  skills: z.array(z.string()),
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    output: Output.object({ schema }),
    prompt,
  });

  return result.toTextStreamResponse();
}
```

### React 组件

```tsx
'use client';

import { useObject } from '@ai-sdk/react';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  age: z.number(),
  skills: z.array(z.string()),
});

export default function ObjectGenerator() {
  const { object, submit } = useObject({
    api: '/api/object',
    schema,
  });

  return (
    <div>
      <button onClick={() => submit('生成一个开发者档案')}>
        生成档案
      </button>
      <pre>{JSON.stringify(object, null, 2)}</pre>
    </div>
  );
}
```

---

## 9. 推理与来源

### 显示推理过程

某些模型（如 DeepSeek R1）支持推理：

```typescript
// 服务端
return result.toUIMessageStreamResponse({
  sendReasoning: true,
});
```

```tsx
// 客户端渲染
{message.parts.map(part => {
  if (part.type === 'reasoning') {
    return <pre key={index}>{part.text}</pre>;
  }
  if (part.type === 'text') {
    return <div key={index}>{part.text}</div>;
  }
})}
```

### 显示引用来源

```typescript
// 服务端
return result.toUIMessageStreamResponse({
  sendSources: true,
});
```

```tsx
// 客户端渲染 URL 来源
{message.parts
  .filter(part => part.type === 'source-url')
  .map(part => (
    <a key={part.id} href={part.url} target="_blank">
      {part.title ?? new URL(part.url).hostname}
    </a>
  ))}
```

---

## 10. Direct Agent Transport

直接与 Agent 通信，无需 HTTP：

```tsx
import { useChat } from '@ai-sdk/react';
import { DirectChatTransport, ToolLoopAgent } from 'ai';
import { openai } from '@ai-sdk/openai';

const agent = new ToolLoopAgent({
  model: openai('gpt-4o'),
  instructions: 'You are a helpful assistant.',
});

export default function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DirectChatTransport({ agent }),
  });
  // ...
}
```

---

## 11. UI 更新节流

React 环境下可节流 UI 更新以提升性能：

```tsx
const { messages } = useChat({
  experimental_throttle: 50, // 50ms 节流
});
```

---

## 12. 事件回调

```tsx
const { /* ... */ } = useChat({
  onFinish: ({ message, messages, isAbort, isDisconnect, isError }) => {
    // 响应完成时触发
  },
  onError: error => {
    console.error('错误:', error);
  },
  onData: data => {
    console.log('收到数据:', data);
  },
});
```

---

## 实践练习

1. **基础聊天**：构建一个简单的聊天界面
2. **流式显示**：添加打字机动画效果
3. **多轮对话**：实现对话历史持久化
4. **内容生成器**：使用 `useCompletion` 构建文章生成器
5. **结构化输出**：使用 `useObject` 生成表单数据
6. **附件上传**：实现图片上传和分析功能
7. **元数据展示**：显示 Token 用量和时间戳

---

## 参考文档

- [AI SDK UI 概述](https://sdk.vercel.ai/docs/ai-sdk-ui/overview)
- [useChat Hook](https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot)
- [useCompletion Hook](https://sdk.vercel.ai/docs/ai-sdk-ui/completion)
- [useObject Hook](https://sdk.vercel.ai/docs/ai-sdk-ui/object-generation)
- [Message Metadata](https://sdk.vercel.ai/docs/ai-sdk-ui/message-metadata)
- [Transport API](https://sdk.vercel.ai/docs/ai-sdk-ui/transport)
