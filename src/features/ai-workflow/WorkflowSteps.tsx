import { StepFlow } from "@/components/ui/StepFlow";
import { AI_WORKFLOW_STEPS } from "@/content/ai-workflow";
import { T } from "@/i18n/T";

const ITEMS = AI_WORKFLOW_STEPS.map((step) => ({
  key: step.labelKey,
  label: <T k={step.labelKey} />,
  accent: "ai" in step,
}));

export function WorkflowSteps() {
  return <StepFlow items={ITEMS} />;
}
