import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PROJECTS } from "@/content/projects";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { VersusCaseStudy } from "@/features/projects/VersusCaseStudy";
import { T } from "@/i18n/T";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Versus case study by Guilherme Pavaneli: Flutter and NestJS software for rap-battle organizers. In development, with public repositories.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title={<T k="nav.projects" />}
        description={<T k="projects.description" />}
      />
      <ul className="space-y-8">
        {PROJECTS.map((project) => (
          <li key={project.id}>
            {project.id === "versus" ? (
              <VersusCaseStudy />
            ) : (
              <ProjectCard project={project} headingLevel="h2" />
            )}
          </li>
        ))}
      </ul>
      <p className="text-subtle font-mono text-sm">
        <T k="projects.moreSoon" />
      </p>
    </div>
  );
}
