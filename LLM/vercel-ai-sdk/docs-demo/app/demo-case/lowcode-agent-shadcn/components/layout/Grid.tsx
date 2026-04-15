import { cn } from "@/lib/utils";
import type { SchemaNode, ThemeColors } from "../../schema";
import type { ReactNode } from "react";

export function Grid({
  node,
  children,
}: {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
}) {
  const props = node.props || {};
  const columns = (props.columns as number) || 3;
  const gap = (props.gap as string) || "16px";

  return (
    <div
      className={cn("grid", node.className)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap }}
    >
      {children}
    </div>
  );
}
