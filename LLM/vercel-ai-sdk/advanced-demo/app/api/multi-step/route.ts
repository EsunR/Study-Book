import { generateText, tool, stepCountIs } from 'ai';
import { z } from 'zod';
import { model } from '@/lib/model';

// 定义多个工具用于多步推理演示
const weatherTool = tool({
  description: '获取指定城市的当前天气',
  inputSchema: z.object({
    city: z.string().describe('城市名称'),
  }),
  execute: async ({ city }) => {
    const weatherData: Record<string, { temperature: number; condition: string }> = {
      '北京': { temperature: 15, condition: '晴' },
      '上海': { temperature: 20, condition: '多云' },
      '广州': { temperature: 28, condition: '晴' },
      '深圳': { temperature: 27, condition: '小雨' },
    };
    return weatherData[city] || { temperature: 20, condition: '未知' };
  },
});

const clothingTool = tool({
  description: '根据天气温度推荐穿衣搭配',
  inputSchema: z.object({
    temperature: z.number().describe('温度（摄氏度）'),
    condition: z.string().describe('天气状况'),
  }),
  execute: async ({ temperature, condition }) => {
    let recommendation = '';
    if (temperature < 10) {
      recommendation = '建议穿羽绒服、毛衣，注意保暖';
    } else if (temperature < 20) {
      recommendation = '建议穿外套、长袖，早晚温差大';
    } else if (temperature < 25) {
      recommendation = '适合穿薄外套、T恤';
    } else {
      recommendation = '建议穿短袖、短裤，注意防晒';
    }

    if (condition.includes('雨')) {
      recommendation += '，记得带伞';
    }

    return { temperature, condition, recommendation };
  },
});

const activityTool = tool({
  description: '根据天气推荐适合的活动',
  inputSchema: z.object({
    condition: z.string().describe('天气状况'),
  }),
  execute: async ({ condition }) => {
    if (condition.includes('雨')) {
      return { suggestion: '室内活动：看电影、逛街、博物馆' };
    } else if (condition.includes('晴')) {
      return { suggestion: '户外活动：郊游、运动、野餐' };
    } else {
      return { suggestion: '根据个人喜好选择室内或户外活动' };
    }
  },
});

export async function POST(req: Request) {
  try {
    const { prompt, maxStepsCount = 5 } = await req.json();

    const steps: any[] = [];

    const result = await generateText({
      model,
      tools: {
        getWeather: weatherTool,
        recommendClothing: clothingTool,
        suggestActivity: activityTool,
      },
      stopWhen: stepCountIs(maxStepsCount),
      prompt,
      onStepFinish(event) {
        steps.push({
          finishReason: event.finishReason,
          usage: event.usage,
          toolCalls: event.toolCalls?.map(tc => ({
            toolName: tc.toolName,
            input: tc.input,
          })),
        });
      },
    });

    return Response.json({
      text: result.text,
      steps,
      totalSteps: result.steps.length,
      allToolCalls: result.steps.flatMap(s => s.toolCalls || []),
      usage: result.usage,
    });
  } catch (error) {
    console.error('Multi-step error:', error);
    return Response.json({ error: '多步推理失败' }, { status: 500 });
  }
}
