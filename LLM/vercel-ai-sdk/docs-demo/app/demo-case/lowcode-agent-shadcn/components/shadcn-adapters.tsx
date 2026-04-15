"use client";

// 所有 shadcn/ui 组件的 SchemaNode 适配器
// 每个 adapter 函数接收 { node, theme, children }，渲染对应的 shadcn 组件

import type { SchemaNode, ThemeColors } from "../schema";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// --- shadcn/ui 组件导入 ---
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter, CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";

// ============================================================
// 通用类型
// ============================================================

type AdapterProps = {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
};

/** 从 node.props 安全取值 */
function p(node: SchemaNode, key: string, fallback: unknown = undefined): unknown {
  return (node.props || {})[key] ?? fallback;
}

// ============================================================
// 基础 UI — 无 shadcn 对应，用 Tailwind 实现
// ============================================================

/** Heading: h1-h6 */
export function Heading({ node }: AdapterProps) {
  const level = Math.min(Math.max((p(node, "level", 1) as number), 1), 6) as 1|2|3|4|5|6;
  const text = (p(node, "text", "") as string);
  const Tag = `h${level}` as const;
  const sizes: Record<number, string> = {
    1: "text-3xl font-extrabold", 2: "text-2xl font-bold",
    3: "text-xl font-bold", 4: "text-lg font-semibold",
    5: "text-base font-semibold", 6: "text-sm font-semibold",
  };
  return <Tag className={cn(sizes[level], "text-foreground m-0", node.className)}>{text}</Tag>;
}

/** Text: 段落 / 行内文本 */
export function Text({ node, children }: AdapterProps) {
  const text = (p(node, "text", "") as string);
  const inline = p(node, "inline") as boolean | undefined;
  const cls = cn("text-sm leading-relaxed text-muted-foreground m-0", node.className);
  const content = text || children;
  return inline ? <span className={cls}>{content}</span> : <p className={cls}>{content}</p>;
}

/** Image: 图片 */
export function Image({ node }: AdapterProps) {
  const src = (p(node, "src", "") as string);
  const alt = (p(node, "alt", "") as string);
  const width = p(node, "width") as string | number | undefined;
  const height = p(node, "height") as string | number | undefined;
  return (
    <img
      className={cn("max-w-full h-auto block", node.className)}
      src={src} alt={alt}
      style={{ ...(width ? { width } : {}), ...(height ? { height } : {}) }}
    />
  );
}

/** Icon: 图标（emoji 或 lucide icon name） */
export function Icon({ node }: AdapterProps) {
  const name = (p(node, "name", "📦") as string);
  const size = (p(node, "size", 24) as number);
  return (
    <span className={cn("inline-flex items-center justify-center leading-none", node.className)}
      style={{ fontSize: size, width: size, height: size }}>
      {name}
    </span>
  );
}

// ============================================================
// shadcn/ui 组件适配器
// ============================================================

/** Button */
export function ButtonAdapter({ node }: AdapterProps) {
  const label = (p(node, "label", "按钮") as string);
  const href = p(node, "href") as string | undefined;
  const variantMap: Record<string, "default" | "outline" | "ghost" | "link" | "destructive" | "secondary"> = {
    filled: "default", outlined: "outline", ghost: "ghost", link: "link",
    destructive: "destructive", secondary: "secondary",
  };
  const variant = variantMap[(p(node, "variant", "filled") as string)] || "default";
  const sizeMap: Record<string, "default" | "sm" | "lg" | "icon"> = {
    default: "default", sm: "sm", lg: "lg", icon: "icon",
  };
  const size = sizeMap[(p(node, "size", "default") as string)] || "default";

  if (href) {
    return (
      <Button variant={variant} size={size} className={cn(node.className)}
        render={<a href={href} target={p(node, "target", "_self") as string} rel="noopener noreferrer" />}>
        {label}
      </Button>
    );
  }
  return <Button variant={variant} size={size} className={cn(node.className)}>{label}</Button>;
}

/** Badge */
export function BadgeAdapter({ node, children }: AdapterProps) {
  const text = (p(node, "text", "") as string);
  const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline" | "ghost"> = {
    default: "default", success: "secondary", warning: "outline",
    danger: "destructive", ghost: "ghost",
  };
  const variant = variantMap[(p(node, "variant", "default") as string)] || "default";
  return <Badge variant={variant} className={cn(node.className)}>{text || children}</Badge>;
}

/** Avatar */
export function AvatarAdapter({ node }: AdapterProps) {
  const name = (p(node, "name", "") as string);
  const src = p(node, "src") as string | undefined;
  const size = (p(node, "size", 40) as number);
  const avatarSize: "sm" | "default" | "lg" = size <= 24 ? "sm" : size <= 40 ? "default" : "lg";
  return (
    <Avatar size={avatarSize} className={cn(node.className)} style={{ width: size, height: size }}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback>{name ? name.charAt(0).toUpperCase() : "?"}</AvatarFallback>
    </Avatar>
  );
}

/** Separator */
export function SeparatorAdapter({ node }: AdapterProps) {
  const orientation = (p(node, "orientation", "horizontal") as "horizontal" | "vertical");
  return <Separator orientation={orientation} className={cn("my-4", node.className)} />;
}

/** Input */
export function InputAdapter({ node }: AdapterProps) {
  const placeholder = (p(node, "placeholder", "") as string);
  const type = (p(node, "type", "text") as string);
  const disabled = p(node, "disabled") as boolean | undefined;
  return (
    <Input placeholder={placeholder} type={type} disabled={disabled}
      className={cn(node.className)} />
  );
}

