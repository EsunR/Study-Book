import { generateText, tool } from 'ai';
import { z } from 'zod';
import { model } from '@/lib/model';

// 定义天气工具
const weatherTool = tool({
  description: '获取指定城市的天气信息',
  inputSchema: z.object({
    city: z.string().describe('城市名称'),
  }),
  execute: async ({ city }) => {
    // 模拟天气 API
    const weatherData: Record<string, { temperature: number; condition: string; humidity: number }> = {
      '北京': { temperature: 18, condition: '晴朗', humidity: 45 },
      '上海': { temperature: 22, condition: '多云', humidity: 65 },
      '广州': { temperature: 28, condition: '晴朗', humidity: 75 },
      '深圳': { temperature: 27, condition: '多云', humidity: 70 },
      '杭州': { temperature: 20, condition: '小雨', humidity: 80 },
    };
    const data = weatherData[city] || { temperature: 20, condition: '未知', humidity: 50 };
    return { city, ...data };
  },
});

// 定义计算器工具
const calculatorTool = tool({
  description: '计算数学表达式',
  inputSchema: z.object({
    expression: z.string().describe('数学表达式，如 "2 + 3" 或 "10 * 5"'),
  }),
  execute: async ({ expression }) => {
    try {
      // 安全计算（仅支持基本运算）
      const sanitized = expression.replace(/[^0-9+\-*/().%\s]/g, '');
      const result = Function(`"use strict"; return (${sanitized})`)();
      return { expression, result };
    } catch {
      return { expression, error: '无法计算该表达式' };
    }
  },
});

// 定义搜索工具
const searchTool = tool({
  description: '搜索数据库中的用户信息',
  inputSchema: z.object({
    keyword: z.string().describe('搜索关键词'),
  }),
  execute: async ({ keyword }) => {
    // 模拟数据库
    const users = [
      { id: 1, name: '张三', department: '技术部', email: 'zhangsan@example.com' },
      { id: 2, name: '李四', department: '产品部', email: 'lisi@example.com' },
      { id: 3, name: '王五', department: '技术部', email: 'wangwu@example.com' },
    ];
    const results = users.filter(u =>
      u.name.includes(keyword) || u.department.includes(keyword)
    );
    return { keyword, results, count: results.length };
  },
});

export async function POST(req: Request) {
  try {
    const { prompt, toolChoice } = await req.json();

    const result = await generateText({
      model,
      tools: {
        weather: weatherTool,
        calculator: calculatorTool,
        search: searchTool,
      },
      toolChoice: toolChoice || 'auto',
      prompt,
    });

    return Response.json({
      text: result.text,
      toolCalls: result.toolCalls,
      toolResults: result.toolResults,
      usage: result.usage,
    });
  } catch (error) {
    console.error('Tool calling error:', error);
    return Response.json({ error: '工具调用失败' }, { status: 500 });
  }
}
