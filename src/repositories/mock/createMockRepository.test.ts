import { beforeEach, describe, expect, it } from "vitest";
import { ApiError } from "@/domain/api-error";
import type { ListQuery } from "@/domain/pagination";
import type { UserFilters, UserSortKey } from "@/domain/user";
import { formatId } from "./createMockRepository";
import { createMockNetwork } from "./network";
import { createMockUserRepository, USER_ID_PREFIX } from "./users";

const FIXED_NOW = "2026-01-01T00:00:00.000Z";
const SEED_USERS = 24;

function query(
  overrides: Partial<ListQuery<UserFilters, UserSortKey>> = {},
): ListQuery<UserFilters, UserSortKey> {
  return {
    page: 1,
    pageSize: 10,
    search: "",
    sortDirection: "asc",
    filters: {},
    ...overrides,
  };
}

const newUser = {
  name: "Nova Pessoa",
  email: "nova.pessoa@example.com",
  role: "viewer",
  status: "active",
} as const;

describe("mock repository", () => {
  const network = createMockNetwork({ latencyMs: 0 });
  let repository: ReturnType<typeof createMockUserRepository>;

  beforeEach(() => {
    network.settings.failing = false;
    repository = createMockUserRepository(network, () => FIXED_NOW);
  });

  describe("list", () => {
    it("paginates and reports totals", async () => {
      const first = await repository.list(query({ pageSize: 10 }));
      const last = await repository.list(query({ pageSize: 10, page: 3 }));

      expect(first).toMatchObject({ total: SEED_USERS, page: 1, pageCount: 3 });
      expect(first.items).toHaveLength(10);
      expect(last.items).toHaveLength(SEED_USERS - 20);
    });

    it("clamps a page past the end instead of returning nothing", async () => {
      const result = await repository.list(query({ page: 99 }));

      expect(result.page).toBe(result.pageCount);
      expect(result.items.length).toBeGreaterThan(0);
    });

    it("sorts in both directions with a stable tie-break", async () => {
      const asc = await repository.list(query({ sortBy: "role", pageSize: 50 }));
      const desc = await repository.list(
        query({ sortBy: "role", sortDirection: "desc", pageSize: 50 }),
      );

      expect(asc.items[0].role).toBe("admin");
      expect(desc.items[0].role).toBe("viewer");
      expect(asc.items.map((u) => u.id)).not.toEqual(desc.items.map((u) => u.id));
    });

    it("filters by field and searches ignoring accents and case", async () => {
      const admins = await repository.list(query({ filters: { role: "admin" } }));
      expect(admins.total).toBeGreaterThan(0);
      expect(admins.items.every((u) => u.role === "admin")).toBe(true);

      const found = await repository.list(query({ search: "JOAO" }));
      expect(found.total).toBeGreaterThan(0);
      expect(found.items.every((u) => u.name.startsWith("João"))).toBe(true);
    });

    it("returns an empty page when nothing matches", async () => {
      const result = await repository.list(query({ search: "zzz-no-match" }));

      expect(result).toMatchObject({ items: [], total: 0, page: 1, pageCount: 1 });
    });
  });

  describe("writes", () => {
    it("creates a record with a new id and timestamps", async () => {
      const created = await repository.create(newUser);

      expect(created).toMatchObject({
        ...newUser,
        id: formatId(USER_ID_PREFIX, SEED_USERS + 1),
        createdAt: FIXED_NOW,
        updatedAt: FIXED_NOW,
      });
      expect(await repository.get(created.id)).toEqual(created);
    });

    it("never reuses the id of a deleted record", async () => {
      const first = await repository.create(newUser);
      await repository.remove(first.id);
      const second = await repository.create(newUser);

      expect(second.id).not.toBe(first.id);
    });

    it("updates only the patched fields", async () => {
      const [before] = (await repository.list(query())).items;
      const updated = await repository.update(before.id, { role: "admin" });

      expect(updated).toEqual({ ...before, role: "admin", updatedAt: FIXED_NOW });
    });

    it("rejects duplicate emails on create and update with a field error", async () => {
      const [first, second] = (await repository.list(query())).items;

      await expect(
        repository.create({ ...newUser, email: first.email }),
      ).rejects.toMatchObject({
        code: "conflict",
        status: 409,
        fieldErrors: { email: "duplicate" },
      });
      await expect(
        repository.update(second.id, { email: first.email }),
      ).rejects.toMatchObject({
        code: "conflict",
      });
      // Keeping its own email is not a conflict.
      await expect(
        repository.update(first.id, { email: first.email }),
      ).resolves.toBeDefined();
    });

    it("removes a record", async () => {
      const [target] = (await repository.list(query())).items;
      await repository.remove(target.id);

      expect((await repository.list(query())).total).toBe(SEED_USERS - 1);
      await expect(repository.get(target.id)).rejects.toMatchObject({
        code: "not_found",
      });
    });

    it("reports not_found for unknown ids", async () => {
      await expect(repository.get("usr_999")).rejects.toMatchObject({ status: 404 });
      await expect(repository.update("usr_999", { name: "X Y" })).rejects.toBeInstanceOf(
        ApiError,
      );
      await expect(repository.remove("usr_999")).rejects.toBeInstanceOf(ApiError);
    });
  });

  it("does not leak internal state through returned objects", async () => {
    const [item] = (await repository.list(query())).items;
    item.name = "Mutated";

    expect((await repository.get(item.id)).name).not.toBe("Mutated");
  });

  it("restores the seed data on reset", async () => {
    await repository.create(newUser);
    repository.reset();

    expect((await repository.list(query())).total).toBe(SEED_USERS);
  });

  it("fails every request while the network is set to fail", async () => {
    network.settings.failing = true;

    await expect(repository.list(query())).rejects.toMatchObject({
      code: "unavailable",
      status: 503,
    });
    await expect(repository.create(newUser)).rejects.toMatchObject({
      code: "unavailable",
    });
  });
});
