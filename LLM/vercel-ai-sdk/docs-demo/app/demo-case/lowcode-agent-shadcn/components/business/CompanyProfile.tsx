import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { SchemaNode, ThemeColors } from "../../schema";
import { Company } from "../../data/mock-data";
import { ReactNode } from "react";

export function CompanyProfile({
  node,
}: {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
}) {
  const props = node.props || {};

  let company: Company | null = null;
  const resolved = props._resolvedData || props._item;
  if (resolved && typeof resolved === "object" && "name" in (resolved as object)) {
    company = resolved as Company;
  }

  if (!company) {
    return (
      <div className="text-muted-foreground text-sm p-5 text-center">
        暂无公司数据
      </div>
    );
  }

  return (
    <Card className={cn(node.className)}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            {company.logo && <AvatarImage src={company.logo} alt={company.name} />}
            <AvatarFallback className="text-2xl bg-primary/10">
              {company.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{company.name}</CardTitle>
            <CardDescription>{company.slogan}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground mb-5">
          {company.description}
        </p>

        <div className="flex gap-4 mb-5 flex-wrap">
          <Badge variant="outline">成立于 {company.founded}</Badge>
          <Badge variant="outline">员工 {company.employees}</Badge>
          <Badge variant="outline">{company.location}</Badge>
        </div>

        {company.stats && company.stats.length > 0 && (
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${Math.min(company.stats.length, 4)}, 1fr)` }}
          >
            {company.stats.map((stat, i) => (
              <div key={i} className="text-center p-3 bg-primary/5 rounded-lg">
                <div className="text-xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
