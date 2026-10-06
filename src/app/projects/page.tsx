import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PROJECTS } from "@/content/projects";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { T } from "@/i18n/T";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Guilherme Pavaneli, including Versus, a rap battle management system in development.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title={<T k="nav.projects" />}
        description={<T k="projects.description" />}
      />
      <ul className="space-y-4">
        {PROJECTS.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} headingLevel="h2" />
          </li>
        ))}
      </ul>
      <p className="text-subtle font-mono text-sm">
        <T k="projects.moreSoon" />
      </p>
    </div>
  );
}
