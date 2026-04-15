import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SchemaNode, ThemeColors } from "../../schema";
import { Product } from "../../data/mock-data";
import { ReactNode } from "react";

export function ProductGrid({
  node,
}: {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
}) {
  const props = node.props || {};
  const columns = (props.columns as number) || 3;

  let products: Product[] = [];
  const resolved = props._resolvedData || props._item;
  if (Array.isArray(resolved)) {
    products = resolved as Product[];
  }

  if (products.length === 0) {
    return (
      <div className="text-muted-foreground text-sm p-5 text-center">
        暂无商品数据
      </div>
    );
  }

  return (
    <div
      className={cn("grid gap-5", node.className)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {products.map((product, i) => (
        <Card key={product.id || i} className="overflow-hidden">
          <div className="w-full h-40 bg-primary/5 flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.innerHTML =
                  '<span style="font-size:40px">📦</span>';
              }}
            />
          </div>
          <CardContent className="p-3">
            <div className="text-sm font-semibold text-foreground mb-1">
              {product.name}
            </div>
            <div className="text-xs text-muted-foreground mb-2 leading-snug">
              {product.description}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                ¥{product.price}
              </span>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
