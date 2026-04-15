import { SchemaNode, ThemeColors } from "../../schema";
import { Company } from "../../data/mock-data";
import { ReactNode } from "react";

export function CompanyProfile({
  node,
  theme,
}: {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
}) {
  const props = node.props || {};

  // 优先从 _resolvedData / _item 获取数据
  let company: Company | null = null;
  const resolved = props._resolvedData || props._item;
  if (resolved && typeof resolved === "object" && "name" in (resolved as object)) {
    company = resolved as Company;
  }

  if (!company) {
    return (
      <div style={{ color: "#999", fontSize: 14, padding: 20, textAlign: "center" }}>
        暂无公司数据
      </div>
    );
  }

  return (
    <div
      className={node.className}
      style={{
        background: theme.surface || "#fff",
        borderRadius: 12,
        padding: 24,
        border: `1px solid ${theme.textSecondary || "#e5e5e5"}20`,
      }}
    >
      {/* 公司头部 */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: `${theme.primary}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
          }}
        >
          {company.logo}
        </div>
        <div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: theme.textPrimary || "inherit",
            }}
          >
            {company.name}
          </div>
          <div
            style={{
              fontSize: 13,
              color: theme.textSecondary || "rgba(0,0,0,0.5)",
            }}
          >
            {company.slogan}
          </div>
        </div>
      </div>

      {/* 公司简介 */}
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: theme.textSecondary || "rgba(0,0,0,0.6)",
          margin: "0 0 20px",
        }}
      >
        {company.description}
      </p>

      {/* 基本信息标签 */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <InfoTag label="成立时间" value={company.founded} />
        <InfoTag label="员工规模" value={company.employees} />
        <InfoTag label="总部位置" value={company.location} />
      </div>

      {/* 统计数据 */}
      {company.stats && company.stats.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(company.stats.length, 4)}, 1fr)`,
            gap: 12,
          }}
        >
          {company.stats.map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "12px 8px",
                background: `${theme.primary}08`,
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: theme.primary,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: theme.textSecondary || "rgba(0,0,0,0.5)",
                  marginTop: 2,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoTag({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontSize: 13,
        color: "rgba(0,0,0,0.5)",
      }}
    >
      <span style={{ fontWeight: 500 }}>{label}:</span>
      <span>{value}</span>
    </div>
  );
}
