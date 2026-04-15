import {
  mockProducts,
  mockCategories,
  mockCompany,
  mockCertifications,
} from "./mock-data";

type DataSourceMap = Record<string, (params?: Record<string, unknown>) => unknown>;

const dataSources: DataSourceMap = {
  "api:products": (params) => {
    const category = params?.category as string | undefined;
    if (category) {
      return mockProducts.filter((p) => p.category === category);
    }
    return mockProducts;
  },
  "api:categories": () => mockCategories,
  "api:company": () => mockCompany,
  "api:certifications": () => mockCertifications,
};

/** 同步解析数据源 */
export function resolveDataSource(
  source: string,
  params?: Record<string, unknown>
): unknown {
  const resolver = dataSources[source];
  if (!resolver) {
    console.warn(`Unknown data source: ${source}`);
    return [];
  }
  return resolver(params);
}

/** 获取可用的数据源列表（用于系统提示） */
export function getDataSourceDescriptions(): string {
  return [
    "api:products — 商品列表，可选参数: category(分类名)",
    "api:categories — 商品分类列表",
    "api:company — 公司信息",
    "api:certifications — 资质认证列表",
  ].join("\n");
}
