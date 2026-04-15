import { SchemaNode, ThemeColors } from "../../schema";
import { Product } from "../../data/mock-data";
import { ReactNode } from "react";

export function ProductGrid({
  node,
  theme,
}: {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
}) {
  const props = node.props || {};
  const columns = (props.columns as number) || 3;

  // 优先从 _resolvedData 读取，其次从 _item 读取
  let products: Product[] = [];
  const resolved = props._resolvedData || props._item;
  if (Array.isArray(resolved)) {
    products = resolved as Product[];
  }

  if (products.length === 0) {
    return (
      <div style={{ color: "#999", fontSize: 14, padding: 20, textAlign: "center" }}>
        暂无商品数据
      </div>
    );
  }

  return (
    <div
      className={node.className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 20,
      }}
    >
      {products.map((product, i) => (
        <div
          key={product.id || i}
          style={{
            border: `1px solid ${theme.textSecondary || "#e5e5e5"}20`,
            borderRadius: 12,
            overflow: "hidden",
            background: theme.surface || "#fff",
            transition: "box-shadow 0.2s",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 160,
              background: `${theme.primary}10`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.innerHTML =
                  `<span style="font-size:40px">📦</span>`;
              }}
            />
          </div>
          <div style={{ padding: "12px 16px" }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: theme.textPrimary || "inherit",
                marginBottom: 4,
              }}
            >
              {product.name}
            </div>
            <div
              style={{
                fontSize: 12,
                color: theme.textSecondary || "rgba(0,0,0,0.5)",
                marginBottom: 8,
                lineHeight: 1.4,
              }}
            >
              {product.description}
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: theme.primary,
              }}
            >
              ¥{product.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
