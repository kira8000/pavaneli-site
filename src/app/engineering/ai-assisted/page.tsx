import type { Metadata } from "next";
import { BulletList } from "@/components/ui/BulletList";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { AI_REVIEW_NOTES, AI_TASK_SPEC } from "@/content/code-snippets";
import { WorkflowSteps } from "@/features/ai-workflow/WorkflowSteps";
import { T } from "@/i18n/T";
import type { MessageKey } from "@/i18n/translate";

export const metadata: Metadata = {
  title: "AI-Assisted Engineering",
  description:
    "How AI tools fit into the development workflow, and where human review stays in control.",
};

const HUMAN_KEYS = [
  "aiPage.human.requirements",
  "aiPage.human.logic",
  "aiPage.human.architecture",
  "aiPage.human.review",
  "aiPage.human.validation",
  "aiPage.human.quality",
  "aiPage.human.docs",
] as const satisfies readonly MessageKey[];

const HELPS_KEYS = [
  "aiPage.helps.implementation",
  "aiPage.helps.practices",
] as const satisfies readonly MessageKey[];

const CHECKLIST_KEYS = [
  "aiPage.checklist.requirements",
  "aiPage.checklist.rules",
  "aiPage.checklist.types",
  "aiPage.checklist.checks",
  "aiPage.checklist.tests",
  "aiPage.checklist.security",
  "aiPage.checklist.accessibility",
  "aiPage.checklist.docs",
] as const satisfies readonly MessageKey[];

export default function AiAssistedPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title={<T k="aiPage.title" />}
        description={<T k="aiPage.description" />}
      />

      <Section
        id="workflow"
        title={<T k="aiPage.workflowTitle" />}
        description={<T k="aiPage.workflowBody" />}
      >
        <WorkflowSteps />
      </Section>

      <Section id="human" title={<T k="aiPage.humanTitle" />}>
        <BulletList keys={HUMAN_KEYS} />
      </Section>

      <Section id="helps" title={<T k="aiPage.helpsTitle" />}>
        <BulletList keys={HELPS_KEYS} />
      </Section>

      <Section
        id="checklist"
        title={<T k="aiPage.checklistTitle" />}
        description={<T k="aiPage.checklistBody" />}
      >
        <BulletList keys={CHECKLIST_KEYS} />
      </Section>

      <Section
        id="example"
        title={<T k="aiPage.exampleTitle" />}
        description={<T k="aiPage.exampleBody" />}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <CodeBlock snippet={AI_TASK_SPEC} />
          <CodeBlock snippet={AI_REVIEW_NOTES} />
        </div>
      </Section>

      <Section
        id="tools"
        title={<T k="aiPage.toolsTitle" />}
        description={<T k="aiPage.toolsBody" />}
      />
    </div>
  );
}
