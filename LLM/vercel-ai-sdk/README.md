# Vercel AI SDK 学习项目

本项目用于系统学习 Vercel AI SDK 的核心功能和最佳实践。

---

## 项目概述

Vercel AI SDK 是一个 TypeScript 工具包，帮助开发者构建 AI 驱动的应用程序和 Agent。支持 React、Next.js、Vue、Svelte、Node.js 等框架。

### 两大核心模块

| 模块 | 用途 | 场景 |
|------|------|------|
| **AI SDK Core** | 服务端核心 API | 文本生成、结构化输出、工具调用、Agent |
| **AI SDK UI** | 前端 Hooks | React/Vue/Svelte 聊天界面 |

---

## 目录结构

```
01-basics/              # 第一阶段：基础入门
├── README.md           # 学习指南
└── index.ts            # 示例代码

02-frontend-integration/ # 第二阶段：前端集成
├── README.md           # 学习指南
└── index.ts            # 示例代码

03-advanced/            # 第三阶段：进阶功能
├── README.md           # 学习指南
└── index.ts            # 示例代码

04-production/          # 第四阶段：生产实践
├── README.md           # 学习指南
└── index.ts            # 示例代码

05-agent-lab/           # 第五阶段：Agent 实战 ⭐
├── README.md           # 学习指南
└── index.ts            # 示例代码

docs/                   # 官方文档参考
├── introduction.md     # SDK 介绍
├── foundations/        # 基础概念
├── ai-sdk-core/        # Core API 文档
├── ai-sdk-ui/          # UI Hooks 文档
├── agents/             # Agent 文档
└── advanced/           # 高级主题
```

---

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，添加你的 API Key：

```env
OPENAI_API_KEY=sk-xxx
```

### 3. 运行示例

```bash
npm run dev:01  # 运行第一阶段示例
npm run dev:02  # 运行第二阶段示例
# ...
```

---

## 依赖说明

| 包名 | 说明 |
|------|------|
| `ai` | AI SDK 核心 |
| `@ai-sdk/openai` | OpenAI 模型提供商 |
| `zod` | Schema 验证（用于结构化输出） |

---

## 学习路线

| 阶段 | 主题 | 核心内容 | 学习目标 |
|------|------|----------|----------|
| 01 | 基础入门 | generateText、streamText、多轮对话 | 掌握文本生成基础 |
| 02 | 前端集成 | useChat、useCompletion、useObject | 构建 AI 交互界面 |
| 03 | 进阶功能 | 结构化输出、Tool Calling、多步推理 | 实现复杂 AI 功能 |
| 04 | 生产实践 | Edge Runtime、缓存、限流、安全 | 部署生产级应用 |
| 05 | Agent 实战 | ToolLoopAgent、工具设计、MCP 集成 | 构建自主决策 Agent |

---

## 各阶段详情

### 第一阶段：基础入门

学习 AI SDK Core 的核心 API，掌握文本生成的基础用法。

- generateText / streamText 基础用法
- 模型参数配置
- 多轮对话
- 错误处理
- 生命周期回调

### 第二阶段：前端集成

学习 AI SDK UI 模块，使用 React Hooks 快速构建 AI 交互界面。

- useChat 聊天应用
- useCompletion 文本补全
- useObject 结构化数据
- 消息元数据与附件
- 状态管理与错误处理

### 第三阶段：进阶功能

学习结构化输出、工具调用、多步推理等高级特性。

- Output.object() / Output.array() 结构化输出
- 工具定义与调用
- 多步推理（stopWhen）
- 工具执行审批
- 动态工具

### 第四阶段：生产实践

学习部署优化、缓存策略、错误处理、监控日志、安全防护等生产环境必备技能。

- Edge Runtime 部署
- 响应缓存与语义缓存
- Rate Limiting
- 错误处理与降级
- 监控日志（OpenTelemetry）
- 安全最佳实践

### 第五阶段：Agent 实战 ⭐

使用 AI SDK 构建具有自主决策能力的 AI Agent。

- ToolLoopAgent 类
- 工具设计与实现
- 工具执行审批
- 结构化输出 Agent
- MCP 工具集成
- 完整 Agent 项目实战

---

## 官方资源

- [AI SDK 文档](https://sdk.vercel.ai/docs)
- [AI SDK GitHub](https://github.com/vercel/ai)
- [示例代码](https://sdk.vercel.ai/examples)
- [API 参考](https://sdk.vercel.ai/docs/reference)

---

## 版本信息

- AI SDK 版本：v4.x
- 学习日期：2025年3月
