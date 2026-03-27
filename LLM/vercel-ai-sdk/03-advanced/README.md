# 第三阶段：进阶功能

> 学习结构化输出、工具调用、多步推理等高级特性。

## 学习目标

- 掌握 `Output` 对象实现结构化输出
- 掌握工具调用（Tool Calling）
- 理解多步推理与 `stopWhen` 条件
- 学会工具设计最佳实践

---

## 1. 结构化输出

### 1.1 概述

使用 `Output` 对象让 AI 输出符合预定义的 Schema，支持 Zod、Valibot 或 JSON Schema。

**注意**：结构化输出现在是 `generateText` 和 `streamText` 的一部分，通过 `output` 属性配置。

### 1.2 Output.text() - 纯文本

```typescript
import { generateText, Output } from 'ai';
import { openai } from '@ai-sdk/openai';

const { output } = await generateText({
  model: openai('gpt-4o'),
  output: Output.text(),  // 默认行为
  prompt: 'Tell me a joke.',
});
// output 是 string 类型
```

### 1.3 Output.object() - 对象输出

```typescript
import { generateText, Output } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const schema = z.object({
  name: z.string().describe('人物姓名'),
  age: z.number().describe('年龄'),
  occupation: z.string().describe('职业'),
  skills: z.array(z.string()).describe('技能列表'),
});

const { output } = await generateText({
  model: openai('gpt-4o'),
  output: Output.object({ schema }),
  prompt: '生成一个软件工程师的档案',
});

console.log(output);
// { name: '张三', age: 28, occupation: '软件工程师', skills: ['TypeScript', 'React'] }
```

### 1.4 Output.array() - 数组输出

```typescript
const { output } = await generateText({
  model: openai('gpt-4o'),
  output: Output.array({
    element: z.object({
      location: z.string(),
      temperature: z.number(),
      condition: z.string(),
    }),
  }),
  prompt: '列出旧金山和巴黎的天气',
});
// output 是数组类型
```

### 1.5 Output.choice() - 选择输出

```typescript
const { output } = await generateText({
  model: openai('gpt-4o'),
  output: Output.choice({
    options: ['sunny', 'rainy', 'snowy'],
  }),
  prompt: '今天天气怎么样？',
});
// output 是 'sunny' | 'rainy' | 'snowy' 之一
```

### 1.6 Output.json() - 自由 JSON

```typescript
const { output } = await generateText({
  model: openai('gpt-4o'),
  output: Output.json(),
  prompt: '返回每个城市的温度和天气',
});
// output 可以是任意有效的 JSON
```

### 1.7 流式结构化输出

```typescript
import { streamText, Output } from 'ai';
import { z } from 'zod';

const schema = z.object({
  title: z.string(),
  sections: z.array(
    z.object({
      heading: z.string(),
      content: z.string(),
    })
  ),
});

const result = streamText({
  model: openai('gpt-4o'),
  output: Output.object({ schema }),
  prompt: '写一篇关于 AI 的文章大纲',
});

// 实时获取部分对象
for await (const partialObject of result.partialOutputStream) {
  console.clear();
  console.log(partialObject);
}
```

### 1.8 属性描述

使用 `.describe()` 提供属性提示：

```typescript
const schema = z.object({
  name: z.string().describe('菜谱名称'),
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.string().describe('用量（克或毫升）'),
    })
  ).describe('食材列表'),
  steps: z.array(z.string()).describe('烹饪步骤'),
});
```

### 1.9 错误处理

```typescript
import { NoObjectGeneratedError } from 'ai';

try {
  await generateText({
    model: openai('gpt-4o'),
    output: Output.object({ schema }),
    prompt,
  });
} catch (error) {
  if (NoObjectGeneratedError.isInstance(error)) {
    console.log('原因:', error.cause);
    console.log('原始文本:', error.text);
    console.log('响应:', error.response);
    console.log('用量:', error.usage);
  }
}
```

---

## 2. 工具调用（Tool Calling）

工具调用允许 AI 调用外部函数获取数据或执行操作。

### 2.1 定义工具

```typescript
import { generateText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const weatherTool = tool({
  description: '获取指定城市的天气信息',
  inputSchema: z.object({
    city: z.string().describe('城市名称'),
  }),
  execute: async ({ city }) => {
    // 模拟 API 调用
    return {
      city,
      temperature: 22,
      condition: '晴朗',
    };
  },
});
```

### 2.2 使用工具

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  tools: {
    weather: weatherTool,
  },
  prompt: '北京今天天气怎么样？',
});

