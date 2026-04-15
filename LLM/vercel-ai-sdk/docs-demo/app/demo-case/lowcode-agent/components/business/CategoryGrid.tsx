import { SchemaNode, ThemeColors } from "../../schema";
import { ReactNode } from "react";

export function CategoryGrid({
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
      📂 CategoryGrid（待实现）
    </div>
  );
}
