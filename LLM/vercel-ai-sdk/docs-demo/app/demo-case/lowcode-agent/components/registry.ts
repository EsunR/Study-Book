import type { SchemaNode, ThemeColors } from "../schema";
import type { ReactNode } from "react";

// --- 组件定义接口 ---

export type ComponentCategory = "basic" | "layout" | "business" | "data";
export type ComponentType = "static" | "dynamic";

export interface ComponentDefinition {
  name: string;
  displayName: string;
  category: ComponentCategory;
  description: string;
  type: ComponentType;
  acceptsChildren: boolean;
  childTypes?: string[];
  component: (props: {
    node: SchemaNode;
    theme: ThemeColors;
    children?: ReactNode;
  }) => ReactNode;
}

// --- 组件注册表 ---

const componentRegistry = new Map<string, ComponentDefinition>();

export function registerComponent(def: ComponentDefinition) {
  componentRegistry.set(def.name, def);
}

export function getComponent(name: string): ComponentDefinition | undefined {
  return componentRegistry.get(name);
}

export function getAllComponents(): ComponentDefinition[] {
  return Array.from(componentRegistry.values());
}
