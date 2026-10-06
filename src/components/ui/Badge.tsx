import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "accent" | "warning" | "danger";
type Tone = BadgeTone;

const TONES: Record<Tone, string> = {
  neutral: "border-border text-muted",
  accent: "border-accent/40 text-accent",
  warning: "border-warning/40 text-warning",
  danger: "border-danger/40 text-danger",
};

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-1 font-mono text-xs leading-none whitespace-nowrap",
        TONES[tone],
      )}
    >
      {children}
    </span>
  );
}
