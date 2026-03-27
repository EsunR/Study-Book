# 第一阶段：基础入门

> 学习 AI SDK Core 的核心 API，掌握文本生成的基础用法。

## 学习目标

- 理解 AI SDK 的整体架构
- 掌握 `generateText` 和 `streamText` 的使用
- 学会配置模型参数和系统提示
- 理解返回值结构和错误处理

---

## 1. AI SDK 概述

AI SDK 是一个 TypeScript 工具包，帮助开发者构建 AI 驱动的应用程序和 Agent。支持 React、Next.js、Vue、Svelte、Node.js 等框架。

### 两大模块

| 模块 | 用途 | 场景 |
|------|------|------|
| **AI SDK Core** | 服务端核心 API | 文本生成、结构化输出、工具调用 |
| **AI SDK UI** | 前端 Hooks | React/Vue/Svelte 聊天界面 |

### 安装依赖

```bash
npm install ai @ai-sdk/openai
```

### 基础配置

```typescript
import { openai } from '@ai-sdk/openai';

// 配置模型（自动读取 OPENAI_API_KEY 环境变量）
const model = openai('gpt-4o');
```

### 支持的提供商

AI SDK 支持多种模型提供商：OpenAI、Anthropic、Google、Mistral、Cohere、Amazon Bedrock 等。

---

## 2. generateText - 单次文本生成

`generateText` 是最基础的 API，用于生成单次文本响应。适用于非交互场景，如自动化任务、邮件草稿、网页摘要等。

### 基础用法

```typescript
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const { text } = await generateText({
  model: openai('gpt-4o'),
  prompt: '用一句话解释什么是 TypeScript',
});

console.log(text);
```

### 常用参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `model` | string | 模型实例 |
| `prompt` | string | 用户输入提示 |
| `system` | string | 系统提示（角色设定） |
| `messages` | array | 多轮对话消息数组 |
| `maxTokens` | number | 最大生成 token 数 |
| `temperature` | number | 随机性（0-2，默认 1） |
| `topP` | number | 核采样参数 |
| `stopSequences` | string[] | 停止序列 |
| `seed` | number | 种子值（可复现输出） |
| `frequencyPenalty` | number | 频率惩罚（0-2） |
| `presencePenalty` | number | 存在惩罚（0-2） |

### 带系统提示的示例

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  system: '你是一个专业的 TypeScript 导师，回答简洁明了',
  prompt: '什么是类型推断？',
  maxTokens: 500,
  temperature: 0.7,
});
```

### 返回值结构

```typescript
interface GenerateTextResult {
  text: string;              // 生成的文本
  content: ContentPart[];    // 生成的内容部分
  reasoning: string;         // 推理内容（某些模型支持）
  reasoningText: string;     // 推理文本
  files: FilePart[];         // 生成的文件
  sources: SourcePart[];     // 引用来源
  toolCalls: ToolCall[];     // 工具调用
  toolResults: ToolResult[]; // 工具结果
  finishReason: string;      // 完成原因
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  totalUsage: Usage;         // 多步生成的总用量
  steps: Step[];             // 所有步骤详情
  warnings: Warning[];       // 提供商警告
  response: {
    messages: ModelMessage[]; // 生成的消息
    headers: Record<string, string>; // 响应头
    body: unknown;           // 响应体
  };
}
```

### onFinish 回调

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  prompt: '写一首诗',
  onFinish({ text, finishReason, usage, response, steps, totalUsage }) {
    // 保存聊天历史或记录用量
    console.log('Token 用量:', usage);
    const messages = response.messages;
  },
});
```

---

## 3. streamText - 流式文本生成

`streamText` 用于实时流式输出，适合需要逐步显示内容的场景，如聊天机器人、实时应用。

### 基础用法

```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

const result = streamText({
  model: openai('gpt-4o'),
  prompt: '写一首关于编程的诗',
});

// 逐块消费流（textStream 是 ReadableStream 和 AsyncIterable）
for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

### 使用回调函数

```typescript
const result = streamText({
  model: openai('gpt-4o'),
  prompt: '讲一个简短的故事',
  onChunk: ({ chunk }) => {
    // 每个数据块触发
    if (chunk.type === 'text') {
      console.log('文本块:', chunk.text);
    }
  },
  onFinish: ({ text, finishReason, usage, response, steps, totalUsage }) => {
    // 流结束时触发
    console.log('完成:', text);
    console.log('消息:', response.messages);
  },
  onError: ({ error }) => {
    // 错误处理
    console.error('错误:', error);
  },
});
```

### 流式响应转换

```typescript
const result = streamText({
  model: openai('gpt-4o'),
  prompt: '你好',
});

