export type SortDirection = "asc" | "desc";

export const PAGE_SIZE_OPTIONS = [5, 10, 20] as const;
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;
export const MAX_SEARCH_LENGTH = 100;

export interface ListQuery<TFilters, TSortKey extends string> {
  page: number;
  pageSize: number;
  search: string;
  sortBy?: TSortKey;
  sortDirection: SortDirection;
  filters: TFilters;
}

/** What callers may pass; everything is optional and sanitized by the service. */
export type ListQueryInput<TFilters, TSortKey extends string> = Partial<
  ListQuery<TFilters, TSortKey>
>;

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

function toPositiveInteger(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1
    ? value
    : fallback;
}

/**
 * Query params come from the UI (URL/inputs), so they are a trust boundary:
 * clamp numbers, cap the search length and reject unknown sort directions.
 */
export function normalizeListQuery<TFilters, TSortKey extends string>(
  input: ListQueryInput<TFilters, TSortKey> | undefined,
  emptyFilters: TFilters,
): ListQuery<TFilters, TSortKey> {
  return {
    page: toPositiveInteger(input?.page, 1),
    pageSize: Math.min(
      toPositiveInteger(input?.pageSize, DEFAULT_PAGE_SIZE),
      MAX_PAGE_SIZE,
    ),
    search: (input?.search ?? "").trim().slice(0, MAX_SEARCH_LENGTH),
    sortBy: input?.sortBy,
    sortDirection: input?.sortDirection === "desc" ? "desc" : "asc",
    filters: input?.filters ?? emptyFilters,
  };
}
