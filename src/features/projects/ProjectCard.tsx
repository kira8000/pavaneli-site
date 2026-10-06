import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "@/components/ui/ExternalLink";
import type { PortfolioProject, ProjectCategory, ProjectStatus } from "@/content/types";
import { L, T } from "@/i18n/T";
import type { MessageKey } from "@/i18n/translate";

const STATUS: Record<
  ProjectStatus,
  { labelKey: MessageKey; tone: "warning" | "accent" }
> = {
  inProgress: { labelKey: "projects.inProgress", tone: "warning" },
  completed: { labelKey: "projects.completed", tone: "accent" },
};

const CATEGORY_LABEL: Record<ProjectCategory, MessageKey> = {
  professional: "projects.category.professional",
  personal: "projects.category.personal",
  openSource: "projects.category.openSource",
};

interface ProjectCardProps {
  project: PortfolioProject;
  /** Keeps heading levels sequential: h2 under the page title, h3 under a section. */
  headingLevel?: "h2" | "h3";
}

export function ProjectCard({ project, headingLevel: Heading = "h3" }: ProjectCardProps) {
  const { repository, demo } = project.links;
  const hasLinks = Boolean(repository || demo);

  return (
    <article className="border-border bg-surface rounded-md border p-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Heading className="font-mono text-lg font-semibold">{project.name}</Heading>
        <Badge tone={STATUS[project.status].tone}>
          <T k={STATUS[project.status].labelKey} />
        </Badge>
        <span className="text-subtle font-mono text-xs">
          <T k={CATEGORY_LABEL[project.category]} />
        </span>
      </div>

      <p className="text-muted mt-3">
        <L text={project.description} />
      </p>

      {project.technologies.length > 0 && (
        <div className="mt-4">
          <p className="text-subtle font-mono text-xs">
            <T k="projects.stack" />
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li key={technology}>
                <Badge>{technology}</Badge>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasLinks ? (
        <ul className="mt-4 flex gap-4 font-mono text-sm">
          {repository && (
            <li>
              <ExternalLink href={repository}>
                <T k="projects.repository" />
              </ExternalLink>
            </li>
          )}
          {demo && (
            <li>
              <ExternalLink href={demo}>
                <T k="projects.demo" />
              </ExternalLink>
            </li>
          )}
        </ul>
      ) : (
        <p className="text-subtle mt-4 text-sm">
          <T k="projects.pendingDetails" />
        </p>
      )}
    </article>
  );
}
