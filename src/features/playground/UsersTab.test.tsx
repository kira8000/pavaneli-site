import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ToastRegion } from "@/components/ui/toast";
import { setLocale } from "@/i18n/locale-store";
import { getMockBackend } from "@/services/mock-backend";
import { UsersTab } from "./UsersTab";

const PAGE_SIZE = 10;
const HEADER_ROWS = 1;

function renderTab() {
  return render(
    <>
      <UsersTab refreshKey={0} />
      <ToastRegion />
    </>,
  );
}

async function findTable() {
  return within(await screen.findByRole("table"));
}

describe("UsersTab", () => {
  beforeEach(() => {
    setLocale("en");
    const backend = getMockBackend();
    backend.reset();
    Object.assign(backend.network.settings, { latencyMs: 0, failing: false });
  });

  it("loads the first page of users", async () => {
    renderTab();

    const table = await findTable();
    expect(table.getAllByRole("row")).toHaveLength(PAGE_SIZE + HEADER_ROWS);
    expect(screen.getByText("24 results")).toBeInTheDocument();
  });

  it("narrows the list as the visitor searches", async () => {
    const user = userEvent.setup();
    renderTab();
    await findTable();

    await user.type(screen.getByRole("searchbox"), "joao");

    await waitFor(async () => {
      const rows = (await findTable()).getAllByRole("row");
      expect(rows.length).toBeGreaterThan(HEADER_ROWS);
      expect(rows.length).toBeLessThan(PAGE_SIZE);
    });
    for (const row of (await findTable()).getAllByRole("row").slice(HEADER_ROWS)) {
      expect(row).toHaveTextContent("João");
    }
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    renderTab();
    await findTable();

    await user.type(screen.getByRole("searchbox"), "zzzz-no-match");

    expect(await screen.findByText("No results")).toBeInTheDocument();
  });

  it("validates the form, focuses the first error and creates the user", async () => {
    const user = userEvent.setup();
    renderTab();
    await findTable();

    await user.click(screen.getByRole("button", { name: "New user" }));
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findAllByText("This field is required.")).toHaveLength(2);
    expect(screen.getByLabelText(/^Name/)).toHaveFocus();
    expect(screen.getByLabelText(/^Name/)).toBeInvalid();

    await user.type(screen.getByLabelText(/^Name/), "Nova Pessoa");
    await user.type(screen.getByLabelText(/^Email/), "nova.pessoa@example.com");
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("User created.")).toBeInTheDocument();
    const created = await getMockBackend().services.users.list({ search: "Nova Pessoa" });
    expect(created.total).toBe(1);
  });

  it("reports a duplicate email on the field", async () => {
    const user = userEvent.setup();
    renderTab();
    const [{ email }] = (await getMockBackend().services.users.list()).items;
    await findTable();

    await user.click(screen.getByRole("button", { name: "New user" }));
    await user.type(screen.getByLabelText(/^Name/), "Someone Else");
    await user.type(screen.getByLabelText(/^Email/), email);
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(await screen.findByText("This value is already in use.")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/)).toBeInvalid();
  });

  it("deletes the selected users after confirmation", async () => {
    const user = userEvent.setup();
    renderTab();
    const table = await findTable();

    const [, first, second] = table.getAllByRole("checkbox");
    await user.click(first);
    await user.click(second);
    await user.click(screen.getByRole("button", { name: /Delete selected \(2\)/ }));
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", { name: "Delete" }),
    );

    expect(await screen.findByText("Users deleted: 2")).toBeInTheDocument();
    expect((await getMockBackend().services.users.list()).total).toBe(22);
  });

  it("shows an error state and recovers on retry", async () => {
    const user = userEvent.setup();
    const { network } = getMockBackend();
    network.settings.failing = true;
    renderTab();

    // Not `getByRole("alert")`: toasts from earlier tests may still be on screen.
    const title = await screen.findByText("Could not load the data");
    expect(title.closest('[role="alert"]')).toHaveTextContent(
      "The service is unavailable.",
    );

    network.settings.failing = false;
    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(await findTable()).toBeDefined();
  });
});
