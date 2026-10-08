import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { setLocale } from "@/i18n/locale-store";
import { VersusCaseStudy } from "./VersusCaseStudy";

describe("VersusCaseStudy", () => {
  beforeEach(() => setLocale("en"));

  it("presents the case study with implemented vs planned scope, without fake public links", () => {
    render(<VersusCaseStudy />);

    expect(screen.getByRole("heading", { level: 2, name: "Versus" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Implemented" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Planned" })).toBeInTheDocument();
    expect(
      screen.getByText("The source repositories are not public yet."),
    ).toBeInTheDocument();
    expect(screen.getByText("No public demo yet.")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /github.com/i })).toBeNull();
  });
});
