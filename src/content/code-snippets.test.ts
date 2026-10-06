import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_SNIPPETS } from "./code-snippets";

const SRC_DIR = path.resolve(__dirname, "..");
// Snippets are excerpts: a line containing "..." stands for omitted code.
const OMISSION_MARKER = "...";

function findSourceFile(fileName: string): string | undefined {
  const files = readdirSync(SRC_DIR, { recursive: true, encoding: "utf8" });
  const match = files.find((file) => file.replaceAll("\\", "/").endsWith(fileName));
  return match && path.join(SRC_DIR, match);
}

function lineSet(text: string): Set<string> {
  return new Set(text.split("\n").map((line) => line.trim()));
}

/**
 * "From this repository" is a claim. If the real file changes and the snippet
 * does not, the page would show code that no longer exists, so this fails loudly.
 */
describe('snippets labeled "From this repository"', () => {
  const repositorySnippets = ALL_SNIPPETS.filter(
    (snippet) => snippet.origin === "repository",
  );

  it("exist", () => {
    expect(repositorySnippets.length).toBeGreaterThan(0);
  });

  for (const snippet of repositorySnippets) {
    it(`${snippet.fileName} still contains every excerpted line`, () => {
      const file = findSourceFile(snippet.fileName);
      expect(file, `${snippet.fileName} not found under src/`).toBeDefined();

      const actual = lineSet(readFileSync(file as string, "utf8"));
      const missing = snippet.source
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "" && !line.includes(OMISSION_MARKER))
        .filter((line) => !actual.has(line));

      expect(missing).toEqual([]);
    });
  }
});
