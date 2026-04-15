export function Container({
  node,
  theme,
  children,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  const props = node.props || {};
  const maxWidth = (props.maxWidth as string) || "960px";
  const padding = (props.padding as string) || "24px";
  const centered = props.centered !== false;

  return (
    <div
      className={node.className}
      style={{
        maxWidth,
        padding,
        margin: centered ? "0 auto" : undefined,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}
