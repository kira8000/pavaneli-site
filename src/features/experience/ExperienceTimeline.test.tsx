import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import type { ExperienceEntry } from "@/content/types";
import { setLocale } from "@/i18n/locale-store";
import { ExperienceTimeline } from "./ExperienceTimeline";

// Fixtures only exercise the component; they are not real career data.
const entries: ExperienceEntry[] = [
  {
    id: "older",
    company: "Company A",
    role: { en: "Role A", "pt-BR": "Cargo A" },
    startDate: "2020-03",
    endDate: "2021-06",
    technologies: ["TypeScript"],
    responsibilities: [{ en: "Did A things", "pt-BR": "Fez coisas A" }],
  },
  {
    id: "newer",
    company: "Company B",
    role: { en: "Role B", "pt-BR": "Cargo B" },
    startDate: "2022-01",
    endDate: null,
    technologies: ["React.js"],
    responsibilities: [{ en: "Did B things", "pt-BR": "Fez coisas B" }],
  },
];

describe("ExperienceTimeline", () => {
  beforeEach(() => setLocale("en"));

  it("shows an empty state when there are no entries", () => {
    render(<ExperienceTimeline entries={[]} />);

    expect(screen.getByText("Experience details coming soon")).toBeInTheDocument();
  });

  it("lists newest first and opens only the most recent entry", () => {
    render(<ExperienceTimeline entries={entries} />);

    const toggles = screen.getAllByRole("button");
    expect(toggles[0]).toHaveTextContent("Company B");
    expect(toggles[0]).toHaveAttribute("aria-expanded", "true");
    expect(toggles[1]).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Did B things")).toBeVisible();
    expect(screen.getByText("Did A things")).not.toBeVisible();
  });

  it("expands another entry on click and shows the period with 'Present' for the current role", async () => {
    const user = userEvent.setup();
    render(<ExperienceTimeline entries={entries} />);

    expect(screen.getByText(/Jan 2022 – Present/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Company A/ }));

    expect(screen.getByText("Did A things")).toBeVisible();
    expect(screen.getByText("Did B things")).not.toBeVisible();
  });

  it("localizes role and period when the language changes", () => {
    setLocale("pt-BR");
    render(<ExperienceTimeline entries={entries} />);

    expect(screen.getByText("Cargo B")).toBeInTheDocument();
    expect(screen.getByText(/Atual/)).toBeInTheDocument();
  });
});
