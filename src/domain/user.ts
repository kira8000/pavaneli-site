import { z } from "zod";
import type { Stored } from "./entity";
import { enumOf, text } from "./validation";

export const USER_ROLES = ["admin", "editor", "viewer"] as const;
export const USER_STATUSES = ["active", "inactive", "invited"] as const;
export const USER_SORT_KEYS = ["name", "email", "role", "status", "createdAt"] as const;

export type UserRole = (typeof USER_ROLES)[number];
export type UserStatus = (typeof USER_STATUSES)[number];
export type UserSortKey = (typeof USER_SORT_KEYS)[number];

export interface UserFilters {
  role?: UserRole;
  status?: UserStatus;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const userInputSchema = z.object({
  name: text(2, 80),
  email: z
    .string({ error: "required" })
    .trim()
    .toLowerCase()
    .min(1, "required")
    .max(120, "tooLong")
    .regex(EMAIL_PATTERN, "invalidEmail"),
  role: enumOf(USER_ROLES),
  status: enumOf(USER_STATUSES),
});

export const userPatchSchema = userInputSchema.partial();

export type UserInput = z.output<typeof userInputSchema>;
export type User = Stored<UserInput>;
