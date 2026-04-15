"use client";

import { createContext, useContext, ReactNode } from "react";
import { ThemeColors } from "../schema";

interface ThemeContextValue extends ThemeColors {
  hexToRgba: (hex: string, alpha: number) => string;
  shiftColor: (hex: string, amount: number) => string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

/** 安全地将 hex 转为 rgba */
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** 将 hex 颜色变亮或变暗 */
function shiftColor(hex: string, amount: number): string {
  const h = hex.replace("#", "");
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp(parseInt(h.substring(0, 2), 16) + amount);
  const g = clamp(parseInt(h.substring(2, 4), 16) + amount);
  const b = clamp(parseInt(h.substring(4, 6), 16) + amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function ThemeProvider({
  theme,
  children,
}: {
  theme: ThemeColors;
  children: ReactNode;
}) {
  const value: ThemeContextValue = {
    ...theme,
    hexToRgba,
    shiftColor,
  };

  // 设置 CSS 自定义属性
  const cssVars: Record<string, string> = {
    "--lc-primary": theme.primary,
    "--lc-secondary": theme.secondary || shiftColor(theme.primary, 30),
    "--lc-accent": theme.accent || shiftColor(theme.primary, -30),
    "--lc-background": theme.background || "#ffffff",
    "--lc-surface": theme.surface || "#f9f9f9",
    "--lc-text-primary": theme.textPrimary || "#171717",
    "--lc-text-secondary": theme.textSecondary || "rgba(0,0,0,0.6)",
  };

  return (
    <ThemeContext.Provider value={value}>
      <div style={cssVars as React.CSSProperties}>{children}</div>
    </ThemeContext.Provider>
  );
}

// 兼容旧接口
export { hexToRgba, shiftColor };
