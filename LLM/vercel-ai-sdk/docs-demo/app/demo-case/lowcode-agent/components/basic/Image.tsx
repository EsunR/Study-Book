export function Image({
  node,
  theme,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  const props = node.props || {};
  const src = (props.src as string) || "";
  const alt = (props.alt as string) || "";
  const width = props.width as string | number | undefined;
  const height = props.height as string | number | undefined;

  return (
    <img
      className={node.className}
      src={src}
      alt={alt}
      style={{
        maxWidth: "100%",
        height: "auto",
        display: "block",
        ...(width ? { width } : {}),
        ...(height ? { height } : {}),
      }}
    />
  );
}
