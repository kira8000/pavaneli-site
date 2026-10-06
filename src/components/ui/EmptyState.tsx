import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
}: {
  title: ReactNode;
  description: ReactNode;
}) {
  return (
    <div className="border-border rounded-md border border-dashed px-6 py-10 text-center">
      <p className="font-mono text-sm font-semibold">{title}</p>
      <p className="text-muted mt-2 text-sm">{description}</p>
    </div>
  );
}
