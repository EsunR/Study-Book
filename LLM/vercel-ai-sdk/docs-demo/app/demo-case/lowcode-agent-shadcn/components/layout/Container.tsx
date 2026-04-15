import { cn } from "@/lib/utils";
import type { SchemaNode, ThemeColors } from "../../schema";
import type { ReactNode } from "react";

export function Container({
  node,
  children,
}: {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
}) {
  const props = node.props || {};
  const maxWidth = (props.maxWidth as string) || "960px";
  const padding = (props.padding as string) || "24px";
  const centered = props.centered !== false;

  return (
    <div
      className={cn("box-border", node.className)}
      style={{ maxWidth, padding, margin: centered ? "0 auto" : undefined }}
    >
      {children}
    </div>
  );
}
