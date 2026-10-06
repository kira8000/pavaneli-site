import {
  USER_ROLES,
  USER_STATUSES,
  type User,
  type UserFilters,
  type UserInput,
  type UserRole,
  type UserSortKey,
  type UserStatus,
} from "@/domain/user";
import { compareText, normalizeText } from "@/lib/text";
import {
  createMockRepository,
  formatId,
  type MockCollectionConfig,
} from "./createMockRepository";
import type { MockNetwork } from "./network";
import { addDays, rank } from "./seed-utils";

export const USER_ID_PREFIX = "usr";
const SEED_COUNT = 24;
const SEED_START = "2025-01-06T09:00:00.000Z";
const SEED_STEP_DAYS = 9;

// Fictional people; the `example.com` domain is reserved for documentation.
const FIRST_NAMES = [
  "Ana",
  "Bruno",
  "Carla",
  "Diego",
  "Elisa",
  "Felipe",
  "Gabriela",
  "Henrique",
  "Isabela",
  "João",
  "Larissa",
  "Marcos",
];
const LAST_NAMES = [
  "Almeida",
  "Barros",
  "Cardoso",
  "Dias",
  "Esteves",
  "Fontes",
  "Gomes",
  "Lopes",
];

function seedRole(index: number): UserRole {
  if (index % 7 === 0) return "admin";
  return index % 3 === 1 ? "editor" : "viewer";
}

function seedStatus(index: number): UserStatus {
  if (index % 5 === 3) return "invited";
  return index % 4 === 2 ? "inactive" : "active";
}

function seedUsers(): User[] {
  return Array.from({ length: SEED_COUNT }, (_, index) => {
    const first = FIRST_NAMES[index % FIRST_NAMES.length];
    // Offsetting by the "lap" over first names keeps every full name unique.
    const last =
      LAST_NAMES[
        (index * 5 + Math.floor(index / FIRST_NAMES.length)) % LAST_NAMES.length
      ];
    const createdAt = addDays(SEED_START, index * SEED_STEP_DAYS);

    return {
      id: formatId(USER_ID_PREFIX, index + 1),
      name: `${first} ${last}`,
      email: `${normalizeText(first)}.${normalizeText(last)}@example.com`,
      role: seedRole(index),
      status: seedStatus(index),
      createdAt,
      updatedAt: createdAt,
    };
  });
}

export const userCollection: MockCollectionConfig<UserInput, UserFilters, UserSortKey> = {
  idPrefix: USER_ID_PREFIX,
  seed: seedUsers,
  searchText: (user) => `${user.name} ${user.email}`,
  matches: (user, { role, status }) =>
    (!role || user.role === role) && (!status || user.status === status),
  sorters: {
    name: (a, b) => compareText(a.name, b.name),
    email: (a, b) => compareText(a.email, b.email),
    role: (a, b) => rank(USER_ROLES, a.role) - rank(USER_ROLES, b.role),
    status: (a, b) => rank(USER_STATUSES, a.status) - rank(USER_STATUSES, b.status),
    createdAt: (a, b) => a.createdAt.localeCompare(b.createdAt),
  },
  defaultSort: "name",
  uniqueField: "email",
};

export function createMockUserRepository(network: MockNetwork, now?: () => string) {
  return createMockRepository(userCollection, network, now);
}
