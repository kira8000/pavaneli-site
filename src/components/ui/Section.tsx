import type { ReactNode } from "react";

interface SectionProps {
  /** Used to build the heading id that names the landmark. */
  id: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export function Section({ id, title, description, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section aria-labelledby={headingId} className="border-border border-t pt-10">
      <h2 id={headingId} className="font-mono text-xl font-semibold">
        <span aria-hidden className="text-accent mr-2">
          #
        </span>
        {title}
      </h2>
      {description && <p className="text-muted mt-3 max-w-2xl">{description}</p>}
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}
