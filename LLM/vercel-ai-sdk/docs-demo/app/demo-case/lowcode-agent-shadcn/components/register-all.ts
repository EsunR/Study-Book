"use client";

// 注册所有组件到 registry
// 包含：shadcn/ui 组件 + 布局组件 + 业务组件 + 数据组件

import { registerComponent } from "./registry";
import type { ComponentCategory } from "./registry";

// --- shadcn/ui 组件适配器 ---
import {
  // 基础 UI（Tailwind 实现，无 shadcn 对应）
  Heading, Text, Image, Icon,
  // shadcn/ui 组件
  ButtonAdapter, BadgeAdapter, AvatarAdapter, SeparatorAdapter,
  InputAdapter, TextareaAdapter,
  CardAdapter, CardHeaderAdapter, CardTitleAdapter, CardDescriptionAdapter,
  CardContentAdapter, CardFooterAdapter, CardActionAdapter,
  AlertAdapter, AlertTitleAdapter, AlertDescriptionAdapter,
  ProgressAdapter, SkeletonAdapter, TooltipAdapter,
  TabsAdapter, TabsListAdapter, TabsTriggerAdapter, TabsContentAdapter,
  AccordionAdapter, AccordionItemAdapter, AccordionTriggerAdapter, AccordionContentAdapter,
  TableAdapter, TableHeaderAdapter, TableBodyAdapter, TableRowAdapter,
  TableHeadAdapter, TableCellAdapter,
} from "./shadcn-adapters";

// --- 布局组件 ---
import { Container } from "./layout/Container";
import { Grid } from "./layout/Grid";
import { Flex } from "./layout/Flex";
import { Stack } from "./layout/Stack";
import { Section } from "./layout/Section";

// --- 业务组件 ---
import { ProductGrid } from "./business/ProductGrid";
import { CompanyProfile } from "./business/CompanyProfile";
import { ProductCarousel } from "./business/ProductCarousel";
import { CategoryGrid } from "./business/CategoryGrid";
import { CertShowcase } from "./business/CertShowcase";

// --- 数据组件 ---
import { DataProvider } from "./data/DataProvider";
import { DataItem } from "./data/DataItem";

// ============================================================
// 辅助：批量注册
// ============================================================

type Reg = {
  name: string;
  displayName: string;
  category: ComponentCategory;
  description: string;
  type: "static" | "dynamic";
  acceptsChildren: boolean;
  childTypes?: string[];
  component: (props: { node: any; theme: any; children?: any }) => any;
};

