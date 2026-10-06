import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "icon";

interface ButtonStyleOptions {
  variant?: Variant;
  size?: Size;
}

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md font-mono text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:opacity-90",
  secondary: "border border-border bg-surface text-fg hover:bg-raised",
  ghost: "text-muted hover:bg-raised hover:text-fg",
};

const SIZES: Record<Size, string> = {
  md: "h-10 px-4",
  icon: "size-10",
};

/** Exported so links (`next/link`) can look like buttons without a polymorphic component. */
export function buttonStyles({
  variant = "secondary",
  size = "md",
}: ButtonStyleOptions = {}) {
  return cn(BASE, VARIANTS[variant], SIZES[size]);
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleOptions {}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    />
  );
}
