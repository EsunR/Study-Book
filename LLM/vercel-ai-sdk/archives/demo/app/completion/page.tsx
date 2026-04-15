"use client";

import { useCompletion } from "@ai-sdk/react";
import Link from "next/link";

export default function CompletionPage() {
  const { completion, input, handleInputChange, handleSubmit, isLoading, stop, error } =
    useCompletion({
      api: "/api/completion",
    });

  return (
    <div className="chat-container">
      <div style={{ marginBottom: 20 }}>
        <Link href="/" style={{ color: "#0070f3" }}>
          ← 返回首页
        </Link>
      </div>

      <h1>✨ 文本补全示例</h1>
      <p style={{ color: "#666", marginBottom: 20 }}>输入一个提示词，AI 将根据提示生成内容。</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="例如：写一篇关于人工智能的文章..."
            style={{
              flex: 1,
              padding: 12,
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              fontSize: 16,
              minHeight: 100,
              resize: "vertical",
            }}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          style={{
            padding: "12px 24px",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading || !input.trim() ? 0.5 : 1,
          }}
        >
          {isLoading ? "生成中..." : "生成"}
        </button>
        {isLoading && (
          <button
            type="button"
            onClick={stop}
            style={{
              padding: "12px 24px",
              background: "#e00",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              marginLeft: 8,
            }}
          >
            停止
          </button>
        )}
      </form>

      {/* 结果展示 */}
      {error && (
        <div
          style={{
            padding: 16,
            background: "#fee",
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          发生错误: {error.message}
        </div>
      )}

      {completion && (
        <div
          style={{
            padding: 20,
            background: "#f5f5f5",
            borderRadius: 12,
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
          }}
        >
          {completion}
        </div>
      )}
    </div>
  );
}
