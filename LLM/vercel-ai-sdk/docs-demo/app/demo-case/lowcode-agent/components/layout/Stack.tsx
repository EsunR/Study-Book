export function Stack({
  node,
  theme,
  children,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  const props = node.props || {};
  const gap = (props.gap as string) || "16px";
  const direction: React.CSSProperties["flexDirection"] = ((props.direction as string) || "column") as React.CSSProperties["flexDirection"];

  return (
    <div
      className={node.className}
      style={{
        display: "flex",
        flexDirection: direction,
        gap,
      }}
    >
      {children}
    </div>
  );
}
