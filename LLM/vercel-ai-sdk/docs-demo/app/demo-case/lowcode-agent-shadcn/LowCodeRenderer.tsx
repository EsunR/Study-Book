"use client";

import { PageSchema } from "./schema";
import { ThemeProvider } from "./components/ThemeProvider";
import { SchemaNodeRenderer } from "./components/SchemaNodeRenderer";
import "./components/register-all"; // 注册所有组件

export function LowCodeRenderer({ schema }: { schema: PageSchema }) {
  return (
    <ThemeProvider theme={schema.theme}>
      <div className="p-6 max-w-[960px] mx-auto bg-background text-foreground min-h-full box-border">
        {/* 页面头部 */}
        <div className="mb-7">
          <h1 className="text-2xl font-extrabold text-foreground m-0">
            {schema.meta.title}
          </h1>
          {schema.meta.description && (
            <p className="text-sm text-muted-foreground mt-1.5 mb-0">
              {schema.meta.description}
            </p>
          )}
        </div>

        {/* 渲染各 Section */}
        <div className="flex flex-col gap-6">
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
