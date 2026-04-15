export function Flex({
  node,
  theme,
  children,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  const props = node.props || {};
  const direction = (props.direction as React.CSSProperties["flexDirection"]) || "row";
  const gap = (props.gap as string) || "12px";
  const align = (props.align as React.CSSProperties["alignItems"]) || "stretch";
  const justify = (props.justify as React.CSSProperties["justifyContent"]) || "start";
  const wrap: React.CSSProperties["flexWrap"] = (props.wrap as boolean) ? "wrap" : "nowrap";

  return (
    <div
      className={node.className}
      style={{
        display: "flex",
        flexDirection: direction,
        gap,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
      }}
    >
      {children}
    </div>
  );
}
