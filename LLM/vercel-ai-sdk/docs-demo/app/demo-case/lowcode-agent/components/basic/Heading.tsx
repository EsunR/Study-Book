export function Heading({
  node,
  theme,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  const props = node.props || {};
  const level = Math.min(Math.max((props.level as number) || 1, 1), 6) as 1|2|3|4|5|6;
  const text = (props.text as string) || "";
  const Tag = `h${level}` as const;

  const sizes: Record<number, React.CSSProperties> = {
    1: { fontSize: 32, fontWeight: 800 },
    2: { fontSize: 26, fontWeight: 700 },
    3: { fontSize: 22, fontWeight: 700 },
    4: { fontSize: 18, fontWeight: 600 },
    5: { fontSize: 16, fontWeight: 600 },
    6: { fontSize: 14, fontWeight: 600 },
  };

  return (
    <Tag
      className={node.className}
      style={{
        ...sizes[level],
        color: theme.textPrimary || "inherit",
        margin: 0,
      }}
    >
      {text}
    </Tag>
  );
}
