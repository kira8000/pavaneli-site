import { cn } from "@/lib/cn";

/** Decorative placeholder; the surrounding region announces the loading state. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("bg-raised h-4 animate-pulse rounded", className)} />
  );
}