const allComponents: Reg[] = [
  // --- 基础 UI ---
  { name: "Heading", displayName: "标题", category: "basic", description: "标题 h1-h6，props: level(1-6), text", type: "static", acceptsChildren: false, component: Heading },
  { name: "Text", displayName: "文本", category: "basic", description: "段落/行内文本，props: text, inline", type: "static", acceptsChildren: true, component: Text },
  { name: "Image", displayName: "图片", category: "basic", description: "图片，props: src, alt, width, height", type: "static", acceptsChildren: false, component: Image },
  { name: "Icon", displayName: "图标", category: "basic", description: "图标（emoji），props: name, size", type: "static", acceptsChildren: false, component: Icon },

  // --- shadcn/ui: 操作 ---
  { name: "Button", displayName: "按钮", category: "basic", description: "shadcn 按钮，props: label, href, variant(filled|outlined|ghost|link|destructive|secondary), size(default|sm|lg|icon)", type: "static", acceptsChildren: false, component: ButtonAdapter },
  { name: "Badge", displayName: "标签", category: "basic", description: "shadcn 标签，props: text, variant(default|success|warning|danger|ghost)", type: "static", acceptsChildren: true, component: BadgeAdapter },
  { name: "Separator", displayName: "分隔线", category: "basic", description: "shadcn 分隔线，props: orientation(horizontal|vertical)", type: "static", acceptsChildren: false, component: SeparatorAdapter },
  { name: "Avatar", displayName: "头像", category: "basic", description: "shadcn 头像，props: name, src, size", type: "static", acceptsChildren: false, component: AvatarAdapter },

  // --- shadcn/ui: 表单 ---
  { name: "Input", displayName: "输入框", category: "basic", description: "shadcn 输入框，props: placeholder, type, disabled", type: "static", acceptsChildren: false, component: InputAdapter },
  { name: "Textarea", displayName: "文本域", category: "basic", description: "shadcn 文本域，props: placeholder, rows, disabled", type: "static", acceptsChildren: false, component: TextareaAdapter },
  { name: "Progress", displayName: "进度条", category: "basic", description: "shadcn 进度条，props: value(0-100)", type: "static", acceptsChildren: false, component: ProgressAdapter },
  { name: "Skeleton", displayName: "骨架屏", category: "basic", description: "shadcn 骨架屏占位", type: "static", acceptsChildren: false, component: SkeletonAdapter },

  // --- shadcn/ui: Card 复合组件 ---
  { name: "Card", displayName: "卡片", category: "basic", description: "shadcn Card 容器", type: "static", acceptsChildren: true, component: CardAdapter },
  { name: "CardHeader", displayName: "卡片头部", category: "basic", description: "shadcn CardHeader", type: "static", acceptsChildren: true, component: CardHeaderAdapter },
  { name: "CardTitle", displayName: "卡片标题", category: "basic", description: "shadcn CardTitle，props: text", type: "static", acceptsChildren: true, component: CardTitleAdapter },
  { name: "CardDescription", displayName: "卡片描述", category: "basic", description: "shadcn CardDescription，props: text", type: "static", acceptsChildren: true, component: CardDescriptionAdapter },
  { name: "CardContent", displayName: "卡片内容", category: "basic", description: "shadcn CardContent", type: "static", acceptsChildren: true, component: CardContentAdapter },
  { name: "CardFooter", displayName: "卡片底部", category: "basic", description: "shadcn CardFooter", type: "static", acceptsChildren: true, component: CardFooterAdapter },
  { name: "CardAction", displayName: "卡片操作", category: "basic", description: "shadcn CardAction", type: "static", acceptsChildren: true, component: CardActionAdapter },

  // --- shadcn/ui: Alert ---
  { name: "Alert", displayName: "提示框", category: "basic", description: "shadcn Alert，props: variant(default|destructive)", type: "static", acceptsChildren: true, component: AlertAdapter },
  { name: "AlertTitle", displayName: "提示标题", category: "basic", description: "shadcn AlertTitle，props: text", type: "static", acceptsChildren: true, component: AlertTitleAdapter },
  { name: "AlertDescription", displayName: "提示描述", category: "basic", description: "shadcn AlertDescription，props: text", type: "static", acceptsChildren: true, component: AlertDescriptionAdapter },

  // --- shadcn/ui: Tooltip ---
  { name: "Tooltip", displayName: "工具提示", category: "basic", description: "shadcn Tooltip，props: content", type: "static", acceptsChildren: true, component: TooltipAdapter },

  // --- shadcn/ui: Tabs ---
  { name: "Tabs", displayName: "选项卡", category: "basic", description: "shadcn Tabs，props: defaultValue", type: "static", acceptsChildren: true, component: TabsAdapter },
  { name: "TabsList", displayName: "选项卡列表", category: "basic", description: "shadcn TabsList", type: "static", acceptsChildren: true, component: TabsListAdapter },
  { name: "TabsTrigger", displayName: "选项卡触发器", category: "basic", description: "shadcn TabsTrigger，props: value, text", type: "static", acceptsChildren: false, component: TabsTriggerAdapter },
  { name: "TabsContent", displayName: "选项卡内容", category: "basic", description: "shadcn TabsContent，props: value", type: "static", acceptsChildren: true, component: TabsContentAdapter },

  // --- shadcn/ui: Accordion ---
  { name: "Accordion", displayName: "手风琴", category: "basic", description: "shadcn Accordion，props: type(single|multiple)", type: "static", acceptsChildren: true, component: AccordionAdapter },
  { name: "AccordionItem", displayName: "手风琴项", category: "basic", description: "shadcn AccordionItem，props: value", type: "static", acceptsChildren: true, component: AccordionItemAdapter },
  { name: "AccordionTrigger", displayName: "手风琴触发器", category: "basic", description: "shadcn AccordionTrigger，props: text", type: "static", acceptsChildren: true, component: AccordionTriggerAdapter },
  { name: "AccordionContent", displayName: "手风琴内容", category: "basic", description: "shadcn AccordionContent", type: "static", acceptsChildren: true, component: AccordionContentAdapter },

  // --- shadcn/ui: Table ---
  { name: "Table", displayName: "表格", category: "basic", description: "shadcn Table", type: "static", acceptsChildren: true, component: TableAdapter },
  { name: "TableHeader", displayName: "表头", category: "basic", description: "shadcn TableHeader", type: "static", acceptsChildren: true, component: TableHeaderAdapter },
  { name: "TableBody", displayName: "表体", category: "basic", description: "shadcn TableBody", type: "static", acceptsChildren: true, component: TableBodyAdapter },
  { name: "TableRow", displayName: "表格行", category: "basic", description: "shadcn TableRow", type: "static", acceptsChildren: true, component: TableRowAdapter },
  { name: "TableHead", displayName: "表头单元格", category: "basic", description: "shadcn TableHead，props: text", type: "static", acceptsChildren: true, component: TableHeadAdapter },
  { name: "TableCell", displayName: "表格单元格", category: "basic", description: "shadcn TableCell，props: text", type: "static", acceptsChildren: true, component: TableCellAdapter },

  // --- 布局组件 ---
  { name: "Container", displayName: "容器", category: "layout", description: "通用容器，props: maxWidth, padding, centered", type: "static", acceptsChildren: true, component: Container },
  { name: "Grid", displayName: "网格布局", category: "layout", description: "CSS Grid 布局，props: columns, gap", type: "static", acceptsChildren: true, component: Grid },
  { name: "Flex", displayName: "弹性布局", category: "layout", description: "Flexbox 布局，props: direction, gap, align, justify, wrap", type: "static", acceptsChildren: true, component: Flex },
  { name: "Stack", displayName: "堆叠布局", category: "layout", description: "垂直/水平堆叠，props: gap, direction(column|row)", type: "static", acceptsChildren: true, component: Stack },
  { name: "Section", displayName: "区块容器", category: "layout", description: "区块容器（shadcn Card），props: title, subtitle", type: "static", acceptsChildren: true, component: Section },

  // --- 业务组件 ---
  { name: "ProductGrid", displayName: "商品网格", category: "business", description: "商品网格展示，自动从 dataBinding 获取商品数据，props: columns(默认3)", type: "dynamic", acceptsChildren: false, component: ProductGrid },
  { name: "CompanyProfile", displayName: "公司简介", category: "business", description: "公司简介卡片，自动从 dataBinding 获取公司数据", type: "dynamic", acceptsChildren: false, component: CompanyProfile },
  { name: "ProductCarousel", displayName: "商品轮播", category: "business", description: "商品轮播组件（占位）", type: "dynamic", acceptsChildren: false, component: ProductCarousel },
  { name: "CategoryGrid", displayName: "分类网格", category: "business", description: "分类网格组件（占位）", type: "dynamic", acceptsChildren: false, component: CategoryGrid },
  { name: "CertShowcase", displayName: "资质展示", category: "business", description: "资质认证展示组件（占位）", type: "dynamic", acceptsChildren: false, component: CertShowcase },

  // --- 数据组件 ---
  { name: "DataProvider", displayName: "数据提供者", category: "data", description: "通过 dataBinding 获取数据，通过 Context 传递给子 DataItem", type: "dynamic", acceptsChildren: true, childTypes: ["DataItem"], component: DataProvider },
  { name: "DataItem", displayName: "数据项", category: "data", description: "从 DataProvider Context 取数据，为每条数据渲染 children", type: "dynamic", acceptsChildren: true, component: DataItem },
];

// 批量注册
allComponents.forEach((c) => registerComponent(c));
