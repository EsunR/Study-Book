import { cn } from "@/lib/utils";
import type { SchemaNode, ThemeColors } from "../../schema";
import type { ReactNode } from "react";

export function Stack({
  node,
  children,
}: {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
}) {
  const props = node.props || {};
  const gap = (props.gap as string) || "16px";
  const direction: React.CSSProperties["flexDirection"] = ((props.direction as string) || "column") as React.CSSProperties["flexDirection"];

  return (
    <div
      className={cn("flex", node.className)}
      style={{ flexDirection: direction, gap }}
    >
      {children}
    </div>
  );
}
