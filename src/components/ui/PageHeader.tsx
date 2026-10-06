import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
}: {
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <header>
      <h1 className="font-mono text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description && <p className="text-muted mt-4 max-w-2xl text-lg">{description}</p>}
    </header>
  );
}
