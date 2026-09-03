import type { CSSProperties } from "react";

type ProductVialProps = {
  className?: string;
  label: string;
  tone: "mist" | "accent" | "stone" | "surface";
};
const toneVariables = {
  mist: "var(--shop-product-mist)",
  accent: "var(--shop-product-accent)",
  stone: "var(--shop-product-stone)",
  surface: "var(--shop-surface)",
} as const;

export function ProductVial({ className = "", label, tone }: ProductVialProps) {
  return (
    <div
      className={`vial-art ${className}`}
      style={{ "--vial-tint": toneVariables[tone] } as CSSProperties}
    >
      <span className="vial-cap" />
      <span className="vial-glass" />
      <span className="vial-label">
        <b>MINO</b>
        <small>{label}</small>
      </span>
    </div>
  );
}