if (result.toolCalls && result.toolCalls.length > 0) {
  console.log('工具调用:', result.toolCalls);
  console.log('工具结果:', result.toolResults);
}
```

### 2.3 工具配置选项

| 属性 | 类型 | 说明 |
|------|------|------|
| `description` | string | 工具描述（AI 根据此决定何时使用） |
| `inputSchema` | ZodSchema | 输入参数 Schema |
| `execute` | function | 执行函数 |
| `strict` | boolean | 启用严格模式（支持的提供商） |
| `needsApproval` | boolean/function | 是否需要审批 |
| `inputExamples` | array | 输入示例 |

### 2.4 严格模式

```typescript
const tool = tool({
  description: '获取天气',
  inputSchema: z.object({
    location: z.string(),
  }),
  strict: true,  // 确保工具调用符合 Schema
  execute: async ({ location }) => { /* ... */ },
});
```

### 2.5 工具选择控制

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  tools: { weather, calculator },
  toolChoice: 'required',  // 'auto' | 'required' | 'none' | { type: 'tool', toolName: 'weather' }
  prompt: '今天天气怎么样？',
});
```

---

## 3. 工具执行审批

### 3.1 静态审批

```typescript
const runCommand = tool({
  description: '执行 shell 命令',
  inputSchema: z.object({
    command: z.string(),
  }),
  needsApproval: true,  // 始终需要审批
  execute: async ({ command }) => { /* ... */ },
});
```

### 3.2 动态审批

```typescript
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

### 3.3 处理审批请求

```typescript
import { type ToolApprovalResponse } from 'ai';

const messages: ModelMessage[] = [{ role: 'user', content: '删除最近的文件' }];
const result = await generateText({
  model: openai('gpt-4o'),
  tools: { runCommand },
  messages,
});

messages.push(...result.response.messages);

const approvals: ToolApprovalResponse[] = [];

for (const part of result.content) {
  if (part.type === 'tool-approval-request') {
    const response: ToolApprovalResponse = {
      type: 'tool-approval-response',
      approvalId: part.approvalId,
      approved: true,  // 或 false 拒绝
      reason: '用户确认',
    };
    approvals.push(response);
  }
}

messages.push({ role: 'tool', content: approvals });

// 再次调用 generateText 执行审批后的工具
```

---

## 4. 多步推理（Multi-Step）

### 4.1 概述

启用 `stopWhen` 后，AI 可以自动进行多步推理：

```
用户输入 → AI 决定调用工具 → 执行工具 → AI 处理结果 → 继续思考或生成回复
```

### 4.2 stopWhen 条件

```typescript
import { generateText, stepCountIs } from 'ai';

const result = await generateText({
  model: openai('gpt-4o'),
  tools: { weather, calculator },
  stopWhen: stepCountIs(5),  // 最多 5 步
  prompt: '比较北京和上海的天气，告诉我温差',
});
```

### 4.3 组合条件

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  tools: { /* ... */ },
  stopWhen: [
    stepCountIs(20),
    yourCustomCondition(),
  ],
});
```

### 4.4 查看推理步骤

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  tools: { /* ... */ },
  stopWhen: stepCountIs(5),
  prompt: '查询天气并推荐穿搭',
});

// 查看所有步骤
result.steps.forEach((step, i) => {
  console.log(`步骤 ${i + 1}:`, step.stepType);
  if (step.toolCalls) {
    step.toolCalls.forEach(tc => {
      console.log(`  → 调用工具: ${tc.toolName}`);
    });
  }
});

// 提取所有工具调用
const allToolCalls = result.steps.flatMap(step => step.toolCalls);
```

### 4.5 步骤回调

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  tools: { /* ... */ },
  stopWhen: stepCountIs(10),
  onStepFinish({ stepNumber, finishReason, usage, toolCalls }) {
    console.log(`步骤 ${stepNumber} 完成 (${finishReason})`);
    console.log('Token 用量:', usage);
  },
});
```

### 4.6 prepareStep 回调

在每个步骤开始前修改配置：

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  tools: { tool1, tool2 },
  stopWhen: stepCountIs(10),
  prepareStep: async ({ stepNumber, messages }) => {
    if (stepNumber === 0) {
      return {
        model: modelForFirstStep,  // 使用不同模型
        toolChoice: { type: 'tool', toolName: 'tool1' },  // 强制使用特定工具
        activeTools: ['tool1'],  // 限制可用工具
      };
    }
    // 压缩长对话历史
    if (messages.length > 20) {
      return { messages: messages.slice(-10) };
    }
  },
});
```

---

## 5. 工具设计最佳实践

### 5.1 设计原则

| 原则 | 说明 |
|------|------|
| **单一职责** | 每个工具只做一件事 |
| **清晰描述** | description 决定 AI 能否正确使用 |
| **类型安全** | 使用 Zod 定义参数 |
| **错误处理** | 返回有意义的错误信息 |

### 5.2 常用工具类型

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
```

