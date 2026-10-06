import { z } from "zod";
import type { Stored } from "./entity";
import { enumOf, missingOrInvalid, optionalText, text } from "./validation";

export const PROJECT_STATUSES = ["planned", "active", "paused", "done"] as const;
export const PROJECT_SORT_KEYS = ["name", "status", "dueDate", "createdAt"] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type ProjectSortKey = (typeof PROJECT_SORT_KEYS)[number];

export interface ProjectFilters {
  status?: ProjectStatus;
}

/**
 * A demo-data project of the mock backend. Not the portfolio project shown on
 * `/projects` (see `content/projects.ts`).
 */
export const projectInputSchema = z.object({
  name: text(2, 80),
  description: optionalText(300),
  status: enumOf(PROJECT_STATUSES),
  /** ISO date (YYYY-MM-DD). */
  dueDate: z.iso.date({ error: missingOrInvalid }),
});

export const projectPatchSchema = projectInputSchema.partial();

export type ProjectInput = z.output<typeof projectInputSchema>;
export type Project = Stored<ProjectInput>;
