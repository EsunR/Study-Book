"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { useState } from "react";
import Link from "next/link";

// 天气数据类型
interface WeatherData {
  city: string;
  temperature: string;
  condition: string;
  humidity: string;
  wind: string;
}

// 自定义消息类型
type ChatUIMessage = UIMessage<
  never,
  {
    weather_card: WeatherData;
  }
>;

// 天气图标映射
const weatherIcons: Record<string, string> = {
  晴天: "☀️",
  多云: "⛅",
  小雨: "🌧️",
  大雨: "⛈️",
  阴天: "☁️",
  雪: "❄️",
};

// 天气卡片组件
function WeatherCard({ data }: { data: WeatherData }) {
  const icon = weatherIcons[data.condition] || "🌡️";

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 16,
        padding: 20,
        color: "white",
        minWidth: 200,
        maxWidth: 280,
        boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
        marginTop: 8,
      }}
    >
      {/* 城市名称 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600 }}>{data.city}</span>
        <span style={{ fontSize: 12, opacity: 0.8 }}>今日天气</span>
      </div>

      {/* 温度和图标 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 42, fontWeight: 300 }}>{data.temperature}</div>
        <div style={{ fontSize: 48 }}>{icon}</div>
      </div>

      {/* 天气状况 */}
      <div
        style={{
          fontSize: 16,
          marginBottom: 16,
          padding: "6px 12px",
          background: "rgba(255,255,255,0.2)",
          borderRadius: 20,
          display: "inline-block",
        }}
      >
        {data.condition}
      </div>

      {/* 详细信息 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          opacity: 0.9,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span>💧</span>
          <span>湿度 {data.humidity}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span>🌬️</span>
          <span>{data.wind}</span>
        </div>
      </div>
    </div>
  );
}

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
                  const toolPart = part as {
                    type: string;
                    state: string;
                    input?: unknown;
                    output?: unknown;
                    errorText?: string;
                  };

                  // 显示工具调用过程
                  if (toolPart.state === "input-available") {
                    return (
                      <div
                        key={index}
                        style={{
                          background: "#f0f7ff",
                          padding: "8px 12px",
                          borderRadius: 6,
                          marginTop: 4,
                          fontSize: "0.9em",
                          border: "1px solid #d0e3ff",
                        }}
                      >
                        🔧 调用工具...
                      </div>
                    );
                  }

                  if (toolPart.state === "output-available") {
                    return (
                      <div
                        key={index}
                        style={{
                          background: "#f0fff0",
                          padding: "8px 12px",
                          borderRadius: 6,
                          marginTop: 4,
                          fontSize: "0.9em",
                          border: "1px solid #d0ffd0",
                        }}
                      >
                        ✅ 工具执行完成
                        <div
                          style={{
                            color: "#666",
                            marginTop: 4,
                            maxHeight: 100,
                            overflow: "auto",
                            fontSize: "0.85em",
                          }}
                        >
                          {JSON.stringify(toolPart.output, null, 2)}
                        </div>
                      </div>
                    );
                  }

                  if (toolPart.state === "output-error") {
                    return (
                      <div
                        key={index}
                        style={{
                          background: "#fee",
                          padding: "8px 12px",
                          borderRadius: 6,
                          marginTop: 4,
                          fontSize: "0.9em",
                        }}
                      >
                        ❌ 工具执行失败: {toolPart.errorText}
                      </div>
                    );
                  }
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
