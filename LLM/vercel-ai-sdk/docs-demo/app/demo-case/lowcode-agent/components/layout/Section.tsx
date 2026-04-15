export function Section({
  node,
  theme,
  children,
}: {
  node: import("../../schema").SchemaNode;
  theme: import("../../schema").ThemeColors;
  children?: React.ReactNode;
}) {
  const props = node.props || {};
  const title = props.title as string | undefined;
  const subtitle = props.subtitle as string | undefined;

  return (
    <section className={node.className} style={{ marginBottom: 32 }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: 16 }}>
          {title && (
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: theme.textPrimary || "inherit",
                margin: 0,
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              style={{
                fontSize: 14,
                color: theme.textSecondary || "rgba(0,0,0,0.6)",
                margin: "4px 0 0",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
