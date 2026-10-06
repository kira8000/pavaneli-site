import {
  PROJECT_STATUSES,
  type Project,
  type ProjectFilters,
  type ProjectInput,
  type ProjectSortKey,
} from "@/domain/project";
import { compareText } from "@/lib/text";
import {
  createMockRepository,
  formatId,
  type MockCollectionConfig,
} from "./createMockRepository";
import type { MockNetwork } from "./network";
import { addDays, rank, toIsoDate } from "./seed-utils";

export const PROJECT_ID_PREFIX = "prj";
const SEED_START = "2025-06-02T08:00:00.000Z";
const SEED_STEP_DAYS = 14;
const DUE_DATE_OFFSET_DAYS = 120;

// Fictional demo projects, unrelated to the portfolio projects.
const SEED_PROJECTS = [
  ["Atlas Billing", "Recurring invoices and payment reminders."],
  ["Beacon Analytics", "Usage dashboards for internal teams."],
  ["Cobalt Auth", "Single sign-on for the admin tools."],
  ["Delta Search", "Full-text search over support articles."],
  ["Ember Notifications", "Email and in-app notification preferences."],
  ["Fjord Reports", "Scheduled CSV and PDF exports."],
  ["Garnet Onboarding", "Guided setup for new workspaces."],
  ["Harbor Inventory", "Stock levels and low-inventory alerts."],
  ["Iris Scheduler", "Calendar integration for appointments."],
  ["Juniper Payments", ""],
  ["Kestrel Audit", "Immutable activity log for compliance reviews."],
  ["Lumen Docs", "Public documentation site."],
] as const;

function seedProjects(): Project[] {
  return SEED_PROJECTS.map(([name, description], index) => {
    const createdAt = addDays(SEED_START, index * SEED_STEP_DAYS);

    return {
      id: formatId(PROJECT_ID_PREFIX, index + 1),
      name,
      description,
      status: PROJECT_STATUSES[index % PROJECT_STATUSES.length],
      dueDate: toIsoDate(addDays(createdAt, DUE_DATE_OFFSET_DAYS)),
      createdAt,
      updatedAt: createdAt,
    };
  });
}

export const projectCollection: MockCollectionConfig<
  ProjectInput,
  ProjectFilters,
  ProjectSortKey
> = {
  idPrefix: PROJECT_ID_PREFIX,
  seed: seedProjects,
  searchText: (project) => `${project.name} ${project.description}`,
  matches: (project, { status }) => !status || project.status === status,
  sorters: {
    name: (a, b) => compareText(a.name, b.name),
    status: (a, b) => rank(PROJECT_STATUSES, a.status) - rank(PROJECT_STATUSES, b.status),
    dueDate: (a, b) => a.dueDate.localeCompare(b.dueDate),
    createdAt: (a, b) => a.createdAt.localeCompare(b.createdAt),
  },
  defaultSort: "name",
};

export function createMockProjectRepository(network: MockNetwork, now?: () => string) {
  return createMockRepository(projectCollection, network, now);
}
