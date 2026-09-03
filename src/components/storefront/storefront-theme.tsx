import type { CSSProperties, ReactNode } from "react";
import type { StorefrontThemeConfig } from "@/config/storefront";

export function StorefrontTheme({
  children,
  theme,
}: {
  children: ReactNode;
  theme: StorefrontThemeConfig;
}) {
  const style = {
    "--shop-background": theme.colors.background,
    "--shop-surface": theme.colors.surface,
    "--shop-soft": theme.colors.soft,
    "--shop-ink": theme.colors.ink,
    "--shop-muted": theme.colors.muted,
    "--shop-line": theme.colors.line,
    "--shop-accent": theme.colors.accent,
    "--shop-product-mist": theme.colors.productMist,
    "--shop-product-accent": theme.colors.productAccent,
    "--shop-product-stone": theme.colors.productStone,
  } as CSSProperties;
  return <div style={style}>{children}</div>;
}
