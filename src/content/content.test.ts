import { describe, expect, it } from "vitest";
import { LOCALES, type LocalizedText } from "@/i18n/config";
import { ALL_SNIPPETS } from "./code-snippets";
import { EDUCATION } from "./education";
import { ENGINEERING_TOPICS } from "./engineering";
import { EXPERIENCE } from "./experience";
import { PROFILE } from "./profile";
import { PROJECTS } from "./projects";
import { TECH_GROUPS } from "./skills";
import { VERSUS } from "./versus";

const YEAR_MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;

function expectBilingual(text: LocalizedText) {
  for (const locale of LOCALES) expect(text[locale].trim()).not.toBe("");
}

function expectUniqueIds(items: readonly { id: string }[]) {
  expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
}

/** These checks protect the "never invent facts" rule from silent regressions. */
describe("portfolio content", () => {
  it("only links to real https URLs and keeps private data out", () => {
    for (const url of Object.values(PROFILE.links)) {
      expect(new URL(url).protocol).toBe("https:");
    }
    expect(PROFILE.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    // The phone number is intentionally not published.
    expect(JSON.stringify(PROFILE)).not.toMatch(/\d{8,}/);
  });

  it("has well-formed, ordered experience entries", () => {
    expectUniqueIds(EXPERIENCE);
    for (const entry of EXPERIENCE) {
      expect(entry.startDate).toMatch(YEAR_MONTH);
      if (entry.endDate) {
        expect(entry.endDate).toMatch(YEAR_MONTH);
        expect(entry.endDate >= entry.startDate, entry.id).toBe(true);
      }
      expectBilingual(entry.role);
      entry.workedOn?.forEach(expectBilingual);
      entry.responsibilities.forEach(expectBilingual);
      entry.highlights?.forEach(expectBilingual);
    }
  });

  it("lists experience from most recent to oldest", () => {
    const starts = EXPERIENCE.map((entry) => entry.startDate);
    expect(starts).toEqual([...starts].sort().reverse());
  });

  it("has well-formed education entries", () => {
    expectUniqueIds(EDUCATION);
    for (const entry of EDUCATION) {
      expect(entry.startDate).toMatch(YEAR_MONTH);
      expect(entry.endDate).toMatch(YEAR_MONTH);
      expect(entry.endDate >= entry.startDate, entry.id).toBe(true);
      expectBilingual(entry.course);
    }
  });

  it("never renders placeholder links for projects", () => {
    expectUniqueIds(PROJECTS);
    for (const project of PROJECTS) {
      expectBilingual(project.description);
      for (const url of Object.values(project.links)) {
        expect(new URL(url).protocol).toBe("https:");
      }
    }
  });

  it("keeps the Versus case study bilingual and never invents public repo URLs", () => {
    expectBilingual(VERSUS.summary);
    expectBilingual(VERSUS.problem);
    expectBilingual(VERSUS.architecture);
    VERSUS.implemented.forEach(expectBilingual);
    VERSUS.inDevelopment.forEach(expectBilingual);
    VERSUS.planned.forEach(expectBilingual);
    for (const repo of VERSUS.repos) {
      expectBilingual(repo.label);
      expect(new URL(repo.href).protocol).toBe("https:");
    }
  });

  it("has no duplicated technology inside a group", () => {
    for (const group of TECH_GROUPS) {
      expect(new Set(group.items).size, group.titleKey).toBe(group.items.length);
    }
  });
});

describe("engineering content", () => {
  it("has unique topics, each with at least one point", () => {
    expectUniqueIds(ENGINEERING_TOPICS);
    for (const topic of ENGINEERING_TOPICS) {
      expect(topic.pointKeys.length, topic.id).toBeGreaterThan(0);
    }
  });

  it("labels every code snippet and never ships an empty one", () => {
    expect(ALL_SNIPPETS.length).toBeGreaterThan(0);
    for (const snippet of ALL_SNIPPETS) {
      expect(["illustrative", "repository"]).toContain(snippet.origin);
      expect(snippet.source.trim()).not.toBe("");
      expect(snippet.fileName).not.toBe("");
    }
  });

  it("flags the topics that are only conceptual", () => {
    const withNote = ENGINEERING_TOPICS.filter((topic) => topic.noteKey).map(
      (topic) => topic.id,
    );
    // Database (no real DB), Testing (no E2E) and Security (no auth) must say so.
    expect(withNote).toEqual(expect.arrayContaining(["database", "testing", "security"]));
    expect(ENGINEERING_TOPICS.find((topic) => topic.id === "database")?.conceptual).toBe(
      true,
    );
  });
});
