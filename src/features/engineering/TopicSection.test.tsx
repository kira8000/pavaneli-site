import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ENGINEERING_TOPICS } from "@/content/engineering";
import { setLocale } from "@/i18n/locale-store";
import { TopicSection } from "./TopicSection";

function topicById(id: string) {
  const topic = ENGINEERING_TOPICS.find((candidate) => candidate.id === id);
  if (!topic) throw new Error(`Unknown topic: ${id}`);
  return topic;
}

describe("TopicSection", () => {
  beforeEach(() => setLocale("en"));

  it("renders the heading, its points, the flow and a labeled code sample", () => {
    render(<TopicSection topic={topicById("backend")} />);

    expect(
      screen.getByRole("heading", { level: 2, name: /Backend architecture/ }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Controllers handle HTTP/)).toBeInTheDocument();
    expect(screen.getByText("Middleware")).toBeInTheDocument();
    expect(
      screen.getByText("users.controller.ts + users.service.ts"),
    ).toBeInTheDocument();
    expect(screen.getByText("Illustrative")).toBeInTheDocument();
  });

  it("flags conceptual-only topics instead of implying a real database", () => {
    render(<TopicSection topic={topicById("database")} />);

    expect(screen.getByText("Conceptual")).toBeInTheDocument();
    expect(
      screen.getByText(/does not use a real PostgreSQL database/),
    ).toBeInTheDocument();
  });

  it("marks real excerpts as coming from this repository, in the active language", () => {
    setLocale("pt-BR");
    render(<TopicSection topic={topicById("testing")} />);

    expect(screen.getByText("Deste repositório")).toBeInTheDocument();
  });

  it("has unique topic ids so section landmarks never collide", () => {
    const ids = ENGINEERING_TOPICS.map((topic) => topic.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
