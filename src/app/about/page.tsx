import type { Metadata } from "next";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { EducationList } from "@/features/about/EducationList";
import { SkillGroups } from "@/features/skills/SkillGroups";
import { T } from "@/i18n/T";
import type { MessageKey } from "@/i18n/translate";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Guilherme Pavaneli, Full Stack Developer: web applications in React.js, Next.js, TypeScript and Node.js. São Paulo, open to remote work in Brazil.",
  path: "/about",
});

const TRAJECTORY = [
  { titleKey: "about.frontendTitle", bodyKey: "about.frontendBody" },
  { titleKey: "about.fullstackTitle", bodyKey: "about.fullstackBody" },
  { titleKey: "about.nextTitle", bodyKey: "about.nextBody" },
] as const satisfies readonly { titleKey: MessageKey; bodyKey: MessageKey }[];

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <PageHeader title={<T k="nav.about" />} description={<T k="about.description" />} />

      <Section id="profile" title={<T k="about.profileTitle" />}>
        <div className="text-muted max-w-3xl space-y-4 text-lg">
          <p>
            <T k="about.profileOne" />
          </p>
          <p>
            <T k="about.profileTwo" />
          </p>
        </div>
      </Section>

      <Section id="trajectory" title={<T k="about.trajectoryTitle" />}>
        <ol className="border-border space-y-6 border-l">
          {TRAJECTORY.map(({ titleKey, bodyKey }) => (
            <li key={titleKey} className="pl-6">
              <h3 className="font-mono text-base font-semibold">
                <T k={titleKey} />
              </h3>
              <p className="text-muted mt-1 max-w-2xl">
                <T k={bodyKey} />
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="focus" title={<T k="about.focusTitle" />}>
        <SkillGroups />
      </Section>

      <Section id="education" title={<T k="about.educationTitle" />}>
        <EducationList />
      </Section>

      <Section
        id="ai"
        title={<T k="about.aiTitle" />}
        description={<T k="about.aiBody" />}
      >
        <ArrowLink href="/engineering/ai-assisted">
          <T k="about.aiCta" />
        </ArrowLink>
      </Section>
    </div>
  );
}
