import type { Metadata } from "next";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { PLAYGROUND_API_TEST } from "@/content/code-snippets";
import { PROFILE } from "@/content/profile";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Playground } from "@/features/playground/Playground";
import { T } from "@/i18n/T";
import type { MessageKey } from "@/i18n/translate";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Interactive Engineering Demo",
  description:
    "Interactive engineering demo by Guilherme Pavaneli: CRUD, search, filters, validation and simulated API states on an in-memory backend. Not PostgreSQL.",
  path: "/playground",
});

const PLAYGROUND_SOURCE = `${PROFILE.links.github}/pavaneli-site/tree/main/src/features/playground`;

const CAPABILITY_KEYS = [
  "playground.capabilities.crud",
  "playground.capabilities.search",
  "playground.capabilities.filtering",
  "playground.capabilities.sorting",
  "playground.capabilities.pagination",
  "playground.capabilities.validation",
  "playground.capabilities.loading",
  "playground.capabilities.error",
  "playground.capabilities.dialogs",
  "playground.capabilities.notifications",
  "playground.capabilities.api",
] as const satisfies readonly MessageKey[];

export default function PlaygroundPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title={<T k="playground.title" />}
        description={<T k="playground.description" />}
      />
      <div>
        <h2 className="text-subtle font-mono text-xs">
          <T k="playground.capabilitiesLabel" />
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {CAPABILITY_KEYS.map((key) => (
            <li
              key={key}
              className="border-border text-muted rounded-md border px-2 py-1 font-mono text-xs"
            >
              <T k={key} />
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-sm">
          <ExternalLink href={PLAYGROUND_SOURCE}>
            <T k="playground.source" />
          </ExternalLink>
        </p>
      </div>
      <Playground />
      <CodeBlock snippet={PLAYGROUND_API_TEST} />
    </div>
  );
}
