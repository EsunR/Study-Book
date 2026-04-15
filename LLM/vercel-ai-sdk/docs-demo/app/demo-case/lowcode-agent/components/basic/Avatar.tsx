export function Avatar({
  node,
  theme,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  const props = node.props || {};
  const name = (props.name as string) || "";
  const src = props.src as string | undefined;
  const size = (props.size as number) || 40;

  const initial = name ? name.charAt(0).toUpperCase() : "?";

  if (src) {
    return (
      <img
        className={node.className}
        src={src}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    );
  }

  return (
    <div
      className={node.className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: theme.primary,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.4,
        fontWeight: 600,
      }}
    >
      {initial}
    </div>
  );
}
