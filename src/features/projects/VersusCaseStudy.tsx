import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { VERSUS, type VersusScope } from "@/content/versus";
import { L, T } from "@/i18n/T";
import type { MessageKey } from "@/i18n/translate";

const SCOPE_LABEL: Record<VersusScope, MessageKey> = {
  implemented: "projects.implemented",
  inDevelopment: "projects.inProgress",
  planned: "projects.planned",
};

const SCOPE_TONE: Record<VersusScope, "accent" | "warning" | "neutral"> = {
  implemented: "accent",
  inDevelopment: "warning",
  planned: "neutral",
};

const LABEL = "text-subtle font-mono text-xs";

export function VersusCaseStudy() {
  return (
    <article
      id="versus"
      className="border-border bg-surface scroll-mt-20 space-y-8 rounded-md border p-5 sm:p-6"
    >
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="font-mono text-lg font-semibold">{VERSUS.name}</h2>
        <Badge tone="warning">
          <T k="projects.inProgress" />
        </Badge>
        <span className="text-subtle font-mono text-xs">
          <T k="projects.category.personal" />
        </span>
      </header>

      <p className="text-muted text-lg">
        <L text={VERSUS.summary} />
      </p>

      <div>
        <h3 className={`${LABEL} mb-2`}>
          <T k="projects.problem" />
        </h3>
        <p className="text-muted max-w-3xl">
          <L text={VERSUS.problem} />
        </p>
      </div>

      <div>
        <h3 className={`${LABEL} mb-2`}>
          <T k="projects.architecture" />
        </h3>
        <p className="text-muted max-w-3xl">
          <L text={VERSUS.architecture} />
        </p>
      </div>

      <div>
        <h3 className={`${LABEL} mb-2`}>
          <T k="projects.stack" />
        </h3>
        <ul className="flex flex-wrap gap-2">
          {VERSUS.technologies.map((technology) => (
            <li key={technology}>
              <Badge>{technology}</Badge>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className={`${LABEL} mb-3`}>
          <T k="projects.domain" />
        </h3>
        <ul className="flex flex-wrap gap-2">
          {VERSUS.concepts.map((concept) => (
            <li key={concept.name} className="border-border rounded-md border px-2 py-1">
              <span className="font-mono text-sm">{concept.name}</span>
              <span className="ml-2">
                <Badge tone={SCOPE_TONE[concept.status]}>
                  <T k={SCOPE_LABEL[concept.status]} />
                </Badge>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ScopeList titleKey="projects.implemented" items={VERSUS.implemented} />
      <ScopeList titleKey="projects.inProgress" items={VERSUS.inDevelopment} />
      <ScopeList titleKey="projects.planned" items={VERSUS.planned} />

      <div>
        <h3 className={`${LABEL} mb-2`}>
          <T k="projects.repository" />
        </h3>
        {VERSUS.repos.length > 0 ? (
          <ul className="flex flex-wrap gap-4 font-mono text-sm">
            {VERSUS.repos.map((repo) => (
              <li key={repo.href}>
                <ExternalLink href={repo.href}>
                  <L text={repo.label} />
                </ExternalLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted text-sm">
            <T k="projects.noRepo" />
          </p>
        )}
        <p className="text-subtle mt-3 text-sm">
          <T k="projects.noDemo" />
        </p>
      </div>
    </article>
  );
}

function ScopeList({
  titleKey,
  items,
}: {
  titleKey: MessageKey;
  items: readonly { en: string; "pt-BR": string }[];
}) {
  return (
    <div>
      <h3 className={`${LABEL} mb-2`}>
        <T k={titleKey} />
      </h3>
      <ul className="text-muted marker:text-accent list-disc space-y-1.5 pl-5">
        {items.map((item) => (
          <li key={item.en}>
            <L text={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
