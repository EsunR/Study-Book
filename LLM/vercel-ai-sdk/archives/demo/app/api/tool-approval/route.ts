import { generateText, tool, type ModelMessage } from "ai";
import { z } from "zod";
import { model } from "@/lib/model";

// 定义需要审批的文件删除工具
const deleteFileTool = tool({
  description: "删除指定的文件",
  inputSchema: z.object({
    filename: z.string().describe("要删除的文件名"),
    path: z.string().describe("文件路径"),
  }),
  // 删除操作始终需要审批
  needsApproval: true,
  execute: async ({ filename, path }) => {
    // 模拟删除操作
    return {
      success: true,
      message: `已删除文件: ${path}/${filename}`,
      timestamp: new Date().toISOString(),
    };
  },
});

// 定义支付工具（动态审批：金额超过100需要审批）
const paymentTool = tool({
  description: "处理支付请求",
  inputSchema: z.object({
    amount: z.number().describe("支付金额"),
    recipient: z.string().describe("收款人"),
    reason: z.string().describe("支付原因"),
  }),
  // 动态审批：只有金额超过100才需要审批
  needsApproval: async ({ amount }) => amount > 100,
  execute: async ({ amount, recipient, reason }) => {
    return {
      success: true,
      transactionId: `TXN-${Date.now()}`,
      amount,
      recipient,
      reason,
      timestamp: new Date().toISOString(),
    };
  },
});

// 定义发送邮件工具（无需审批）
const sendEmailTool = tool({
  description: "发送电子邮件",
  inputSchema: z.object({
    to: z.string().describe("收件人邮箱"),
    subject: z.string().describe("邮件主题"),
    body: z.string().describe("邮件内容"),
  }),
  // 无需审批，工具会自动执行
  execute: async ({ to, subject }) => {
    return {
      success: true,
      message: `邮件已发送至 ${to}`,
      subject,
      timestamp: new Date().toISOString(),
    };
  },
});

// 工具集合
const tools = {
  deleteFile: deleteFileTool,
  payment: paymentTool,
  sendEmail: sendEmailTool,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, messages: inputMessages, approvals } = body;

    // 初始化消息历史
    let messages: ModelMessage[] = inputMessages || [
      { role: "user", content: prompt },
    ];

    // 如果有审批响应，添加到消息历史
    if (approvals && Array.isArray(approvals)) {
      messages.push({ role: "tool", content: approvals });
    }

    // 调用 generateText
    const result = await generateText({
      model,
      tools,
      messages,
    });

    // 将响应消息添加到历史
    messages.push(...result.response.messages);

    // 检查是否有审批请求
    const approvalRequests: any[] = [];
    for (const part of result.content) {
      if (part.type === "tool-approval-request") {
        approvalRequests.push({
          approvalId: part.approvalId,
          toolName: part.toolCall.toolName,
          args: part.toolCall.input,
          reason:
            part.toolCall.toolName === "deleteFile"
              ? "删除文件是敏感操作，需要确认"
              : "支付金额超过100，需要确认",
        });
      }
    }

    // 如果有审批请求，返回给前端等待用户确认
    if (approvalRequests.length > 0) {
      return Response.json({
        text: result.text,
        approvalRequests,
        needsApproval: true,
        messages, // 返回更新后的消息历史，前端需要保存
      });
    }

    // 没有审批请求，返回最终结果
    return Response.json({
      text: result.text,
      toolCalls: result.toolCalls,
      toolResults: result.toolResults,
      messages, // 返回完整的消息历史
    });
  } catch (error) {
    console.error("Tool approval error:", error);
    return Response.json({ error: "工具审批处理失败" }, { status: 500 });
  }
}
