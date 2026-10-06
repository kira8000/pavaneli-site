import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EXPERIENCE } from "@/content/experience";
import { ExperienceTimeline } from "@/features/experience/ExperienceTimeline";
import { T } from "@/i18n/T";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Guilherme Pavaneli as a front-end developer at BeGrowth and Letz.",
};

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
