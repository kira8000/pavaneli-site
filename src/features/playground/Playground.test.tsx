import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { setLocale } from "@/i18n/locale-store";
import { getMockBackend } from "@/services/mock-backend";
import { Playground } from "./Playground";

const HEADER_ROWS = 1;

describe("Playground", () => {
  beforeEach(() => {
    setLocale("en");
    const backend = getMockBackend();
    backend.reset();
    Object.assign(backend.network.settings, { latencyMs: 0, failing: false });
  });

  it("switches between the demos with the tab list", async () => {
    const user = userEvent.setup();
    render(<Playground />);

    expect(await screen.findByRole("table", { name: "Users" })).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Tickets" }));
    expect(await screen.findByRole("table", { name: "Tickets" })).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "API demo" }));
    expect(screen.getByRole("button", { name: "Send request" })).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "States" }));
    expect(screen.getByText("Pick a scenario")).toBeInTheDocument();
  });

  describe("tickets", () => {
    it("filters by priority and keeps the row count consistent", async () => {
      const user = userEvent.setup();
      render(<Playground />);
      await user.click(screen.getByRole("tab", { name: "Tickets" }));
      await screen.findByRole("table", { name: "Tickets" });

      await user.selectOptions(
        screen.getByRole("combobox", { name: "Priority" }),
        "critical",
      );

      await waitFor(() => {
        const table = within(screen.getByRole("table", { name: "Tickets" }));
        const rows = table.getAllByRole("row").slice(HEADER_ROWS);
        expect(rows.length).toBeGreaterThan(0);
        for (const row of rows) expect(row).toHaveTextContent("Critical");
      });
    });

    it("sorts when a column header is clicked", async () => {
      const user = userEvent.setup();
      render(<Playground />);
      await user.click(screen.getByRole("tab", { name: "Tickets" }));
      const table = within(await screen.findByRole("table", { name: "Tickets" }));

      await user.click(table.getByRole("button", { name: "Title" }));

      expect(screen.getByRole("columnheader", { name: "Title" })).toHaveAttribute(
        "aria-sort",
        "ascending",
      );
      // The header updates immediately; the rows follow once the request settles.
      await waitFor(() => {
        const titles = within(screen.getByRole("table", { name: "Tickets" }))
          .getAllByRole("row")
          .slice(HEADER_ROWS)
          .map((row) => within(row).getAllByRole("cell")[0].textContent ?? "");
        expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
      });
    });
  });

  describe("states", () => {
    async function openStates() {
      const user = userEvent.setup();
      render(<Playground />);
      await user.click(screen.getByRole("tab", { name: "States" }));
      return user;
    }

    it("shows the success state with real data", async () => {
      const user = await openStates();

      await user.click(screen.getByRole("button", { name: "Success" }));

      expect(
        await screen.findByText("Success: first users returned"),
      ).toBeInTheDocument();
    });

    it("shows the empty state", async () => {
      const user = await openStates();

      await user.click(screen.getByRole("button", { name: "Empty result" }));

      expect(await screen.findByText("Empty state")).toBeInTheDocument();
    });

    it("shows the error state and restores the simulated network afterwards", async () => {
      const user = await openStates();

      await user.click(screen.getByRole("button", { name: "Server error" }));

      expect(await screen.findByText("Could not load the data")).toBeInTheDocument();
      expect(getMockBackend().network.settings.failing).toBe(false);
    });

    it("shows a loading state while the slow request is in flight", async () => {
      const user = await openStates();

      await user.click(screen.getByRole("button", { name: "Slow request" }));

      expect(screen.getByText("Loading…")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Success" })).toBeDisabled();
    });
  });

  describe("api demo", () => {
    async function openApi() {
      const user = userEvent.setup();
      render(<Playground />);
      await user.click(screen.getByRole("tab", { name: "API demo" }));
      return user;
    }

    it("prefills a valid body when switching to POST and returns 201", async () => {
      const user = await openApi();

      await user.click(screen.getByRole("radio", { name: "POST" }));
      expect(
        (screen.getByRole("textbox", { name: "JSON body" }) as HTMLTextAreaElement).value,
      ).toContain("ana.teste@example.com");
      await user.click(screen.getByRole("button", { name: "Send request" }));

      expect(await screen.findByText("201")).toBeInTheDocument();
    });

    it("explains a bad request instead of failing silently", async () => {
      const user = await openApi();

      await user.click(screen.getByRole("radio", { name: "PATCH" }));
      await user.click(screen.getByRole("button", { name: "Send request" }));

      expect(await screen.findByText("400")).toBeInTheDocument();
      expect(screen.getByText(/missing_id/)).toBeInTheDocument();
    });

    it("disables the body for methods that do not send one", async () => {
      const user = await openApi();

      expect(screen.getByRole("textbox", { name: "JSON body" })).toBeDisabled();
      await user.click(screen.getByRole("radio", { name: "DELETE" }));
      expect(screen.getByRole("textbox", { name: "JSON body" })).toBeDisabled();
    });

    it("shows the request line for the chosen method and id", async () => {
      const user = await openApi();

      await user.click(screen.getByRole("radio", { name: "DELETE" }));
      await user.type(screen.getByRole("textbox", { name: /Record id/ }), "usr_002");

      expect(screen.getByText("DELETE /users/usr_002")).toBeInTheDocument();
    });
  });

  it("restores the mock data and refreshes the open table", async () => {
    const user = userEvent.setup();
    render(<Playground />);
    await screen.findByRole("table", { name: "Users" });
    await getMockBackend().services.users.remove("usr_001");

    await user.click(screen.getByRole("button", { name: "Reset data" }));

    expect(await screen.findByText("24 results")).toBeInTheDocument();
    expect(await screen.findByText("Mock data restored.")).toBeInTheDocument();
  });
});
