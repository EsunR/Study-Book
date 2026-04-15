# 第五阶段：Agent 实战

> 使用 AI SDK 构建具有自主决策能力的 AI Agent。

## 学习目标

- 理解 Agent 的核心概念
- 掌握 ToolLoopAgent 类的使用
- 学会设计和实现工具集
- 构建完整的实用 Agent
- 掌握 MCP 工具集成

---

## 1. Agent 概述

### 1.1 什么是 Agent？

Agent 是一种能够**自主决策**、**调用工具**、**多步执行**的 AI 系统。

```
传统 AI 应用：用户输入 → AI 回复
Agent 应用：用户输入 → AI 思考 → 调用工具 → 获取结果 → 继续思考 → 最终回复
```

### 1.2 Agent 核心能力

| 能力 | 说明 | AI SDK 支持 |
|------|------|-------------|
| 工具调用 | 调用外部函数/API | ✅ `tools` |
| 多步推理 | 自动进行多轮思考 | ✅ `stopWhen` |
| 状态管理 | 记住上下文和执行历史 | ✅ `steps` |
| 流式输出 | 实时展示思考过程 | ✅ `stream()` |

### 1.3 Agent 核心组件

- **LLMs（大语言模型）**：处理输入并决定下一步行动
- **Tools（工具）**：扩展能力（读取文件、调用 API、写入数据库）
- **Loop（循环）**：编排执行流程
  - **上下文管理**：维护对话历史
  - **停止条件**：确定任务何时完成

---

## 2. ToolLoopAgent 类

`ToolLoopAgent` 是推荐的 Agent 构建方式，提供：
- 减少样板代码
- 提高可复用性
- 简化维护

### 2.1 创建 Agent

```typescript
import { ToolLoopAgent } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const weatherAgent = new ToolLoopAgent({
  model: openai('gpt-4o'),
  instructions: '你是一个天气助手。',
  tools: {
    weather: {
      description: '获取城市天气',
      inputSchema: z.object({
        location: z.string().describe('城市名称'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    },
    convertTemperature: {
      description: '温度转换',
      inputSchema: z.object({
        temperature: z.number(),
      }),
      execute: async ({ temperature }) => {
        const celsius = Math.round((temperature - 32) * (5 / 9));
        return { celsius };
      },
    },
  },
});
```

### 2.2 使用 Agent

```typescript
// 生成文本
const result = await weatherAgent.generate({
  prompt: '北京天气怎么样？用摄氏度回答。',
});

console.log(result.text);

// 流式输出
const stream = await weatherAgent.stream({
  prompt: '上海天气如何？',
});

for await (const chunk of stream.textStream) {
  console.log(chunk);
}
```

### 2.3 配置选项

```typescript
const agent = new ToolLoopAgent({
  model: openai('gpt-4o'),
  instructions: '你是一个智能助手',
  tools: { /* ... */ },
  stopWhen: stepCountIs(20),  // 最多 20 步
  toolChoice: 'auto',  // 'auto' | 'required' | 'none' | { type: 'tool', toolName }
  maxTokens: 1000,
  temperature: 0.7,
});
```

### 2.4 组合停止条件

```typescript
import { stepCountIs, hasToolCallError } from 'ai';

const agent = new ToolLoopAgent({
  model: openai('gpt-4o'),
  tools: { /* ... */ },
  stopWhen: [
    stepCountIs(20),        // 最多 20 步
    hasToolCallError(),     // 工具调用错误时停止
    yourCustomCondition(),  // 自定义条件
  ],
});
```

---

## 3. 定义 Agent 行为

### 3.1 系统指令

```typescript
const codeReviewAgent = new ToolLoopAgent({
  model: openai('gpt-4o'),
  instructions: `你是一个高级软件工程师，负责代码审查。

  审查原则：
  1. 首先关注安全漏洞
  2. 识别性能瓶颈
  3. 提出可读性和可维护性改进建议
  4. 提供建设性和教育性的反馈
  5. 始终解释问题原因和修复方法`,
});
```

