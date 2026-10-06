import type { LocalizedText } from "@/i18n/config";

export interface ExperienceEntry {
  id: string;
  company: string;
  role: LocalizedText;
  /** "YYYY-MM" */
  startDate: string;
  /** "YYYY-MM"; `null` means current position. */
  endDate: string | null;
  summary?: LocalizedText;
  applicationType?: LocalizedText;
  technologies: readonly string[];
  responsibilities: readonly LocalizedText[];
  highlights?: readonly LocalizedText[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  course: LocalizedText;
  /** "YYYY-MM" */
  startDate: string;
  /** "YYYY-MM" */
  endDate: string;
}

export type ProjectCategory = "professional" | "personal" | "openSource";
export type ProjectStatus = "inProgress" | "completed";

/** Portfolio project (real content), distinct from the playground's mock `Project` domain. */
export interface PortfolioProject {
  id: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  description: LocalizedText;
  technologies: readonly string[];
  /** Only set what really exists; absent links are never rendered. */
  links: { repository?: string; demo?: string };
  featured?: boolean;
}
