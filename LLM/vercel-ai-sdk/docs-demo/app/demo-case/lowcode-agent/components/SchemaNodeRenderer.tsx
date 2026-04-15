"use client";

import { SchemaNode, ThemeColors } from "../schema";
import { getComponent } from "./registry";
import { resolveDataSource } from "../data/data-source-resolver";

const MAX_DEPTH = 10;

interface SchemaNodeRendererProps {
  node: SchemaNode;
  theme: ThemeColors;
  depth?: number;
}

export function SchemaNodeRenderer({
  node,
  theme,
  depth = 0,
}: SchemaNodeRendererProps) {
  // 防止无限递归
  if (depth >= MAX_DEPTH) {
    return (
      <div style={{ color: "#ef4444", fontSize: 12, padding: 8 }}>
        ⚠ 渲染深度超限（maxDepth={MAX_DEPTH}）
      </div>
    );
  }

  const def = getComponent(node.type);

  if (!def) {
    return <UnknownComponent type={node.type} />;
  }

  // 解析 dataBinding
  let resolvedNode = node;
  if (node.dataBinding) {
    try {
      const data = resolveDataSource(node.dataBinding.source, node.dataBinding.params);
      resolvedNode = {
        ...node,
        props: { ...node.props, _resolvedData: data },
      };
    } catch {
      // dataBinding 解析失败时仍用原始 node
    }
  }

  // 递归渲染子组件
  const children =
    node.children && node.children.length > 0
      ? node.children.map((child, i) => (
          <SchemaNodeRenderer
            key={`${child.type}-${i}`}
            node={child}
            theme={theme}
            depth={depth + 1}
          />
        ))
      : undefined;

  return (
    <>
      {def.component({ node: resolvedNode, theme, children })}
    </>
  );
}

function UnknownComponent({ type }: { type: string }) {
  return (
    <div
      style={{
        border: "1px dashed #ef4444",
        borderRadius: 6,
        padding: "8px 12px",
        color: "#ef4444",
        fontSize: 12,
        background: "rgba(239,68,68,0.05)",
      }}
    >
      未知组件: {type}
    </div>
  );
}
