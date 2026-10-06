import type { BadgeTone } from "@/components/ui/Badge";
import type { TicketPriority, TicketStatus } from "@/domain/ticket";
import type { UserRole, UserStatus } from "@/domain/user";

export const USER_STATUS_TONE: Record<UserStatus, BadgeTone> = {
  active: "accent",
  invited: "warning",
  inactive: "neutral",
};

export const USER_ROLE_TONE: Record<UserRole, BadgeTone> = {
  admin: "accent",
  editor: "neutral",
  viewer: "neutral",
};

export const TICKET_STATUS_TONE: Record<TicketStatus, BadgeTone> = {
  open: "warning",
  in_progress: "accent",
  resolved: "neutral",
  closed: "neutral",
};

export const TICKET_PRIORITY_TONE: Record<TicketPriority, BadgeTone> = {
  low: "neutral",
  medium: "neutral",
  high: "warning",
  critical: "danger",
};
