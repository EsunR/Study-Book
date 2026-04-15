export function Link({
  node,
  theme,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  const props = node.props || {};
  const href = (props.href as string) || "#";
  const text = (props.text as string) || "";
  const target = (props.target as string) || "_self";

  return (
    <a
      className={node.className}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      style={{
        color: theme.primary,
        textDecoration: "none",
        fontSize: 14,
      }}
    >
      {text}
    </a>
  );
}
