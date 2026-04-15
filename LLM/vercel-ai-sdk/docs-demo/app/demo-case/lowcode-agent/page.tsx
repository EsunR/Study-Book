"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import Link from "next/link";
import { DefaultChatTransport, UIMessage } from "ai";
import { ToolCallCard } from "@/lib/ToolCallCard";
import { LowCodeRenderer } from "./LowCodeRenderer";
import { PageSchema } from "./schema";

const suggestedQuestions = [
  "帮我做一个商品展示页面",
  "做一个公司介绍页",
  "帮我做一个产品分类页面",
];

export default function LowCodeAgentPage() {
  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/demo-case/lowcode-agent/api/chat",
    }),
  });
  const [input, setInput] = useState("");

  // 从消息中提取最新的 schema（优先 output，其次 input）
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
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* 左侧 - 聊天面板 */}
      <div
        style={{
          width: "40%",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          minWidth: 360,
        }}
      >
        {/* 聊天头部 */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <Link href="/" style={{ fontSize: 13, color: "var(--primary)" }}>
            &larr; 返回首页
          </Link>
          <h2 style={{ fontSize: 18, fontWeight: "bold", margin: "8px 0 4px" }}>
            低代码页面生成器
          </h2>
          <p style={{ fontSize: 12, opacity: 0.5, margin: 0 }}>
            描述需求 → AI 对话收集信息 → 自动生成页面
          </p>
        </div>

        {/* 消息列表 */}
        <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
          {messages.length === 0 && (
            <div style={{ textAlign: "center", paddingTop: 40 }}>
              <div style={{ fontSize: 14, opacity: 0.6, marginBottom: 16 }}>
                描述你想要的页面 👇
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  maxWidth: 280,
                  margin: "0 auto",
                }}
              >
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestion(q)}
                    style={{
                      padding: "10px 16px",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      background: "var(--card-bg)",
                      color: "var(--foreground)",
                      cursor: "pointer",
                      fontSize: 14,
                      textAlign: "left",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.borderColor =
                        "var(--primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.borderColor =
                        "var(--border)";
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                marginBottom: 12,
                display: "flex",
                justifyContent:
                  message.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "85%",
                  padding: "10px 14px",
                  borderRadius: 12,
                  background:
                    message.role === "user"
                      ? "var(--primary)"
                      : "var(--card-bg)",
                  color:
                    message.role === "user"
                      ? "white"
                      : "var(--foreground)",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
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
                      <span
                        key={`${message.id}-${i}`}
                        style={{ fontSize: 12, opacity: 0.7 }}
                      >
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
            <div style={{ padding: "10px 14px" }}>
              <div className="loading">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {error && (
            <div
              style={{
                padding: "10px 14px",
                background: "#fee",
                borderRadius: 12,
                color: "#c00",
                fontSize: 14,
              }}
            >
              发生错误: {error.message}
            </div>
          )}
        </div>

        {/* 输入框 */}
        <div
          style={{
            padding: 16,
            borderTop: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="描述你想要的页面..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--background)",
                color: "var(--foreground)",
                fontSize: 14,
              }}
            />
            {isLoading ? (
              <button type="button" onClick={stop} style={buttonStyle}>
                停止
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                style={{
                  ...buttonStyle,
                  opacity: !input.trim() ? 0.5 : 1,
                }}
              >
                发送
              </button>
            )}
          </form>
        </div>
      </div>

      {/* 右侧 - 预览面板 */}
      <div
        style={{
          width: "60%",
          overflow: "auto",
          background: "var(--background)",
        }}
      >
        {latestSchema ? (
          <LowCodeRenderer schema={latestSchema} />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              opacity: 0.25,
              fontSize: 16,
            }}
          >
            页面预览区
          </div>
        )}
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  background: "var(--primary)",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 14,
  whiteSpace: "nowrap",
};

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
