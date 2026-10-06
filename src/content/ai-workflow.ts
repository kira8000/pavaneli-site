import type { MessageKey } from "@/i18n/translate";

interface WorkflowStep {
  labelKey: MessageKey;
  /** The only step where AI acts; every other step stays a human responsibility. */
  ai?: true;
}

export const AI_WORKFLOW_STEPS = [
  { labelKey: "workflow.steps.requirements" },
  { labelKey: "workflow.steps.businessRules" },
  { labelKey: "workflow.steps.architecture" },
  { labelKey: "workflow.steps.aiImplementation", ai: true },
  { labelKey: "workflow.steps.humanReview" },
  { labelKey: "workflow.steps.testing" },
  { labelKey: "workflow.steps.staticChecks" },
  { labelKey: "workflow.steps.securityReview" },
  { labelKey: "workflow.steps.documentation" },
  { labelKey: "workflow.steps.delivery" },
] as const satisfies readonly WorkflowStep[];