### 3.2 行为约束

```typescript
const customerSupportAgent = new ToolLoopAgent({
  model: openai('gpt-4o'),
  instructions: `你是一个电商平台客服专员。

  规则：
  - 未经政策核实，不要承诺退款
  - 始终保持同理心和专业态度
  - 不确定时说明并主动升级处理
  - 保持回复简洁可操作
  - 不要分享公司内部信息`,
  tools: {
    checkOrderStatus,
    lookupPolicy,
    createTicket,
  },
});
```

### 3.3 工具使用指南

```typescript
const researchAgent = new ToolLoopAgent({
  model: openai('gpt-4o'),
  instructions: `你是一个研究助手，可以访问搜索和文档工具。

  研究流程：
  1. 始终从广泛搜索开始了解主题
  2. 使用文档分析获取详细信息
  3. 在得出结论前交叉参考多个来源
  4. 展示信息时引用来源
  5. 如果信息冲突，呈现双方观点`,
  tools: {
    webSearch,
    analyzeDocument,
    extractQuotes,
  },
});
```

---

## 4. 工具设计

### 4.1 工具定义规范

```typescript
import { tool } from 'ai';
import { z } from 'zod';

const searchTool = tool({
  // 清晰描述工具功能（AI 通过描述决定何时使用）
  description: '搜索互联网获取实时信息。当需要查找实时数据、新闻、事实时使用。',

  // 定义参数 Schema
  inputSchema: z.object({
    query: z.string().describe('搜索查询'),
    limit: z.number().optional().describe('返回结果数量'),
  }),

  // 执行函数
  execute: async ({ query, limit = 5 }) => {
    const results = await searchAPI(query, limit);
    return results;
  },
});
```

### 4.2 工具设计原则

| 原则 | 说明 |
|------|------|
| **单一职责** | 每个工具只做一件事 |
| **清晰描述** | description 决定 AI 能否正确使用 |
| **类型安全** | 使用 Zod 定义参数 |
| **错误处理** | 返回有意义的错误信息 |

### 4.3 常用工具类型

```typescript
// 1. 数据查询工具
const searchTool = tool({
  description: '搜索数据库中的用户信息',
  inputSchema: z.object({ keyword: z.string() }),
  execute: async ({ keyword }) => { /* ... */ },
});

// 2. 操作执行工具
const sendEmailTool = tool({
  description: '发送电子邮件',
  inputSchema: z.object({
    to: z.string().email(),
    subject: z.string(),
    body: z.string(),
  }),
  execute: async ({ to, subject, body }) => { /* ... */ },
});

// 3. 计算工具
const calculatorTool = tool({
  description: '计算数学表达式',
  inputSchema: z.object({ expression: z.string() }),
  execute: async ({ expression }) => {
    return evaluate(expression);
  },
});

// 4. 外部 API 工具
const weatherTool = tool({
  description: '获取城市天气',
  inputSchema: z.object({ city: z.string() }),
  execute: async ({ city }) => {
    const res = await fetch(`https://api.weather.com/${city}`);
    return res.json();
  },
});

// 5. 需要审批的工具
const deleteFileTool = tool({
  description: '删除文件',
  inputSchema: z.object({ path: z.string() }),
  needsApproval: true,  // 执行前需要用户确认
  execute: async ({ path }) => { /* ... */ },
});

