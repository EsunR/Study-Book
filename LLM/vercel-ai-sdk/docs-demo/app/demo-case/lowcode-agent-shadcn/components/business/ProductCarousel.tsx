import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SchemaNode, ThemeColors } from "../../schema";
import { ReactNode } from "react";

export function ProductCarousel({
  node,
}: {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
}) {
  return (
    <Card className={cn("border-dashed border-primary/40", node.className)}>
      <CardContent className="p-5 text-center text-muted-foreground text-sm">
        ProductCarousel（待实现）
      </CardContent>
    </Card>
  );
}
