"use client";

import { ThemeColors } from "../schema";
import { hexToRgba, shiftColor } from "./color-utils";

/** 解析页面级样式上下文（从 ThemeColors 生成）*/
export function usePageContext(theme?: ThemeColors) {
  const primary = theme?.primary || "var(--primary)";
  const isDark =
    theme?.background === "#1a1a2e" ||
    theme?.background === "#0a0a0a" ||
    theme?.background === "#1a1a1a";

  const bgColor = theme?.background || "var(--background)";
  const textColor = theme?.textPrimary || (isDark ? "#ededed" : "var(--foreground)");
  const subTextColor =
    theme?.textSecondary || (isDark ? "rgba(255,255,255,0.6)" : "var(--muted-foreground)");
  const cardBg = theme?.surface || (isDark ? "#252540" : "var(--card)");
  const borderColor = isDark ? "#333" : "var(--border)";

  return {
    isDark,
    primaryColor: primary,
    bgColor,
    textColor,
    subTextColor,
    cardBg,
    borderColor,
  };
}

export type PageContext = ReturnType<typeof usePageContext>;

export { hexToRgba, shiftColor };
