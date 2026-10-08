import type { MessageKey } from "@/i18n/translate";

/** Mirrors the owner's CV. Technology names are proper nouns, so they are not translated. */
export const TECH_GROUPS = [
  { titleKey: "skills.languages", items: ["TypeScript", "JavaScript"] },
  { titleKey: "skills.frontend", items: ["React.js", "Next.js"] },
  { titleKey: "skills.backend", items: ["Node.js", "NestJS"] },
  { titleKey: "skills.apis", items: ["REST APIs", "OpenAPI"] },
  { titleKey: "skills.database", items: ["PostgreSQL", "Prisma"] },
  { titleKey: "skills.testing", items: ["Jest"] },
  { titleKey: "skills.cloud", items: ["GCP", "Docker", "Git"] },
  { titleKey: "skills.workflow", items: ["Cursor", "Claude Code"] },
] as const satisfies readonly { titleKey: MessageKey; items: readonly string[] }[];

export const PRACTICE_KEYS = [
  "skills.practiceItems.testing",
  "skills.practiceItems.architecture",
  "skills.practiceItems.components",
  "skills.practiceItems.enterprise",
  "skills.practiceItems.problemSolving",
  "skills.practiceItems.refactoring",
  "skills.practiceItems.aiReview",
] as const satisfies readonly MessageKey[];
