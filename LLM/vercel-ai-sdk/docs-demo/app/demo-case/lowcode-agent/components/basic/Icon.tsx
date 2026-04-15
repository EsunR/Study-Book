export function Icon({
  node,
  theme,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  const props = node.props || {};
  const name = (props.name as string) || "📦";
  const size = (props.size as number) || 24;

  return (
    <span
      className={node.className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size,
        width: size,
        height: size,
        lineHeight: 1,
      }}
    >
      {name}
    </span>
  );
}
