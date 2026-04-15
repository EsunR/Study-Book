"use client";

import { SchemaNode, ThemeColors } from "../../schema";
import { resolveDataSource } from "../../data/data-source-resolver";
import { createContext, useContext, ReactNode } from "react";

const DataContext = createContext<unknown[]>([]);

export function useDataContext() {
  return useContext(DataContext);
}

export function DataProvider({
  node,
  theme,
  children,
}: {
  node: SchemaNode;
  theme: ThemeColors;
  children?: ReactNode;
}) {
  const dataBinding = node.dataBinding;
  let data: unknown[] = [];

  if (dataBinding) {
    try {
      const resolved = resolveDataSource(
        dataBinding.source,
        dataBinding.params
      );
      data = Array.isArray(resolved) ? resolved : [resolved];
    } catch {
      data = [];
    }
  }

  // 也可从 props._resolvedData 读取（SchemaNodeRenderer 预解析）
  if (data.length === 0 && node.props?._resolvedData) {
    const rd = node.props._resolvedData;
    data = Array.isArray(rd) ? rd : [rd];
  }

  return (
    <DataContext.Provider value={data}>
      <div className={node.className}>{children}</div>
    </DataContext.Provider>
  );
}
