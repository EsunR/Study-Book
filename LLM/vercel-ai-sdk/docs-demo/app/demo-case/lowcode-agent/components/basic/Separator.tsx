export function Separator({
  node,
  theme,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  return (
    <hr
      className={node.className}
      style={{
        border: "none",
        borderTop: `1px solid ${theme.textSecondary || "#e5e5e5"}30`,
        margin: "16px 0",
      }}
    />
  );
}
