import { beforeEach, describe, expect, it } from "vitest";
import { VALIDATION_CODES } from "@/domain/api-error";
import { projectInputSchema } from "@/domain/project";
import { ticketInputSchema } from "@/domain/ticket";
import { userInputSchema } from "@/domain/user";
import { translate } from "@/i18n/translate";
import { projectCollection } from "@/repositories/mock/projects";
import { ticketCollection } from "@/repositories/mock/tickets";
import { userCollection } from "@/repositories/mock/users";
import { createMockBackend, type MockBackend } from "./mock-backend";

const validUser = {
  name: "  Nova Pessoa ",
  email: " Nova.Pessoa@Example.com ",
  role: "editor",
  status: "invited",
};

async function validationErrors(promise: Promise<unknown>) {
  const error = await promise.then(
    () => null,
    (reason: unknown) => reason,
  );
  expect(error).toMatchObject({ code: "validation", status: 422 });
  return (error as { fieldErrors: Record<string, string> }).fieldErrors;
}

describe("seed data", () => {
  it("is valid against the domain schemas, with unique ids", () => {
    const collections = [
      { config: userCollection, schema: userInputSchema },
      { config: ticketCollection, schema: ticketInputSchema },
      { config: projectCollection, schema: projectInputSchema },
    ];

    for (const { config, schema } of collections) {
      const items = config.seed();
      expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
      for (const item of items) {
        expect(schema.safeParse(item).success, `${config.idPrefix}: ${item.id}`).toBe(
          true,
        );
      }
    }
    const emails = userCollection.seed().map((user) => user.email);
    expect(new Set(emails).size).toBe(emails.length);
  });
});

describe("services", () => {
  let backend: MockBackend;

  beforeEach(() => {
    backend = createMockBackend({ latencyMs: 0 });
  });

  it("normalizes input before persisting it", async () => {
    const created = await backend.services.users.create(validUser);

    expect(created).toMatchObject({
      name: "Nova Pessoa",
      email: "nova.pessoa@example.com",
    });
  });

  it("rejects invalid user input with one code per field", async () => {
    const errors = await validationErrors(
      backend.services.users.create({
        name: "",
        email: "not-an-email",
        role: "owner",
        status: undefined,
      }),
    );

    expect(errors).toEqual({
      name: "required",
      email: "invalidEmail",
      role: "invalid",
      status: "required",
    });
  });

  it("distinguishes too short from too long", async () => {
    const short = await validationErrors(
      backend.services.users.create({ ...validUser, name: "A" }),
    );
    const long = await validationErrors(
      backend.services.users.create({ ...validUser, name: "A".repeat(81) }),
    );

    expect(short.name).toBe("tooShort");
    expect(long.name).toBe("tooLong");
  });

  it("rejects non-object input instead of throwing synchronously", async () => {
    await expect(backend.services.users.create(null)).rejects.toMatchObject({
      code: "validation",
    });
  });

  it("validates patches but allows partial updates", async () => {
    const { items } = await backend.services.users.list();
    const [target] = items;

    const updated = await backend.services.users.update(target.id, {
      status: "inactive",
    });
    expect(updated).toMatchObject({
      id: target.id,
      name: target.name,
      status: "inactive",
    });

    const errors = await validationErrors(
      backend.services.users.update(target.id, { email: "broken" }),
    );
    expect(errors).toEqual({ email: "invalidEmail" });
  });

  it("ignores fields the schema does not know", async () => {
    const [target] = (await backend.services.users.list()).items;
    const updated = await backend.services.users.update(target.id, {
      id: "usr_hacked",
      createdAt: "1999-01-01",
    });

    expect(updated).toMatchObject({ id: target.id, createdAt: target.createdAt });
  });

  it("sanitizes list queries coming from the UI", async () => {
    const page = await backend.services.users.list({ page: -4, pageSize: 100_000 });

    expect(page.page).toBe(1);
    expect(page.pageSize).toBe(50);
  });

  it("validates tickets and projects", async () => {
    const ticketErrors = await validationErrors(
      backend.services.tickets.create({
        title: "x",
        description: "ok",
        status: "open",
        priority: "urgent",
        assigneeId: 7,
      }),
    );
    expect(ticketErrors).toEqual({
      title: "tooShort",
      priority: "invalid",
      assigneeId: "invalid",
    });

    const projectErrors = await validationErrors(
      backend.services.projects.create({
        name: "Valid name",
        description: "",
        status: "active",
        dueDate: "2026-02-31",
      }),
    );
    expect(projectErrors).toEqual({ dueDate: "invalid" });

    const ticket = await backend.services.tickets.create({
      title: "Write the docs",
      description: "",
      status: "open",
      priority: "low",
      assigneeId: null,
    });
    expect(ticket.assigneeId).toBeNull();
  });

  it("surfaces network failures and recovers once they stop", async () => {
    backend.network.settings.failing = true;
    await expect(backend.services.tickets.list()).rejects.toMatchObject({
      code: "unavailable",
    });

    backend.network.settings.failing = false;
    await expect(backend.services.tickets.list()).resolves.toMatchObject({ total: 30 });
  });

  it("resets every collection", async () => {
    await backend.services.users.create(validUser);
    const [ticket] = (await backend.services.tickets.list()).items;
    await backend.services.tickets.remove(ticket.id);

    backend.reset();

    expect((await backend.services.users.list()).total).toBe(24);
    expect((await backend.services.tickets.list()).total).toBe(30);
  });
});

describe("error messages", () => {
  it("has a translation for every validation code in both locales", () => {
    for (const code of VALIDATION_CODES) {
      expect(translate("en", `validation.${code}`)).not.toBe(`validation.${code}`);
      expect(translate("pt-BR", `validation.${code}`)).not.toBe(`validation.${code}`);
    }
  });
});
