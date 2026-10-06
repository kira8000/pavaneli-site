import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { setLocale } from "@/i18n/locale-store";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { CommandPalette, filterCommands } from "./CommandPalette";

const push = vi.hoisted(() => vi.fn());
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

async function openPalette() {
  const user = userEvent.setup();
  render(<CommandPalette />);
  await user.click(screen.getByRole("button", { name: "Open command palette" }));
  return user;
}

describe("filterCommands", () => {
  const items = [{ label: "Home" }, { label: "Experiência" }, { label: "Toggle theme" }];

  it("returns every command when the query is empty", () => {
    expect(filterCommands(items, "  ")).toEqual(items);
  });

  it("matches without regard to accents or case", () => {
    expect(filterCommands(items, "EXPERIENCIA").map((item) => item.label)).toEqual([
      "Experiência",
    ]);
  });
});

describe("CommandPalette", () => {
  beforeEach(() => {
    push.mockReset();
    setLocale("en");
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("opens from the toolbar and lists pages plus actions", async () => {
    await openPalette();

    const dialog = screen.getByRole("dialog", { name: "Command palette" });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("option", { name: "Home" })).toBeInTheDocument();
    expect(
      within(dialog).getByRole("option", { name: "Toggle theme" }),
    ).toBeInTheDocument();
    expect(within(dialog).getByRole("combobox")).toHaveFocus();
  });

  it("filters as the visitor types", async () => {
    const user = await openPalette();

    await user.type(screen.getByRole("combobox"), "play");

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent("Playground");
  });

  it("shows an empty state when nothing matches", async () => {
    const user = await openPalette();

    await user.type(screen.getByRole("combobox"), "zzzz");

    expect(screen.getByRole("status")).toHaveTextContent("No matching commands.");
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });

  it("moves the active option with the arrow keys and runs it with Enter", async () => {
    const user = await openPalette();
    const input = screen.getByRole("combobox");

    await user.type(input, "about");
    await user.keyboard("{Enter}");

    expect(push).toHaveBeenCalledWith("/about");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("jumps to the first and last options with Home and End", async () => {
    const user = await openPalette();

    await user.keyboard("{End}");
    const last = screen.getAllByRole("option").at(-1);
    expect(last).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Home}");
    expect(screen.getAllByRole("option")[0]).toHaveAttribute("aria-selected", "true");
  });

  it("toggles the theme without leaving the page", async () => {
    const user = await openPalette();

    await user.click(screen.getByRole("option", { name: "Toggle theme" }));

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(push).not.toHaveBeenCalled();
  });

  it("opens and closes from Ctrl+K", async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);

    await user.keyboard("{Control>}k{/Control}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Control>}k{/Control}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not open on top of another dialog", async () => {
    const user = userEvent.setup();
    render(
      <>
        <dialog open>
          <p>Already open</p>
        </dialog>
        <CommandPalette />
      </>,
    );

    await user.keyboard("{Control>}k{/Control}");

    expect(
      screen.queryByRole("dialog", { name: "Command palette" }),
    ).not.toBeInTheDocument();
  });
});