/** Textarea */
export function TextareaAdapter({ node }: AdapterProps) {
  const placeholder = (p(node, "placeholder", "") as string);
  const rows = (p(node, "rows", 3) as number);
  const disabled = p(node, "disabled") as boolean | undefined;
  return (
    <Textarea placeholder={placeholder} rows={rows} disabled={disabled}
      className={cn(node.className)} />
  );
}

/** Card */
export function CardAdapter({ node, children }: AdapterProps) {
  return <Card className={cn(node.className)}>{children}</Card>;
}
export function CardHeaderAdapter({ node, children }: AdapterProps) {
  return <CardHeader className={cn(node.className)}>{children}</CardHeader>;
}
export function CardTitleAdapter({ node, children }: AdapterProps) {
  const text = (p(node, "text", "") as string);
  return <CardTitle className={cn(node.className)}>{text || children}</CardTitle>;
}
export function CardDescriptionAdapter({ node, children }: AdapterProps) {
  const text = (p(node, "text", "") as string);
  return <CardDescription className={cn(node.className)}>{text || children}</CardDescription>;
}
export function CardContentAdapter({ node, children }: AdapterProps) {
  return <CardContent className={cn(node.className)}>{children}</CardContent>;
}
export function CardFooterAdapter({ node, children }: AdapterProps) {
  return <CardFooter className={cn(node.className)}>{children}</CardFooter>;
}
export function CardActionAdapter({ node, children }: AdapterProps) {
  return <CardAction className={cn(node.className)}>{children}</CardAction>;
}

/** Alert */
export function AlertAdapter({ node, children }: AdapterProps) {
  const variant = p(node, "variant") as "default" | "destructive" | undefined;
  return <Alert variant={variant} className={cn(node.className)}>{children}</Alert>;
}
export function AlertTitleAdapter({ node, children }: AdapterProps) {
  const text = (p(node, "text", "") as string);
  return <AlertTitle className={cn(node.className)}>{text || children}</AlertTitle>;
}
export function AlertDescriptionAdapter({ node, children }: AdapterProps) {
  const text = (p(node, "text", "") as string);
  return <AlertDescription className={cn(node.className)}>{text || children}</AlertDescription>;
}

/** Progress */
export function ProgressAdapter({ node }: AdapterProps) {
  const value = (p(node, "value", 0) as number);
  return <Progress value={value} className={cn(node.className)} />;
}

/** Skeleton */
export function SkeletonAdapter({ node }: AdapterProps) {
  return <Skeleton className={cn("h-4 w-full", node.className)} />;
}

/** Tooltip */
export function TooltipAdapter({ node, children }: AdapterProps) {
  const content = (p(node, "content", "") as string);
  return (
    <Tooltip>
      <TooltipTrigger className={cn(node.className)}>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}

/** Tabs */
export function TabsAdapter({ node, children }: AdapterProps) {
  const defaultValue = (p(node, "defaultValue", "") as string);
  return <Tabs defaultValue={defaultValue || undefined} className={cn(node.className)}>{children}</Tabs>;
}
export function TabsListAdapter({ node, children }: AdapterProps) {
  return <TabsList className={cn(node.className)}>{children}</TabsList>;
}
export function TabsTriggerAdapter({ node }: AdapterProps) {
  const value = (p(node, "value", "") as string);
  const text = (p(node, "text", value) as string);
  return <TabsTrigger value={value} className={cn(node.className)}>{text}</TabsTrigger>;
}
export function TabsContentAdapter({ node, children }: AdapterProps) {
  const value = (p(node, "value", "") as string);
  return <TabsContent value={value} className={cn(node.className)}>{children}</TabsContent>;
}

/** Accordion */
export function AccordionAdapter({ node, children }: AdapterProps) {
  return <Accordion className={cn(node.className)}>{children}</Accordion>;
}
export function AccordionItemAdapter({ node, children }: AdapterProps) {
  const value = (p(node, "value", "item") as string);
  return <AccordionItem value={value} className={cn(node.className)}>{children}</AccordionItem>;
}
export function AccordionTriggerAdapter({ node, children }: AdapterProps) {
  const text = (p(node, "text", "") as string);
  return <AccordionTrigger className={cn(node.className)}>{text || children}</AccordionTrigger>;
}
export function AccordionContentAdapter({ node, children }: AdapterProps) {
  return <AccordionContent className={cn(node.className)}>{children}</AccordionContent>;
}

/** Table */
export function TableAdapter({ node, children }: AdapterProps) {
  return <Table className={cn(node.className)}>{children}</Table>;
}
export function TableHeaderAdapter({ node, children }: AdapterProps) {
  return <TableHeader className={cn(node.className)}>{children}</TableHeader>;
}
export function TableBodyAdapter({ node, children }: AdapterProps) {
  return <TableBody className={cn(node.className)}>{children}</TableBody>;
}
export function TableRowAdapter({ node, children }: AdapterProps) {
  return <TableRow className={cn(node.className)}>{children}</TableRow>;
}
export function TableHeadAdapter({ node, children }: AdapterProps) {
  const text = (p(node, "text", "") as string);
  return <TableHead className={cn(node.className)}>{text || children}</TableHead>;
}
export function TableCellAdapter({ node, children }: AdapterProps) {
  const text = (p(node, "text", "") as string);
  return <TableCell className={cn(node.className)}>{text || children}</TableCell>;
}