### 5.3 工具提取

将工具提取到单独文件：

```typescript
// tools/weather-tool.ts
import { tool } from 'ai';
import { z } from 'zod';

export const weatherTool = tool({
  description: 'Get the weather in a location',
  inputSchema: z.object({
    location: z.string(),
  }),
  execute: async ({ location }) => ({
    location,
    temperature: 72,
  }),
});
```

---

## 6. 动态工具

处理编译时未知 Schema 的场景：

```typescript
import { dynamicTool } from 'ai';

const customTool = dynamicTool({
  description: 'Execute a custom function',
  inputSchema: z.object({}),
  execute: async input => {
    // input 类型为 unknown，需要运行时验证
    const { action, parameters } = input as any;
    return { result: `Executed ${action}` };
  },
});
```

---

## 7. 工具输入生命周期钩子

```typescript
const result = streamText({
  model: openai('gpt-4o'),
  tools: {
    getWeather: tool({
      description: '获取天气',
      inputSchema: z.object({ location: z.string() }),
      execute: async ({ location }) => ({ temperature: 72 }),
      onInputStart: () => {
        console.log('工具调用开始');
      },
      onInputDelta: ({ inputTextDelta }) => {
        console.log('输入块:', inputTextDelta);
      },
      onInputAvailable: ({ input }) => {
        console.log('完整输入:', input);
      },
    }),
  },
  prompt: '旧金山天气怎么样？',
});
```

---

## 8. 工具调用修复

当模型生成无效工具调用时的修复策略：

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  tools,
  stopWhen: stepCountIs(5),
  prompt,
  experimental_repairToolCall: async ({
    toolCall,
    tools,
    inputSchema,
    error,
  }) => {
    // 使用结构化输出修复参数
    const { output: repairedArgs } = await generateText({
      model: openai('gpt-4o'),
      output: Output.object({ schema: tools[toolCall.toolName].inputSchema }),
      prompt: `修复工具输入: ${JSON.stringify(toolCall.input)}`,
    });
    return { ...toolCall, input: JSON.stringify(repairedArgs) };
  },
});
```

---

## 9. 结构化输出与工具结合

```typescript
const { output } = await generateText({
  model: openai('gpt-4o'),
  tools: {
    weather: tool({
      description: 'Get the weather for a location',
      inputSchema: z.object({ location: z.string() }),
      execute: async ({ location }) => ({ temperature: 72, condition: 'sunny' }),
    }),
  },
  output: Output.object({
    schema: z.object({
      summary: z.string(),
      recommendation: z.string(),
    }),
  }),
  stopWhen: stepCountIs(5),
  prompt: '我在旧金山应该穿什么？',
});
```

---

## 10. 高级配置

### 10.1 停止序列

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  prompt: '写一首诗',
  stopSequences: ['\n\n'],
});
```

### 10.2 频率惩罚与存在惩罚

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  prompt: '写一篇关于 AI 的文章',
  frequencyPenalty: 0.5,  // 减少重复内容
  presencePenalty: 0.3,   // 鼓励新话题
});
```

### 10.3 种子值

```typescript
const result = await generateText({
  model: openai('gpt-4o'),
  prompt: '随机生成一个名字',
  seed: 42,  // 相同种子产生相似输出
});
```

---

## 实践练习

1. **数据提取器**：使用 `Output.object()` 从文本中提取结构化信息
2. **多工具助手**：构建一个能调用多个工具的智能助手
3. **流式文章生成**：使用 `streamText` + `Output.object()` 实时生成文章结构
4. **对话分析器**：结合工具调用分析用户意图
5. **带审批的工具**：实现需要用户确认的敏感操作
6. **工具修复**：实现工具调用失败时的自动修复机制

---

## 参考文档

- [Generating Structured Data](https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data)
- [Tool Calling](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [MCP Tools](https://sdk.vercel.ai/docs/ai-sdk-core/mcp-tools)
- [Prompt Engineering](https://sdk.vercel.ai/docs/ai-sdk-core/prompt-engineering)
- [Settings](https://sdk.vercel.ai/docs/ai-sdk-core/settings)
