import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SchemaNode, ThemeColors } from "../../schema";
import type { ReactNode } from "react";

export function Section({
  node,
  children,
}: {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
}) {
  const props = node.props || {};
  const title = props.title as string | undefined;
  const subtitle = props.subtitle as string | undefined;

  if (title || subtitle) {
    return (
      <section className={cn("mb-8", node.className)}>
        <Card>
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className={cn("mb-8", node.className)}>
      {children}
    </section>
  );
}
