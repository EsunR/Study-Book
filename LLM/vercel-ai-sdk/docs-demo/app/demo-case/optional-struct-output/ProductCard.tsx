export interface ProductData {
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  rating: number;
}

export interface ProductSearchResult {
  category: string;
  products: ProductData[];
  message?: string;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <span style={{ fontSize: 12, letterSpacing: 1 }}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(empty)}
      <span style={{ marginLeft: 4, opacity: 0.7 }}>{rating}</span>
    </span>
  );
}

function ProductCard({ product }: { product: ProductData }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        padding: 14,
        borderRadius: 12,
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        marginTop: 8,
        transition: "box-shadow 0.2s",
      }}
    >
      {/* 商品图片 */}
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: 10,
          overflow: "hidden",
          flexShrink: 0,
          background: "#1a1a2e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* 商品信息 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 15 }}>{product.name}</span>
          <span
            style={{
              fontSize: 11,
              padding: "2px 8px",
              borderRadius: 10,
              background: product.inStock
                ? "color-mix(in srgb, #22c55e 15%, transparent)"
                : "color-mix(in srgb, #ef4444 15%, transparent)",
              color: product.inStock ? "#16a34a" : "#dc2626",
              whiteSpace: "nowrap",
            }}
          >
            {product.inStock ? "有货" : "缺货"}
          </span>
        </div>

        <div style={{ color: "#ef4444", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
          ¥{product.price.toLocaleString()}
        </div>

        <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 4, lineHeight: 1.4 }}>
          {product.description}
        </div>

        <StarRating rating={product.rating} />
      </div>
    </div>
  );
}

export function ProductList({ data }: { data: ProductSearchResult }) {
  if (data.message && data.products.length === 0) {
    return (
      <div
        style={{
          padding: 16,
          borderRadius: 12,
          background: "color-mix(in srgb, #f59e0b 10%, transparent)",
          border: "1px solid color-mix(in srgb, #f59e0b 30%, transparent)",
          marginTop: 8,
          fontSize: 14,
        }}
      >
        {data.message}
      </div>
    );
  }

  return (
    <div style={{ marginTop: 8 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 6,
          fontSize: 13,
          opacity: 0.7,
        }}
      >
        <span>📦</span>
        <span>
          为您找到 {data.products.length} 件{data.category}商品：
        </span>
      </div>
      {data.products.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </div>
  );
}
