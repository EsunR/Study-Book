"use client";

import { PageSchema } from "./schema";
import { ThemeProvider } from "./components/ThemeProvider";
import { SchemaNodeRenderer } from "./components/SchemaNodeRenderer";
import "./components/register-all"; // 注册所有组件

export function LowCodeRenderer({ schema }: { schema: PageSchema }) {
  return (
    <ThemeProvider theme={schema.theme}>
      <div
        style={{
          padding: 24,
          maxWidth: 960,
          margin: "0 auto",
          background: schema.theme.background || "#fff",
          color: schema.theme.textPrimary || "inherit",
          minHeight: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* 页面头部 */}
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              margin: 0,
              color: schema.theme.textPrimary || "inherit",
            }}
          >
            {schema.meta.title}
          </h1>
          {schema.meta.description && (
            <p
              style={{
                fontSize: 14,
                color: schema.theme.textSecondary || "rgba(0,0,0,0.6)",
                margin: "6px 0 0",
              }}
            >
              {schema.meta.description}
            </p>
          )}
        </div>

        {/* 渲染各 Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {schema.sections
            .filter((s) => s.visible !== false)
            .map((section) => (
              <SchemaNodeRenderer
                key={section.id}
                node={section.schema}
                theme={schema.theme}
              />
            ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
