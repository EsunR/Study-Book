"use client";

import { createContext, useContext, ReactNode } from "react";
import { ThemeColors } from "../schema";
import { hexToRgba, shiftColor } from "./color-utils";

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

export function ThemeProvider({
  theme,
  children,
}: {
  theme: ThemeColors;
  children: ReactNode;
}) {
  const primary = theme.primary;
  const secondary = theme.secondary || shiftColor(primary, 30);
  const accent = theme.accent || shiftColor(primary, -30);

  const value: ThemeContextValue = {
    ...theme,
    hexToRgba,
    shiftColor,
  };

  // 设置 shadcn CSS 变量（scope 到此容器内）
  const cssVars: Record<string, string> = {
    "--primary": primary,
    "--primary-foreground": "#ffffff",
    "--secondary": secondary,
    "--secondary-foreground": "#171717",
    "--accent": accent,
    "--accent-foreground": "#171717",
    "--background": theme.background || "#ffffff",
    "--foreground": theme.textPrimary || "#171717",
    "--card": theme.surface || "#f9f9f9",
    "--card-foreground": theme.textPrimary || "#171717",
    "--muted": theme.surface || "#f5f5f5",
    "--muted-foreground": theme.textSecondary || "rgba(0,0,0,0.6)",
    "--border": "rgba(0,0,0,0.1)",
    "--ring": primary,
    // 低代码专用变量（兼容）
    "--lc-primary": primary,
    "--lc-secondary": secondary,
    "--lc-accent": accent,
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
