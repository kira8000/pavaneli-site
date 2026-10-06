import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs } from "./Tabs";

const TABS = [
  { id: "a", label: "First", content: <p>First panel</p> },
  { id: "b", label: "Second", content: <p>Second panel</p> },
  { id: "c", label: "Third", content: <p>Third panel</p> },
];

describe("Tabs", () => {
  it("shows only the active panel and links it to its tab", () => {
    render(<Tabs label="Demos" tabs={TABS} />);

    const tab = screen.getByRole("tab", { name: "First" });
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveAccessibleName("First");
    expect(screen.queryByText("Second panel")).not.toBeInTheDocument();
  });

  it("moves focus and selection with the arrow keys, wrapping around", async () => {
    const user = userEvent.setup();
    render(<Tabs label="Demos" tabs={TABS} />);

    await user.click(screen.getByRole("tab", { name: "First" }));
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Second" })).toHaveFocus();
    expect(screen.getByText("Second panel")).toBeInTheDocument();

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Third" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "First" })).toHaveFocus();
  });

  it("keeps only the selected tab in the tab order", () => {
    render(<Tabs label="Demos" tabs={TABS} />);

    expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tab", { name: "Second" })).toHaveAttribute("tabindex", "-1");
  });
});
