"use client";

// 此模块负责导入并注册所有组件
// 必须在客户端入口（LowCodeRenderer）中引用

import { registerComponent } from "./registry";

// --- 基础组件 ---
import { Heading } from "./basic/Heading";
import { Text } from "./basic/Text";
import { Button } from "./basic/Button";
import { Image } from "./basic/Image";
import { Badge } from "./basic/Badge";
import { Separator } from "./basic/Separator";
import { Icon } from "./basic/Icon";
import { Link } from "./basic/Link";
import { Avatar } from "./basic/Avatar";

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

// 执行注册
registerComponent({
  name: "Heading",
  displayName: "标题",
  category: "basic",
  description: "标题 h1-h6，props: level(1-6), text",
  type: "static",
  acceptsChildren: false,
  component: Heading,
});

registerComponent({
  name: "Text",
  displayName: "文本",
  category: "basic",
  description: "段落/行内文本，props: text, inline(true=span, false=p)",
  type: "static",
  acceptsChildren: false,
  component: Text,
});

registerComponent({
  name: "Button",
  displayName: "按钮",
  category: "basic",
  description: "按钮/链接，props: label, href, variant(filled|outlined|ghost)",
  type: "static",
  acceptsChildren: false,
  component: Button,
});

registerComponent({
  name: "Image",
  displayName: "图片",
  category: "basic",
  description: "图片，props: src, alt, width, height",
  type: "static",
  acceptsChildren: false,
  component: Image,
});

registerComponent({
  name: "Badge",
  displayName: "标签",
  category: "basic",
  description: "标签/徽章，props: text, variant(default|success|warning|danger)",
  type: "static",
  acceptsChildren: false,
  component: Badge,
});

registerComponent({
  name: "Separator",
  displayName: "分隔线",
  category: "basic",
  description: "水平分隔线",
  type: "static",
  acceptsChildren: false,
  component: Separator,
});

registerComponent({
  name: "Icon",
  displayName: "图标",
  category: "basic",
  description: "图标（emoji），props: name, size",
  type: "static",
  acceptsChildren: false,
  component: Icon,
});

registerComponent({
  name: "Link",
  displayName: "链接",
  category: "basic",
  description: "超链接，props: href, text, target(_self|_blank)",
  type: "static",
  acceptsChildren: false,
  component: Link,
});

registerComponent({
  name: "Avatar",
  displayName: "头像",
  category: "basic",
  description: "圆形头像/首字母，props: name, src, size",
  type: "static",
  acceptsChildren: false,
  component: Avatar,
});

registerComponent({
  name: "Container",
  displayName: "容器",
  category: "layout",
  description: "通用容器，支持 maxWidth/padding/centered",
  type: "static",
  acceptsChildren: true,
  component: Container,
});

registerComponent({
  name: "Grid",
  displayName: "网格布局",
  category: "layout",
  description: "CSS Grid 布局，props: columns(列数), gap(间距)",
  type: "static",
  acceptsChildren: true,
  component: Grid,
});

registerComponent({
  name: "Flex",
  displayName: "弹性布局",
  category: "layout",
  description: "Flexbox 布局，props: direction, gap, align, justify, wrap",
  type: "static",
  acceptsChildren: true,
  component: Flex,
});

registerComponent({
  name: "Stack",
  displayName: "堆叠布局",
  category: "layout",
  description: "垂直/水平堆叠，props: gap, direction(column|row)",
  type: "static",
  acceptsChildren: true,
  component: Stack,
});

registerComponent({
  name: "Section",
  displayName: "区块容器",
  category: "layout",
  description: "区块容器，带标题/副标题，props: title, subtitle",
  type: "static",
  acceptsChildren: true,
  component: Section,
});

registerComponent({
  name: "ProductGrid",
  displayName: "商品网格",
  category: "business",
  description: "商品网格展示，自动从 dataBinding 获取商品数据，props: columns(列数, 默认3)",
  type: "dynamic",
  acceptsChildren: false,
  component: ProductGrid,
});

registerComponent({
  name: "CompanyProfile",
  displayName: "公司简介",
  category: "business",
  description: "公司简介卡片，自动从 dataBinding 获取公司数据",
  type: "dynamic",
  acceptsChildren: false,
  component: CompanyProfile,
});

registerComponent({
  name: "ProductCarousel",
  displayName: "商品轮播",
  category: "business",
  description: "商品轮播组件（占位存根）",
  type: "dynamic",
  acceptsChildren: false,
  component: ProductCarousel,
});

registerComponent({
  name: "CategoryGrid",
  displayName: "分类网格",
  category: "business",
  description: "分类网格组件（占位存根）",
  type: "dynamic",
  acceptsChildren: false,
  component: CategoryGrid,
});

registerComponent({
  name: "CertShowcase",
  displayName: "资质展示",
  category: "business",
  description: "资质认证展示组件（占位存根）",
  type: "dynamic",
  acceptsChildren: false,
  component: CertShowcase,
});

registerComponent({
  name: "DataProvider",
  displayName: "数据提供者",
  category: "data",
  description: "通过 dataBinding 获取数据，通过 Context 传递给子 DataItem，需要设置 dataBinding.source",
  type: "dynamic",
  acceptsChildren: true,
  childTypes: ["DataItem"],
  component: DataProvider,
});

registerComponent({
  name: "DataItem",
  displayName: "数据项",
  category: "data",
  description: "从 DataProvider Context 取数据，为每条数据渲染 children。子组件可通过 props._item 访问当前数据项",
  type: "dynamic",
  acceptsChildren: true,
  component: DataItem,
});
