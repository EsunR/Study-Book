// 工具调用部分的类型
interface ToolCallPart {
  type: string;
  state: string;
  input?: unknown;
  output?: unknown;
  errorText?: string;
}

export function ToolCallCard({ part }: { part: ToolCallPart }) {
  if (part.state === "input-available") {
    return (
      <div
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

  if (part.state === "output-available") {
    return (
      <div
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
          {JSON.stringify(part.output, null, 2)}
        </div>
      </div>
    );
  }

  if (part.state === "output-error") {
    return (
      <div
        style={{
          background: "#fee",
          padding: "8px 12px",
          borderRadius: 6,
          marginTop: 4,
          fontSize: "0.9em",
        }}
      >
        ❌ 工具执行失败: {part.errorText}
      </div>
    );
  }

  return null;
}