// 转换为 HTTP 响应
return result.toUIMessageStreamResponse();  // UI 消息流（推荐）
return result.toTextStreamResponse();        // 纯文本流
```

### fullStream - 完整事件流

```typescript
const result = streamText({
  model: openai('gpt-4o'),
  tools: { /* 工具定义 */ },
  prompt: '查询旧金山天气',
});

for await (const part of result.fullStream) {
  switch (part.type) {
    case 'text-delta':
      console.log(part.text);
      break;
    case 'tool-call':
      console.log('工具调用:', part.toolName);
      break;
    case 'tool-result':
      console.log('工具结果:', part.output);
      break;
    case 'error':
      console.error('错误:', part.error);
      break;
    case 'finish':
      console.log('完成');
      break;
  }
}
```

### 流转换（实验性）

```typescript
import { smoothStream, streamText } from 'ai';

const result = streamText({
  model: openai('gpt-4o'),
  prompt: '写一篇长文',
  // 平滑流输出
  experimental_transform: smoothStream(),
});
```

---

## 4. 多轮对话

### 使用 messages 数组

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  messages: [
    { role: 'system', content: '你是一个友好的助手' },
    { role: 'user', content: '你好，我是小明' },
    { role: 'assistant', content: '你好小明！有什么我可以帮你的吗？' },
    { role: 'user', content: '请记住我的名字' },
  ],
});
```

### Message 类型

```typescript
type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string | ContentPart[];
};
```

### 多模态消息

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: '这张图片是什么？' },
        { type: 'image', image: 'https://example.com/image.jpg' },
      ],
    },
  ],
});
```

---

## 5. 错误处理

### 错误类型

```typescript
import {
  generateText,
  APICallError,
  InvalidPromptError,
  NoContentGeneratedError,
  LoadAPIKeyError,
} from 'ai';

try {
  const result = await generateText({
    model: openai('gpt-4o'),
    prompt: 'Hello',
  });
} catch (error) {
  if (APICallError.isInstance(error)) {
    // API 调用错误
    console.error('API 错误:', error.statusCode, error.message);
    console.error('响应体:', error.responseBody);
  } else if (InvalidPromptError.isInstance(error)) {
    // 无效提示
    console.error('提示无效:', error.message);
  } else if (NoContentGeneratedError.isInstance(error)) {
    // 未生成内容
    console.error('未生成内容');
  } else if (LoadAPIKeyError.isInstance(error)) {
    // API Key 加载失败
    console.error('请检查 API Key 配置');
  } else {
    throw error;
  }
}
```

### 重试与超时

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  prompt: 'Hello',
  maxRetries: 3,  // 自动重试 3 次
  abortSignal: AbortSignal.timeout(30000),  // 30 秒超时
});
```

---

## 6. 生命周期回调（实验性）

`generateText` 和 `streamText` 提供实验性的生命周期回调，用于日志、调试和遥测：

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  tools: { /* 工具定义 */ },
  prompt: '查询天气',

  experimental_onStart({ model, settings, functionId }) {
    console.log('生成开始', { model: model.modelId });
  },

  experimental_onStepStart({ stepNumber, model, promptMessages }) {
    console.log(`步骤 ${stepNumber} 开始`);
  },

  experimental_onToolCallStart({ toolName, toolCallId, input }) {
    console.log(`工具调用开始: ${toolName}`);
  },

  experimental_onToolCallFinish({ toolName, durationMs, error }) {
    console.log(`工具调用完成: ${toolName} (${durationMs}ms)`);
  },

  onStepFinish({ stepNumber, finishReason, usage }) {
    console.log(`步骤 ${stepNumber} 完成`, { finishReason, usage });
  },
});
```

---

## 7. 来源引用

某些模型（如 Perplexity、Google Gemini）会在响应中包含引用来源：

```typescript
const result = await generateText({
  model: 'google/gemini-2.5-flash',
  tools: {
    google_search: google.tools.googleSearch({}),
  },
  prompt: '最近一周旧金山的新闻',
});

for (const source of result.sources) {
  if (source.sourceType === 'url') {
    console.log('来源:', source.url);
    console.log('标题:', source.title);
  }
}
```

---

## 实践练习

1. **基础练习**：使用 `generateText` 生成一段自我介绍
2. **参数调优**：调整 `temperature` 观察输出变化，尝试 `seed` 实现可复现输出
3. **流式输出**：实现一个打字机效果的文本输出
4. **多轮对话**：构建一个简单的命令行聊天机器人
5. **错误处理**：实现完整的错误捕获和重试逻辑
6. **生命周期**：添加日志记录每个生成步骤的信息

---

## 参考文档

- [AI SDK Core 概述](https://sdk.vercel.ai/docs/ai-sdk-core/overview)
- [generateText API](https://sdk.vercel.ai/docs/reference/ai-sdk-core/generate-text)
- [streamText API](https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-text)
- [错误处理](https://sdk.vercel.ai/docs/ai-sdk-core/error-handling)
