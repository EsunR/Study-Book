import { cn } from "@/lib/utils";
import type { SchemaNode, ThemeColors } from "../../schema";
import type { ReactNode } from "react";

export function Flex({
  node,
  children,
}: {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
}) {
  const props = node.props || {};
  const direction = (props.direction as React.CSSProperties["flexDirection"]) || "row";
  const gap = (props.gap as string) || "12px";
  const align = (props.align as React.CSSProperties["alignItems"]) || "stretch";
  const justify = (props.justify as React.CSSProperties["justifyContent"]) || "start";
  const wrap: React.CSSProperties["flexWrap"] = (props.wrap as boolean) ? "wrap" : "nowrap";

  return (
    <div
      className={cn("flex", node.className)}
      style={{ flexDirection: direction, gap, alignItems: align, justifyContent: justify, flexWrap: wrap }}
    >
      {children}
    </div>
  );
}
