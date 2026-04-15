import { SchemaNode, ThemeColors } from "../../schema";
import { ReactNode } from "react";

export function ProductCarousel({
  node,
  theme,
}: {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
}) {
  return (
    <div
      className={node.className}
      style={{
        padding: 20,
        textAlign: "center",
        border: `1px dashed ${theme.primary}40`,
        borderRadius: 12,
        color: theme.textSecondary || "#999",
        fontSize: 14,
      }}
    >
      🎠 ProductCarousel（待实现）
    </div>
  );
}
