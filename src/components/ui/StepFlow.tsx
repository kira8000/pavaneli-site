import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface StepFlowItem {
  key: string;
  label: ReactNode;
  accent?: boolean;
}

/** A left-to-right sequence (wraps on small screens) used for pipelines and layers. */
export function StepFlow({ items }: { items: readonly StepFlowItem[] }) {
  const lastIndex = items.length - 1;

  return (
    <ol className="flex flex-wrap items-center gap-x-1 gap-y-2 font-mono text-sm">
      {items.map((item, index) => (
        <li key={item.key} className="flex items-center gap-1">
          <span
            className={cn(
              "rounded border px-2 py-1",
              item.accent ? "border-accent/50 text-accent" : "border-border text-muted",
            )}
          >
            {item.label}
          </span>
          {index < lastIndex && (
            <ChevronRight aria-hidden className="text-subtle size-4" />
          )}
        </li>
      ))}
    </ol>
  );
}
