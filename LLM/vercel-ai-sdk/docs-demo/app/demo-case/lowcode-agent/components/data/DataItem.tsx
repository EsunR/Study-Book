"use client";

import { SchemaNode, ThemeColors } from "../../schema";
import { useDataContext } from "./DataProvider";
import { SchemaNodeRenderer } from "../SchemaNodeRenderer";
import { ReactNode } from "react";

export function DataItem({
  node,
  theme,
}: {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
}) {
  const data = useDataContext();

  if (!data || data.length === 0) {
    return (
      <div style={{ color: "#999", fontSize: 12, padding: 8 }}>
        暂无数据
      </div>
    );
  }

  return (
    <div className={node.className}>
      {data.map((item, index) => {
        // 将数据项注入每个子节点的 props
        const childrenWithItem = node.children?.map((child, ci) => (
          <SchemaNodeRenderer
            key={`${child.type}-${ci}-${index}`}
            node={{
              ...child,
              props: { ...child.props, _item: item, _index: index },
            }}
            theme={theme}
          />
        ));

        return <div key={index}>{childrenWithItem}</div>;
      })}
    </div>
  );
}