// 6. 动态审批
const paymentTool = tool({
  description: '处理支付',
  inputSchema: z.object({
    amount: z.number(),
    recipient: z.string(),
  }),
  needsApproval: async ({ amount }) => amount > 1000,  // 超过 1000 需要审批
  execute: async ({ amount, recipient }) => { /* ... */ },
});
```

### 4.4 工具执行选项

```typescript
const myTool = tool({
  inputSchema: z.object({ query: z.string() }),
  execute: async (input, options) => {
    // 工具调用 ID
    console.log(options.toolCallId);

    // 消息历史
    console.log(options.messages);

    // 中止信号
    console.log(options.abortSignal);

    // 实验性上下文
    console.log(options.experimental_context);
  },
});
```

---

## 5. 结构化输出 Agent

Agent 可以生成结构化输出：

```typescript
import { ToolLoopAgent, Output, stepCountIs } from 'ai';
import { z } from 'zod';

const analysisAgent = new ToolLoopAgent({
  model: openai('gpt-4o'),
  output: Output.object({
    schema: z.object({
      sentiment: z.enum(['positive', 'neutral', 'negative']),
      summary: z.string(),
      keyPoints: z.array(z.string()),
    }),
  }),
  stopWhen: stepCountIs(10),
});

const { output } = await analysisAgent.generate({
  prompt: '分析上季度的客户反馈',
});

console.log(output.sentiment);  // 'positive'
console.log(output.keyPoints);   // ['...', '...']
```

---

## 6. 步骤追踪

### 6.1 onStepFinish 回调

```typescript
const result = await agent.generate({
  prompt: '研究并总结最新的 AI 趋势',
  onStepFinish: async ({ stepNumber, usage, finishReason, toolCalls }) => {
    console.log(`步骤 ${stepNumber} 完成:`, {
      inputTokens: usage.promptTokens,
      outputTokens: usage.completionTokens,
      finishReason,
      toolsUsed: toolCalls?.map(tc => tc.toolName),
    });
  },
});
```

### 6.2 构造器级回调

```typescript
const agent = new ToolLoopAgent({
  model: openai('gpt-4o'),
  onStepFinish: async ({ stepNumber, usage }) => {
    // Agent 级日志
    console.log(`Agent 步骤 ${stepNumber}:`, usage.totalTokens);
  },
});

// 方法级回调会在构造器回调之后执行
const result = await agent.generate({
  prompt: 'Hello',
  onStepFinish: async ({ stepNumber, usage }) => {
    // 每次调用的追踪（如计费）
    await trackUsage(stepNumber, usage);
  },
});
```

---

## 7. 前端集成

### 7.1 API Route

```typescript
// app/api/agent/route.ts
import { createAgentUIStreamResponse } from 'ai';
import { myAgent } from '@/agents/my-agent';

export async function POST(request: Request) {
  const { messages } = await request.json();

  return createAgentUIStreamResponse({
    agent: myAgent,
    uiMessages: messages,
  });
}
```

### 7.2 React 组件

```tsx
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

export function AgentChat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/agent',
    }),
  });

  return (
    <>
      {messages.map(message => (
        <div key={message.id}>
          {message.role}: {message.parts.map(part => part.type === 'text' ? part.text : '')}
        </div>
      ))}
      <button onClick={() => sendMessage({ text: 'Hello!' })} disabled={status !== 'ready'}>
        发送
      </button>
    </>
  );
}
```

### 7.3 Direct Agent Transport

直接与 Agent 通信，无需 HTTP：

```tsx
import { useChat } from '@ai-sdk/react';
import { DirectChatTransport } from 'ai';
import { myAgent } from '@/agents/my-agent';

export function DirectAgentChat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DirectChatTransport({ agent: myAgent }),
  });

  // ...
}
```

### 7.4 类型安全

```typescript
import { ToolLoopAgent, InferAgentUIMessage } from 'ai';

const myAgent = new ToolLoopAgent({
  // ...配置
});

// 推断 UIMessage 类型
export type MyAgentUIMessage = InferAgentUIMessage<typeof myAgent>;
```

```tsx
// 客户端组件
import { useChat } from '@ai-sdk/react';
import type { MyAgentUIMessage } from '@/agents/my-agent';

