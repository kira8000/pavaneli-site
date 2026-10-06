import { ArrowLink } from "@/components/ui/ArrowLink";
import { BulletList } from "@/components/ui/BulletList";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Section } from "@/components/ui/Section";
import { PROFILE } from "@/content/profile";
import { PROJECTS } from "@/content/projects";
import { WorkflowSteps } from "@/features/ai-workflow/WorkflowSteps";
import { Hero } from "@/features/home/Hero";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { SkillGroups } from "@/features/skills/SkillGroups";
import { T } from "@/i18n/T";
import type { MessageKey } from "@/i18n/translate";

const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);

const MINDSET_KEYS = [
  "home.mindset.simplicity",
  "home.mindset.separation",
  "home.mindset.testing",
  "home.mindset.accessibility",
  "home.mindset.performance",
] as const satisfies readonly MessageKey[];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />

      <Section id="summary" title={<T k="home.summaryTitle" />}>
        <p className="text-muted max-w-3xl text-lg">
          <T k="home.summaryBody" />
        </p>
      </Section>

      <Section id="skills" title={<T k="home.skillsTitle" />}>
        <SkillGroups />
      </Section>

      <Section
        id="experience"
        title={<T k="home.experienceTitle" />}
        description={<T k="home.experienceBody" />}
      >
        <ArrowLink href="/experience">
          <T k="home.experienceCta" />
        </ArrowLink>
      </Section>

      <Section id="projects" title={<T k="home.projectsTitle" />}>
        <div className="space-y-4">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-4">
          <ArrowLink href="/projects">
            <T k="home.projectsCta" />
          </ArrowLink>
        </div>
      </Section>

      <Section
        id="mindset"
        title={<T k="home.mindsetTitle" />}
        description={<T k="home.mindsetBody" />}
      >
        <BulletList keys={MINDSET_KEYS} />
        <div className="mt-6">
          <ArrowLink href="/engineering">
            <T k="home.mindsetCta" />
          </ArrowLink>
        </div>
      </Section>

      <Section id="ai" title={<T k="home.aiTitle" />} description={<T k="home.aiBody" />}>
        <WorkflowSteps />
        <div className="mt-6">
          <ArrowLink href="/engineering/ai-assisted">
            <T k="home.aiCta" />
          </ArrowLink>
        </div>
      </Section>

      <Section
        id="cta"
        title={<T k="home.ctaTitle" />}
        description={<T k="home.ctaBody" />}
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          <li>
            <ArrowLink href="/contact">
              <T k="home.ctaContact" />
            </ArrowLink>
          </li>
          <li>
            <ExternalLink href={PROFILE.links.linkedin}>LinkedIn</ExternalLink>
          </li>
          <li>
            <ExternalLink href={PROFILE.links.github}>GitHub</ExternalLink>
          </li>
        </ul>
      </Section>
    </div>
  );
}
