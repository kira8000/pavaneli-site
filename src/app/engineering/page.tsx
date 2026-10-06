import type { Metadata } from "next";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ENGINEERING_TOPICS } from "@/content/engineering";
import { TopicSection } from "@/features/engineering/TopicSection";
import { T } from "@/i18n/T";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "How this site is engineered: front-end, back-end, database, testing, performance, accessibility and security.",
};

export default function EngineeringPage() {
  return (
    <div className="space-y-16">
      <div className="space-y-4">
        <PageHeader
          title={<T k="nav.engineering" />}
          description={<T k="engineering.description" />}
        />
        <p className="text-subtle max-w-2xl text-sm">
          <T k="engineering.illustrativeNote" />
        </p>
      </div>

      {ENGINEERING_TOPICS.map((topic) => (
        <TopicSection key={topic.id} topic={topic} />
      ))}

      <Section
        id="ai"
        title={<T k="engineering.aiTitle" />}
        description={<T k="engineering.aiBody" />}
      >
        <ArrowLink href="/engineering/ai-assisted">
          <T k="engineering.aiCta" />
        </ArrowLink>
      </Section>
    </div>
  );
}
