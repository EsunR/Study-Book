"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import Link from "next/link";
import { DefaultChatTransport, UIMessage } from "ai";
import { ToolCallCard } from "@/lib/ToolCallCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LowCodeRenderer } from "./LowCodeRenderer";
import { PageSchema } from "./schema";

const suggestedQuestions = [
  "帮我做一个商品展示页面",
  "做一个公司介绍页",
  "帮我做一个产品分类页面",
];

export default function LowCodeAgentShadcnPage() {
  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/demo-case/lowcode-agent-shadcn/api/chat",
    }),
  });
  const [input, setInput] = useState("");

  const latestSchema = extractLatestSchema(messages);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && status === "ready") {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const handleSuggestion = (question: string) => {
    if (status === "ready") {
      sendMessage({ text: question });
    }
  };

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 左侧 - 聊天面板 */}
      <div className="w-2/5 border-r border-border flex flex-col min-w-[360px]">
        {/* 聊天头部 */}
        <div className="px-5 py-4 border-b border-border shrink-0">
          <Link href="/" className="text-xs text-primary">
            &larr; 返回首页
          </Link>
          <h2 className="text-lg font-bold mt-2 mb-1">
            低代码页面生成器
            <span className="text-xs font-normal text-muted-foreground ml-2">shadcn/ui</span>
          </h2>
          <p className="text-xs text-muted-foreground m-0">
            描述需求 → AI 对话收集信息 → 自动生成页面
          </p>
        </div>

        {/* 消息列表 */}
        <div className="flex-1 overflow-auto p-4">
          {messages.length === 0 && (
            <div className="text-center pt-10">
              <div className="text-sm text-muted-foreground mb-4">
                描述你想要的页面 👇
              </div>
              <div className="flex flex-col gap-2 max-w-[280px] mx-auto">
                {suggestedQuestions.map((q) => (
                  <Button
                    key={q}
                    variant="outline"
                    onClick={() => handleSuggestion(q)}
                    className="text-left justify-start h-auto py-2.5 px-4 whitespace-normal"
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-3 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {message.parts.map((part, i) => {
                  if (part.type === "text") {
                    return <span key={`${message.id}-${i}`}>{part.text}</span>;
                  }

                  if (
                    part.type === "tool-submitSchema" &&
                    part.state === "output-available"
                  ) {
                    return (
                      <span key={`${message.id}-${i}`} className="text-xs opacity-70">
                        ✅ 页面 Schema 已生成
                      </span>
                    );
                  }

                  if (part.type.startsWith("tool-")) {
                    return (
                      <ToolCallCard
                        key={`${message.id}-${i}`}
                        part={part as Parameters<typeof ToolCallCard>[0]["part"]}
                      />
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="px-3.5 py-2.5">
              <div className="loading">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {error && (
            <div className="px-3.5 py-2.5 bg-destructive/10 rounded-xl text-destructive text-sm">
              发生错误: {error.message}
            </div>
          )}
        </div>

        {/* 输入框 */}
        <div className="p-4 border-t border-border shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="描述你想要的页面..."
              disabled={isLoading}
              className="flex-1"
            />
            {isLoading ? (
              <Button type="button" variant="destructive" onClick={stop}>
                停止
              </Button>
            ) : (
              <Button type="submit" disabled={!input.trim()}>
                发送
              </Button>
            )}
          </form>
        </div>
      </div>

      {/* 右侧 - 预览面板 */}
      <div className="w-3/5 overflow-auto bg-background">
        {latestSchema ? (
          <LowCodeRenderer schema={latestSchema} />
        ) : (
          <div className="flex items-center justify-center h-full opacity-25 text-base">
            页面预览区
          </div>
        )}
      </div>
    </div>
  );
}

/** 从消息中倒序提取最新的 schema */
function extractLatestSchema(messages: UIMessage[]): PageSchema | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    for (const part of messages[i].parts) {
      if (part.type === "tool-submitSchema") {
        const data =
          part.state === "output-available"
            ? part.output
            : part.state === "input-available"
              ? part.input
              : null;
        if (data && typeof data === "object" && "meta" in data && "sections" in data) {
          return data as PageSchema;
        }
      }
    }
  }
  return null;
}
