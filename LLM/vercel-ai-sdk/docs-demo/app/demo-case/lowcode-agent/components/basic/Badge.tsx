export function Badge({
  node,
  theme,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  const props = node.props || {};
  const text = (props.text as string) || "";
  const variant = (props.variant as string) || "default";

  const variants: Record<string, React.CSSProperties> = {
    default: {
      background: `${theme.primary}18`,
      color: theme.primary,
    },
    success: {
      background: "#dcfce7",
      color: "#166534",
    },
    warning: {
      background: "#fef9c3",
      color: "#854d0e",
    },
    danger: {
      background: "#fee2e2",
      color: "#991b1b",
    },
  };

  const style = variants[variant] || variants.default;

  return (
    <span
      className={node.className}
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 9999,
        fontSize: 12,
        fontWeight: 500,
        lineHeight: "20px",
        ...style,
      }}
    >
      {text}
    </span>
  );
}
