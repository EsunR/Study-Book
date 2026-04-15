export function Grid({
  node,
  theme,
  children,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  const props = node.props || {};
  const columns = (props.columns as number) || 3;
  const gap = (props.gap as string) || "16px";

  return (
    <div
      className={node.className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children}
    </div>
  );
}
