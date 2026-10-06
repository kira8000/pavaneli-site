import { z } from "zod";
import type { Stored } from "./entity";
import { enumOf, missingOrInvalid, optionalText, text } from "./validation";

/** Both lists are ordered from least to most urgent/advanced; sorting relies on it. */
export const TICKET_STATUSES = ["open", "in_progress", "resolved", "closed"] as const;
export const TICKET_PRIORITIES = ["low", "medium", "high", "critical"] as const;
export const TICKET_SORT_KEYS = [
  "title",
  "status",
  "priority",
  "createdAt",
  "updatedAt",
] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number];
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];
export type TicketSortKey = (typeof TICKET_SORT_KEYS)[number];

export interface TicketFilters {
  status?: TicketStatus;
  priority?: TicketPriority;
}

export const ticketInputSchema = z.object({
  title: text(3, 120),
  description: optionalText(500),
  status: enumOf(TICKET_STATUSES),
  priority: enumOf(TICKET_PRIORITIES),
  /** User id; the mock does not enforce referential integrity. */
  assigneeId: z.string({ error: missingOrInvalid }).min(1, "invalid").nullable(),
});

export const ticketPatchSchema = ticketInputSchema.partial();

export type TicketInput = z.output<typeof ticketInputSchema>;
export type Ticket = Stored<TicketInput>;
