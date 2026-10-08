import { Badge } from "@/components/ui/Badge";
import { BulletList } from "@/components/ui/BulletList";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Section } from "@/components/ui/Section";
import { StepFlow } from "@/components/ui/StepFlow";
import type { EngineeringTopic } from "@/content/engineering";
import { T } from "@/i18n/T";

export function TopicSection({ topic }: { topic: EngineeringTopic }) {
  const { id, titleKey, introKey, pointKeys, noteKey, conceptual, flow, snippet } = topic;

  return (
    <Section id={id} title={<T k={titleKey} />} description={<T k={introKey} />}>
      <div className="space-y-6">
        {conceptual && (
          <Badge tone="neutral">
            <T k="engineering.origin.conceptual" />
          </Badge>
        )}
        {noteKey && (
          <p className="border-warning text-muted border-l-2 pl-3 text-sm">
            <T k={noteKey} />
          </p>
        )}
        <BulletList keys={pointKeys} />
        {flow && <StepFlow items={flow.map((label) => ({ key: label, label }))} />}
        {snippet && <CodeBlock snippet={snippet} />}
      </div>
    </Section>
  );
}
