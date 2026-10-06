import { describe, expect, it } from "vitest";
import {
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MAX_SEARCH_LENGTH,
  normalizeListQuery,
} from "./pagination";

describe("normalizeListQuery", () => {
  it("fills defaults when nothing is provided", () => {
    expect(normalizeListQuery(undefined, {})).toEqual({
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      search: "",
      sortBy: undefined,
      sortDirection: "asc",
      filters: {},
    });
  });

  it("rejects invalid numbers and clamps the page size", () => {
    expect(normalizeListQuery({ page: 0, pageSize: -3 }, {})).toMatchObject({
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
    expect(normalizeListQuery({ page: 1.5, pageSize: Number.NaN }, {})).toMatchObject({
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
    expect(normalizeListQuery({ pageSize: 10_000 }, {}).pageSize).toBe(MAX_PAGE_SIZE);
  });

  it("trims and caps the search term", () => {
    expect(normalizeListQuery({ search: "  ana  " }, {}).search).toBe("ana");
    const long = "a".repeat(MAX_SEARCH_LENGTH + 20);
    expect(normalizeListQuery({ search: long }, {}).search).toHaveLength(
      MAX_SEARCH_LENGTH,
    );
  });

  it("only accepts a known sort direction", () => {
    expect(normalizeListQuery({ sortDirection: "desc" }, {}).sortDirection).toBe("desc");
    expect(
      normalizeListQuery({ sortDirection: "sideways" as unknown as "asc" }, {})
        .sortDirection,
    ).toBe("asc");
  });
});
