import type { ReactNode } from "react";

export function ErrorState({
  title,
  description,
  action,
}: {
  title: ReactNode;
  description: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div
      role="alert"
      className="border-danger/50 rounded-md border border-dashed px-6 py-10 text-center"
    >
      <p className="text-danger font-mono text-sm font-semibold">{title}</p>
      <p className="text-muted mt-2 text-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
