"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import Link from "next/link";
import { DefaultChatTransport } from "ai";
import { ProductList, ProductSearchResult } from "./ProductCard";
import { ToolCallCard } from "@/lib/ToolCallCard";

const suggestedQuestions = [
  "推荐一款手机",
  "有什么笔记本推荐？",
  "帮我看看有什么耳机",
  "什么是量子计算？",
];

export default function DemoCasePage() {
  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/demo-case/optional-struct-output/api/chat",
    }),
  });
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
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
  const hasMessages = messages.length > 0;

  return (
    <div className="chat-container">
      <div style={{ marginBottom: 20 }}>
        <Link href="/" style={{ color: "#0070f3" }}>
          &larr; 返回首页
        </Link>
      </div>

      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
        智能购物助手
      </h1>
      <p style={{ opacity: 0.7, marginBottom: 8 }}>
        商品查询返回结构化商品卡 · 普通问答返回文本 — 同一个 Agent 灵活切换
      </p>
      <p style={{ fontSize: 13, opacity: 0.5, marginBottom: 20 }}>
        核心能力：Tool Calling 让 LLM 自主判断何时输出结构化数据
      </p>

      {/* 推荐问题 */}
      {!hasMessages && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, opacity: 0.6, marginBottom: 10 }}>
            试试这些问题 👇
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSuggestion(q)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  border: "1px solid var(--border)",
                  background: "var(--card-bg)",
                  color: "var(--foreground)",
                  cursor: "pointer",
                  fontSize: 14,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.borderColor =
                    "var(--primary)";
                  (e.target as HTMLButtonElement).style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.borderColor =
                    "var(--border)";
                  (e.target as HTMLButtonElement).style.color =
                    "var(--foreground)";
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 消息列表 */}
      <div style={{ marginBottom: 100 }}>
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <strong>{message.role === "user" ? "用户" : "AI"}:</strong>
            <div>
              {message.parts.map((part, i) => {
                // 文本消息 - 直接渲染
                if (part.type === "text") {
                  return <div key={`${message.id}-${i}`}>{part.text}</div>;
                }

                // 商品搜索工具 - 输出可用时渲染商品卡
                if (
                  part.type === "tool-searchProduct" &&
                  part.state === "output-available"
                ) {
                  const output = part.output as ProductSearchResult;
                  if (output?.products) {
                    return (
                      <ProductList
                        key={`${message.id}-${i}`}
                        data={output}
                      />
                    );
                  }
                }

                // 其他工具状态 - 用 ToolCallCard 渲染
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

        {/* 加载状态 */}
        {isLoading && (
          <div className="message assistant">
            <div className="loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {/* 错误处理 */}
        {error && (
          <div
            className="message assistant"
            style={{ background: "#fee", color: "#c00" }}
          >
            发生错误: {error.message}
          </div>
        )}
      </div>

      {/* 输入框 */}
      <div className="input-container">
        <form onSubmit={handleSubmit} className="input-form">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="试试问：推荐一款手机 / 什么是量子计算？"
            disabled={isLoading}
          />
          {isLoading ? (
            <button type="button" onClick={stop}>
              停止
            </button>
          ) : (
            <button type="submit" disabled={!input.trim()}>
              发送
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
