// 第五阶段：Agent 实战
// 构建一个具有自主决策能力的 AI Agent

import { generateText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import z from 'zod';

// ============================================
// 工具定义
// ============================================

const tools = {
  // 搜索工具
  search: tool({
    description: '搜索互联网获取信息。当需要查找实时数据、新闻、事实时使用。',
    parameters: z.object({
      query: z.string().describe('搜索查询关键词'),
    }),
    execute: async ({ query }) => {
      console.log(`🔍 [搜索] ${query}`);
      // 模拟搜索结果
      await new Promise((r) => setTimeout(r, 300));
      return {
        results: [
          { title: `${query} - 百度百科`, snippet: '这是一个关于...的介绍' },
          { title: `${query} - 最新新闻`, snippet: '最新动态显示...' },
        ],
      };
    },
  }),

  // 计算器工具
  calculator: tool({
    description: '执行数学计算。支持基本运算和复杂表达式。',
    parameters: z.object({
      expression: z.string().describe('数学表达式，如 "2 + 3 * 4"'),
    }),
    execute: async ({ expression }) => {
      console.log(`🧮 [计算] ${expression}`);
      try {
        // 安全计算（生产环境应使用安全解析库）
        const result = Function(`"use strict"; return (${expression})`)();
        return { success: true, result };
      } catch {
        return { success: false, error: '计算表达式无效' };
      }
    },
  }),

  // 天气查询工具
  weather: tool({
    description: '获取指定城市的当前天气信息。',
    parameters: z.object({
      city: z.string().describe('城市名称'),
    }),
    execute: async ({ city }) => {
      console.log(`🌤️ [天气] ${city}`);
      await new Promise((r) => setTimeout(r, 200));

      // 模拟天气数据
      const weatherData: Record<string, { temp: number; condition: string; humidity: number }> = {
        北京: { temp: 15, condition: '晴', humidity: 30 },
        上海: { temp: 18, condition: '多云', humidity: 65 },
        深圳: { temp: 25, condition: '晴', humidity: 70 },
        广州: { temp: 24, condition: '阴', humidity: 75 },
        成都: { temp: 12, condition: '小雨', humidity: 80 },
      };

      const data = weatherData[city];
      if (data) {
        return data;
      }
      return { temp: 20, condition: '未知', humidity: 50, message: `未找到 ${city} 的天气数据` };
    },
  }),

  // 记笔记工具
  takeNote: tool({
    description: '记录重要信息到笔记中。',
    parameters: z.object({
      content: z.string().describe('笔记内容'),
      category: z.enum(['工作', '学习', '生活']).describe('笔记分类'),
    }),
    execute: async ({ content, category }) => {
      console.log(`📝 [笔记] [${category}] ${content}`);
      return {
        success: true,
        savedAt: new Date().toISOString(),
        id: Math.random().toString(36).substring(7),
      };
    },
  }),

  // 时间查询工具
  getCurrentTime: tool({
    description: '获取当前日期和时间。',
    parameters: z.object({}),
    execute: async () => {
      const now = new Date();
      console.log(`🕐 [时间] ${now.toLocaleString('zh-CN')}`);
      return {
        date: now.toLocaleDateString('zh-CN'),
        time: now.toLocaleTimeString('zh-CN'),
        timestamp: now.toISOString(),
      };
    },
  }),
};

// ============================================
// Agent 主函数
// ============================================

async function runAgent(prompt: string) {
  console.log('\n' + '='.repeat(50));
  console.log('🤖 Agent 启动');
  console.log('='.repeat(50));
  console.log(`\n📝 用户输入: "${prompt}"\n`);
  console.log('─'.repeat(50));

  try {
    const result = await generateText({
      model: openai('gpt-4o'),
      tools,
      maxSteps: 10, // 允许最多 10 步推理
      system: `
你是一个智能助手 Agent。

行为准则：
1. 仔细分析用户请求
2. 选择最合适的工具执行任务
3. 一次只调用必要的工具
4. 清晰解释你的思考过程
5. 完成任务后给出完整的回复

可用工具：
- search: 搜索互联网信息
- calculator: 数学计算
- weather: 查询城市天气
- takeNote: 记录笔记
- getCurrentTime: 获取当前时间
      `.trim(),
      prompt,
    });

    console.log('─'.repeat(50));
    console.log('\n📊 执行摘要:');
    console.log(`   总步数: ${result.steps.length}`);

    let toolCallCount = 0;
    result.steps.forEach((step) => {
      if (step.toolCalls && step.toolCalls.length > 0) {
        toolCallCount += step.toolCalls.length;
        step.toolCalls.forEach((tc) => {
          console.log(`   → 工具调用: ${tc.toolName}`);
        });
      }
    });
    console.log(`   工具调用次数: ${toolCallCount}`);

    console.log('\n💬 最终回复:\n');
    console.log(result.text);

    console.log('\n📈 Token 使用:');
    console.log(`   输入: ${result.usage.promptTokens}`);
    console.log(`   输出: ${result.usage.completionTokens}`);
    console.log(`   总计: ${result.usage.totalTokens}`);

    return result;
  } catch (error) {
    console.error('\n❌ 执行出错:', error);
    throw error;
  }
}

// ============================================
// 示例运行
// ============================================

// 检查是否有命令行参数
const args = process.argv.slice(2);

if (args.length > 0) {
  // 使用命令行参数作为 prompt
  const prompt = args.join(' ');
  runAgent(prompt);
} else {
  // 默认示例
  console.log('💡 提示: 可以通过命令行传入 prompt');
  console.log('   例如: npx tsx 05-agent-lab/index.ts "北京天气怎么样"');
  console.log('\n运行默认示例...\n');

  runAgent('北京今天天气怎么样？如果气温低于20度，提醒我带外套，并记一条生活笔记');
}
