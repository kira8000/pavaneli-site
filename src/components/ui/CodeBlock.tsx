import { T } from "@/i18n/T";
import type { CodeSnippet } from "@/content/code-snippets";
import { Badge } from "./Badge";

/** Plain, dependency-free code display. `tabIndex` lets keyboard users scroll long lines. */
export function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  return (
    <figure className="border-border bg-surface min-w-0 overflow-hidden rounded-md border">
      <figcaption className="border-border text-subtle flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2 font-mono text-xs">
        <span>{snippet.fileName}</span>
        <Badge tone={snippet.origin === "repository" ? "accent" : "neutral"}>
          <T
            k={
              snippet.origin === "repository"
                ? "engineering.origin.repository"
                : "engineering.origin.illustrative"
            }
          />
        </Badge>
      </figcaption>
      <pre
        tabIndex={0}
        className="text-fg overflow-x-auto p-4 font-mono text-sm leading-relaxed"
      >
        <code>{snippet.source}</code>
      </pre>
    </figure>
  );
}
