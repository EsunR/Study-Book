interface ToolCallPart {
  type: string;
  state: string;
  input?: unknown;
  output?: unknown;
  errorText?: string;
}

/** 从 "tool-searchProduct" 中提取 "searchProduct"，再转为可读名称 */
function getToolDisplayName(type: string): string {
  const name = type.replace("tool-", "");
  // 将 camelCase 拆分为单词并首字母大写
  const words = name.replace(/([A-Z])/g, " $1").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function formatValue(value: unknown): string {
  if (!value) return "";
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    return entries.map(([key, val]) => `${key}: ${val}`).join(" · ");
  }
  return String(value);
}

export function ToolCallCard({ part }: { part: ToolCallPart }) {
  const displayName = getToolDisplayName(part.type);

  if (part.state === "input-available") {
    return (
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          marginTop: 8,
          overflow: "hidden",
          fontSize: "0.9em",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            background: "color-mix(in srgb, var(--primary) 8%, transparent)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "color-mix(in srgb, var(--primary) 15%, transparent)",
              fontSize: 12,
            }}
          >
            🔧
          </span>
          <span style={{ fontWeight: 600, color: "var(--primary)" }}>
            {displayName}
          </span>
          <span
            style={{
              fontSize: "0.75em",
              padding: "2px 8px",
              borderRadius: 10,
              background: "color-mix(in srgb, #f59e0b 15%, transparent)",
              color: "#d97706",
            }}
          >
            调用中...
          </span>
        </div>
        <div
          style={{
            padding: "8px 12px",
            color: "var(--foreground)",
            opacity: 0.8,
            fontSize: "0.85em",
          }}
        >
          {formatValue(part.input)}
        </div>
      </div>
    );
  }

  if (part.state === "output-available") {
    return (
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          marginTop: 8,
          overflow: "hidden",
          fontSize: "0.9em",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            background: "color-mix(in srgb, #22c55e 8%, transparent)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "color-mix(in srgb, #22c55e 15%, transparent)",
              fontSize: 12,
            }}
          >
            ✅
          </span>
          <span style={{ fontWeight: 600, color: "#16a34a" }}>
            {displayName}
          </span>
          <span
            style={{
              fontSize: "0.75em",
              padding: "2px 8px",
              borderRadius: 10,
              background: "color-mix(in srgb, #22c55e 15%, transparent)",
              color: "#16a34a",
            }}
          >
            已完成
          </span>
        </div>
        <div
          style={{
            padding: "8px 12px",
            color: "var(--foreground)",
            opacity: 0.8,
            fontSize: "0.85em",
          }}
        >
          {formatValue(part.output)}
        </div>
      </div>
    );
  }

  if (part.state === "output-error") {
    return (
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          marginTop: 8,
          overflow: "hidden",
          fontSize: "0.9em",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            background: "color-mix(in srgb, #ef4444 8%, transparent)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "color-mix(in srgb, #ef4444 15%, transparent)",
              fontSize: 12,
            }}
          >
            ❌
          </span>
          <span style={{ fontWeight: 600, color: "#dc2626" }}>
            {displayName}
          </span>
          <span
            style={{
              fontSize: "0.75em",
              padding: "2px 8px",
              borderRadius: 10,
              background: "color-mix(in srgb, #ef4444 15%, transparent)",
              color: "#dc2626",
            }}
          >
            失败
          </span>
        </div>
        <div
          style={{
            padding: "8px 12px",
            color: "#dc2626",
            fontSize: "0.85em",
          }}
        >
          {part.errorText}
        </div>
      </div>
    );
  }

  return null;
}
