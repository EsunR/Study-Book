"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { useState } from "react";
import Link from "next/link";
import { WeatherCard, WeatherData } from "./WeatherCard";
import { ToolCallCard } from "./ToolCallCard";

// 自定义消息类型
type ChatUIMessage = UIMessage<
  never,
  {
    weather_card: WeatherData;
  }
>;

export default function ChatPage() {
  const { messages, sendMessage, status, stop, error } = useChat<ChatUIMessage>({
    transport: new DefaultChatTransport({
      api: "/api/chat",
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
          ← 返回首页
        </Link>
      </div>

      <h1>💬 聊天示例</h1>

      <p>{JSON.stringify(messages, null, 2)}</p>

      {/* 消息列表 */}
      <div style={{ marginBottom: 100 }}>
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <strong>{message.role === "user" ? "用户" : "AI"}:</strong>
            <div>
              {message.parts.map((part, index) => {
                // 处理文本消息
                if (part.type === "text") {
                  return <span key={index}>{part.text}</span>;
                }

                // 处理天气卡片数据 - LLM 返回的结构化输出
                if (part.type === "data-weather_card") {
                  return <WeatherCard key={index} data={part.data} />;
                }

                // 处理工具调用（显示原始工具信息）
                if (part.type.startsWith("tool-")) {
                  return (
                    <ToolCallCard
                      key={index}
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
          <div className="message assistant" style={{ background: "#fee" }}>
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
            placeholder="输入消息..."
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
