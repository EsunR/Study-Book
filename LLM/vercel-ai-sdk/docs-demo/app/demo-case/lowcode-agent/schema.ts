// === 纯 TypeScript 类型定义（供客户端组件使用，不依赖 Zod）===

// --- 主题类型 ---

export interface ThemeColors {
  primary: string;
  secondary?: string;
  accent?: string;
  background?: string;
  surface?: string;
  textPrimary?: string;
  textSecondary?: string;
}

// --- 页面元信息 ---

export interface PageMeta {
  title: string;
  description?: string;
  keywords?: string[];
}

// --- SchemaNode 树结构 ---

export interface SchemaNode {
  type: string;
  className?: string;
  props?: Record<string, unknown>;
  dataBinding?: {
    source: string;
    params?: Record<string, unknown>;
  };
  children?: SchemaNode[];
}

// --- 页面 Section ---

export interface PageSection {
  id: string;
  name: string;
  visible?: boolean;
  schema: SchemaNode;
}

// --- 页面 Schema ---

export interface PageSchema {
  meta: PageMeta;
  theme: ThemeColors;
  sections: PageSection[];
}