export function Chat() {
  const { messages } = useChat<MyAgentUIMessage>();
  // 完整类型安全
}
```

---

## 8. MCP 工具集成

MCP（Model Context Protocol）让 Agent 可以访问外部服务的工具。

### 8.1 创建 MCP 客户端

```typescript
import { createMCPClient } from '@ai-sdk/mcp';

// HTTP Transport（推荐用于生产）
const mcpClient = await createMCPClient({
  transport: {
    type: 'http',
    url: 'https://your-server.com/mcp',
    headers: { Authorization: 'Bearer my-api-key' },
  },
});

// SSE Transport
const mcpClient = await createMCPClient({
  transport: {
    type: 'sse',
    url: 'https://your-server.com/sse',
  },
});

// Stdio Transport（仅本地开发）
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const mcpClient = await createMCPClient({
  transport: new StdioClientTransport({
    command: 'node',
    args: ['server.js'],
  }),
});
```

### 8.2 使用 MCP 工具

```typescript
// 自动发现工具
const tools = await mcpClient.tools();

const result = await generateText({
  model: openai('gpt-4o'),
  tools,
  prompt: '查询今天的新闻',
  onFinish: async () => {
    await mcpClient.close();
  },
});
```

### 8.3 定义工具 Schema

```typescript
import { z } from 'zod';

const tools = await mcpClient.tools({
  schemas: {
    'get-weather': {
      inputSchema: z.object({
        location: z.string(),
      }),
      outputSchema: z.object({
        temperature: z.number(),
        conditions: z.string(),
      }),
    },
  },
});

// 使用类型化的工具结果
const result = await tools['get-weather'].execute(
  { location: 'New York' },
  { messages: [], toolCallId: 'weather-1' },
);

console.log(result.temperature);  // 类型安全
```

### 8.4 访问 MCP 资源

```typescript
// 列出资源
const resources = await mcpClient.listResources();

// 读取资源
const data = await mcpClient.readResource({
  uri: 'file:///example/document.txt',
});

// 列出资源模板
const templates = await mcpClient.listResourceTemplates();
```

---

## 9. 高级模式

### 9.1 工具链（Tool Chaining）

Agent 自动串联多个工具：

```
用户: "帮我查一下北京天气，然后计算北京和上海的温差"

执行流程:
Step 1: 调用 weather(北京)
Step 2: 调用 weather(上海)
Step 3: 调用 calculator(北京temp - 上海temp)
Step 4: 生成最终回复
```

### 9.2 条件执行

```typescript
const tools = {
  checkInventory: tool({
    description: '检查商品库存',
    inputSchema: z.object({ productId: z.string() }),
    execute: async ({ productId }) => { /* ... */ },
  }),
  notifyManager: tool({
    description: '当库存不足时通知经理',
    inputSchema: z.object({ message: z.string() }),
    execute: async ({ message }) => { /* ... */ },
  }),
};

// Agent 会根据 checkInventory 结果决定是否调用 notifyManager
```

### 9.3 人工确认

```typescript
const transferTool = tool({
  description: '转账',
  inputSchema: z.object({
    from: z.string(),
    to: z.string(),
    amount: z.number(),
  }),
  needsApproval: true,
  execute: async ({ from, to, amount }) => {
    return { success: true, transactionId: 'tx-123' };
  },
});

