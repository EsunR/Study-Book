export function Button({
  node,
  theme,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  const props = node.props || {};
  const label = (props.label as string) || "按钮";
  const href = props.href as string | undefined;
  const variant = (props.variant as string) || "filled";

  const baseStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "8px 20px",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    textDecoration: "none",
    textAlign: "center",
  };

  const variants: Record<string, React.CSSProperties> = {
    filled: {
      background: theme.primary,
      color: "#fff",
    },
    outlined: {
      background: "transparent",
      color: theme.primary,
      border: `1px solid ${theme.primary}`,
    },
    ghost: {
      background: "transparent",
      color: theme.primary,
    },
  };

  const style = { ...baseStyle, ...variants[variant] };

  if (href) {
    return (
      <a className={node.className} href={href} style={style}>
        {label}
      </a>
    );
  }

  return (
    <button className={node.className} style={style}>
      {label}
    </button>
  );
}
