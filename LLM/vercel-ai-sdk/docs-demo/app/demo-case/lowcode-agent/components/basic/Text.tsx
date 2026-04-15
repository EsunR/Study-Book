export function Text({
  node,
  theme,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  const props = node.props || {};
  const text = (props.text as string) || "";
  const inline = props.inline as boolean | undefined;

  const style: React.CSSProperties = {
    fontSize: 14,
    lineHeight: 1.6,
    color: theme.textSecondary || "rgba(0,0,0,0.6)",
    margin: 0,
  };

  if (inline) {
    return (
      <span className={node.className} style={style}>
        {text}
      </span>
    );
  }

  return (
    <p className={node.className} style={style}>
      {text}
    </p>
  );
}