// Agent 会在执行前暂停，等待用户确认
```

### 9.4 并行工具调用

```typescript
const result = await agent.generate({
  prompt: '同时查询北京、上海、深圳的天气',
  // 部分模型支持并行调用
});
```

---

## 10. 错误处理

### 10.1 工具错误恢复

```typescript
const tools = {
  fetchData: tool({
    description: '获取数据',
    inputSchema: z.object({ id: z.string() }),
    execute: async ({ id }) => {
      try {
        return await api.fetch(id);
      } catch (error) {
        // 返回错误信息，让 Agent 决定如何处理
        return { error: '数据获取失败，请检查 ID 是否正确' };
      }
    },
  }),
};
```

### 10.2 工具调用修复

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  tools,
  experimental_repairToolCall: async ({
    toolCall,
    tools,
    inputSchema,
    error,
  }) => {
    // 尝试修复无效的工具调用
    const tool = tools[toolCall.toolName];

    const { output: repairedArgs } = await generateText({
      model: openai('gpt-4o'),
      output: Output.object({ schema: tool.inputSchema }),
      prompt: `修复以下工具调用参数: ${JSON.stringify(toolCall.input)}`,
    });

    return { ...toolCall, input: repairedArgs };
  },
});
```

---

## 11. 实战项目

### 11.1 项目列表

| 项目 | 难度 | 学习重点 |
|------|------|----------|
| 天气助手 | ⭐ | 基础工具调用 |
| 智能搜索 | ⭐⭐ | 工具链、信息整合 |
| 代码执行器 | ⭐⭐⭐ | 安全性、沙箱执行 |
| 研究助手 | ⭐⭐⭐ | MCP 工具、资源访问 |
| 自动化任务 Agent | ⭐⭐⭐⭐ | 多工具协作、状态管理 |

### 11.2 完整示例：智能助手 Agent

```typescript
// agents/smart-assistant.ts
import { ToolLoopAgent, tool, stepCountIs } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export const smartAssistant = new ToolLoopAgent({
  model: openai('gpt-4o'),
  instructions: `你是一个智能助手 Agent。

行为准则：
1. 仔细分析用户请求
2. 选择最合适的工具执行任务
3. 如果信息不足，先使用搜索工具获取
4. 重要操作前先确认
5. 清晰解释你的思考过程

可用工具：
- search: 搜索信息
- calculator: 数学计算
- weather: 查询天气
- takeNote: 记录笔记`,

  tools: {
    search: tool({
      description: '搜索互联网获取信息。当需要查找实时数据、新闻、事实时使用。',
      inputSchema: z.object({
        query: z.string().describe('搜索查询'),
      }),
      execute: async ({ query }) => {
        console.log(`🔍 搜索: ${query}`);
        return { results: ['结果1', '结果2'] };
      },
    }),

    calculator: tool({
      description: '执行数学计算。支持基本运算和复杂表达式。',
      inputSchema: z.object({
        expression: z.string().describe('数学表达式'),
      }),
      execute: async ({ expression }) => {
        console.log(`🧮 计算: ${expression}`);
        const result = Function(`"use strict"; return (${expression})`)();
        return { result };
      },
    }),

    weather: tool({
      description: '获取指定城市的当前天气信息。',
      inputSchema: z.object({
        city: z.string().describe('城市名称'),
      }),
      execute: async ({ city }) => {
        console.log(`🌤️ 查询天气: ${city}`);
        return { city, temp: 25, condition: '晴' };
      },
    }),

    takeNote: tool({
      description: '记录重要信息到笔记中。',
      inputSchema: z.object({
        content: z.string().describe('笔记内容'),
        category: z.enum(['工作', '学习', '生活']).describe('笔记分类'),
      }),
      execute: async ({ content, category }) => {
        console.log(`📝 记笔记 [${category}]: ${content}`);
        return { success: true, savedAt: new Date().toISOString() };
      },
    }),
  },

  stopWhen: stepCountIs(10),
});
```

---

## 参考文档

- [AI SDK Agents 概述](https://sdk.vercel.ai/docs/agents/overview)
- [Building Agents](https://sdk.vercel.ai/docs/agents/building-agents)
- [Tool Calling](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [Loop Control](https://sdk.vercel.ai/docs/agents/loop-control)
- [MCP Tools](https://sdk.vercel.ai/docs/ai-sdk-core/mcp-tools)
- [AI SDK Core API](https://sdk.vercel.ai/docs/reference/ai-sdk-core/generate-text)
