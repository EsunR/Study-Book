"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import Link from "next/link";
import { DefaultChatTransport } from "ai";
import { ToolCallCard } from "@/lib/ToolCallCard";
import { WeatherCard, WeatherData } from "./WeatherCard";

export default function NuxtAppRouterDemo() {
  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/getting-started/nuxt-app-router/api/chat",
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

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="chat-container">
      <div style={{ marginBottom: 20 }}>
        <Link href="/" style={{ color: "#0070f3" }}>
          &larr; 返回首页
        </Link>
      </div>

      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>Next.js App Router Demo</h1>
      <p style={{ opacity: 0.7, marginBottom: 20 }}>
        使用 useChat + streamText + Tool Calling + Multi-Step 构建聊天应用
      </p>

      {/* 消息列表 */}
      <div style={{ marginBottom: 100 }}>
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <strong>{message.role === "user" ? "用户" : "AI"}:</strong>
            <div>
              {message.parts.map((part, i) => {
                if (part.type === "text") {
                  return <div key={`${message.id}-${i}`}>{part.text}</div>;
                }

                // 天气工具输出 - 使用 WeatherCard 渲染
                if (
                  part.type === "tool-weather" &&
                  part.state === "output-available"
                ) {
                  const output = part.output as WeatherData;
                  if (output?.location) {
                    return (
                      <WeatherCard
                        key={`${message.id}-${i}`}
                        data={output}
                      />
                    );
                  }
                }

                // 所有工具调用 - 使用 ToolCallCard 渲染
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
          <div className="message assistant" style={{ background: "#fee", color: "#c00" }}>
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
            placeholder="试试问：纽约天气怎么样？或者：北京多少摄氏度？"
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
