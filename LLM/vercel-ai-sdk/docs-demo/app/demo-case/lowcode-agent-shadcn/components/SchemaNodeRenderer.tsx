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
  if (depth >= MAX_DEPTH) {
    return (
      <div className="text-destructive text-xs p-2">
        渲染深度超限（maxDepth={MAX_DEPTH}）
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
    <div className="border border-dashed border-destructive rounded-md px-3 py-2 text-destructive text-xs bg-destructive/5">
      未知组件: {type}
    </div>
  );
}
