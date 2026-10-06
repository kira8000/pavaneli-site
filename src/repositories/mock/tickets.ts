import {
  TICKET_PRIORITIES,
  TICKET_STATUSES,
  type Ticket,
  type TicketFilters,
  type TicketInput,
  type TicketPriority,
  type TicketSortKey,
  type TicketStatus,
} from "@/domain/ticket";
import { compareText } from "@/lib/text";
import {
  createMockRepository,
  formatId,
  type MockCollectionConfig,
} from "./createMockRepository";
import type { MockNetwork } from "./network";
import { addDays, rank } from "./seed-utils";
import { USER_ID_PREFIX } from "./users";

export const TICKET_ID_PREFIX = "tkt";
const SEED_COUNT = 30;
const SEED_START = "2025-03-03T10:00:00.000Z";
const SEED_STEP_DAYS = 3;
const ASSIGNABLE_USERS = 24;

const VERBS = ["Fix", "Improve", "Document", "Investigate", "Refactor", "Add"];
const SUBJECTS = [
  "login flow",
  "search filters",
  "invoice export",
  "email templates",
  "dashboard cache",
  "audit log",
  "onboarding form",
  "pagination bug",
];
const DESCRIPTIONS = [
  "Reported while testing the staging environment.",
  "Needs a decision before the next release.",
  "Small change, low risk.",
  "",
];

function seedStatus(index: number): TicketStatus {
  return TICKET_STATUSES[(index + Math.floor(index / 4)) % TICKET_STATUSES.length];
}

function seedPriority(index: number): TicketPriority {
  return TICKET_PRIORITIES[
    (index * 2 + Math.floor(index / 3)) % TICKET_PRIORITIES.length
  ];
}

function seedTickets(): Ticket[] {
  return Array.from({ length: SEED_COUNT }, (_, index) => {
    const verb = VERBS[index % VERBS.length];
    const subject =
      SUBJECTS[(index * 3 + Math.floor(index / VERBS.length)) % SUBJECTS.length];
    const createdAt = addDays(SEED_START, index * SEED_STEP_DAYS);
    const unassigned = index % 5 === 4;

    return {
      id: formatId(TICKET_ID_PREFIX, index + 1),
      title: `${verb} ${subject}`,
      description: DESCRIPTIONS[index % DESCRIPTIONS.length],
      status: seedStatus(index),
      priority: seedPriority(index),
      assigneeId: unassigned
        ? null
        : formatId(USER_ID_PREFIX, ((index * 7) % ASSIGNABLE_USERS) + 1),
      createdAt,
      updatedAt: addDays(createdAt, index % 5),
    };
  });
}

export const ticketCollection: MockCollectionConfig<
  TicketInput,
  TicketFilters,
  TicketSortKey
> = {
  idPrefix: TICKET_ID_PREFIX,
  seed: seedTickets,
  searchText: (ticket) => `${ticket.title} ${ticket.description}`,
  matches: (ticket, { status, priority }) =>
    (!status || ticket.status === status) && (!priority || ticket.priority === priority),
  sorters: {
    title: (a, b) => compareText(a.title, b.title),
    status: (a, b) => rank(TICKET_STATUSES, a.status) - rank(TICKET_STATUSES, b.status),
    priority: (a, b) =>
      rank(TICKET_PRIORITIES, a.priority) - rank(TICKET_PRIORITIES, b.priority),
    createdAt: (a, b) => a.createdAt.localeCompare(b.createdAt),
    updatedAt: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
  },
  defaultSort: "createdAt",
};

export function createMockTicketRepository(network: MockNetwork, now?: () => string) {
  return createMockRepository(ticketCollection, network, now);
}
