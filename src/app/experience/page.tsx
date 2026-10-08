import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EXPERIENCE } from "@/content/experience";
import { ExperienceTimeline } from "@/features/experience/ExperienceTimeline";
import { T } from "@/i18n/T";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Experience",
  description:
    "Guilherme Pavaneli at BeGrowth and Letz: web applications, APIs, business rules and front-end work in React.js, Next.js and TypeScript.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title={<T k="nav.experience" />}
        description={<T k="experience.description" />}
      />
      <ExperienceTimeline entries={EXPERIENCE} />
    </div>
  );
}
