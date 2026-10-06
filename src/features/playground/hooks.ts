"use client";

import { useEffect, useMemo, useState } from "react";
import { ApiError, isApiError } from "@/domain/api-error";
import type { Stored } from "@/domain/entity";
import {
  DEFAULT_PAGE_SIZE,
  type ListQuery,
  type Page,
  type SortDirection,
} from "@/domain/pagination";
import type { CrudService } from "@/services/crud-service";

const SEARCH_DEBOUNCE_MS = 300;

/** Anything that is not an `ApiError` is reported as the service being unavailable. */
export function toApiError(error: unknown): ApiError {
  return isApiError(error) ? error : new ApiError("unavailable");
}

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

interface ListControlsInit<TFilters, TSortKey extends string> {
  sortBy: TSortKey;
  sortDirection?: SortDirection;
  filters: TFilters;
}

/**
 * Table state (search, filters, sort, pagination). Changing anything that
 * narrows or reorders the result goes back to page 1 in the same update, so
 * no effect is needed to "fix" the page afterwards.
 */
export function useListControls<TFilters, TSortKey extends string>(
  init: ListControlsInit<TFilters, TSortKey>,
) {
  const [searchInput, setSearchInput] = useState("");
  const [state, setState] = useState({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: init.sortBy,
    sortDirection: init.sortDirection ?? "asc",
    filters: init.filters,
  });
  const search = useDebouncedValue(searchInput, SEARCH_DEBOUNCE_MS);

  const query = useMemo<ListQuery<TFilters, TSortKey>>(
    () => ({ ...state, search }),
    [state, search],
  );

  return {
    query,
    searchInput,
    hasActiveFilters:
      search !== "" || JSON.stringify(state.filters) !== JSON.stringify(init.filters),
    setSearchInput(value: string) {
      setSearchInput(value);
      setState((current) => ({ ...current, page: 1 }));
    },
    setFilter<K extends keyof TFilters>(key: K, value: TFilters[K]) {
      setState((current) => ({
        ...current,
        page: 1,
        filters: { ...current.filters, [key]: value },
      }));
    },
    toggleSort(key: TSortKey) {
      setState((current) => ({
        ...current,
        page: 1,
        sortBy: key,
        sortDirection:
          current.sortBy === key && current.sortDirection === "asc" ? "desc" : "asc",
      }));
    },
    setPage(page: number) {
      setState((current) => ({ ...current, page }));
    },
    setPageSize(pageSize: number) {
      setState((current) => ({ ...current, page: 1, pageSize }));
    },
  };
}

type Outcome<T> =
  { page: Page<T>; error?: undefined } | { page?: undefined; error: ApiError };

interface Settled<T, TQuery> {
  query: TQuery;
  version: string;
  outcome: Outcome<T>;
}

export type ListStatus = "loading" | "error" | "success";

/**
 * Fetches a list through a service. `loading` is derived (the last settled
 * request does not match the current query/version) instead of being set
 * inside the effect, and the previous rows stay available while refetching.
 *
 * `getService` must be a stable function that reads the backend lazily: the
 * mock backend is browser-only state, so it is never touched during render.
 */
export function useServiceList<TInput, TFilters, TSortKey extends string>(
  getService: () => CrudService<TInput, TFilters, TSortKey>,
  query: ListQuery<TFilters, TSortKey>,
  refreshKey: number,
) {
  const [reloads, setReloads] = useState(0);
  const [settled, setSettled] = useState<Settled<
    Stored<TInput>,
    ListQuery<TFilters, TSortKey>
  > | null>(null);
  const version = `${refreshKey}:${reloads}`;

  useEffect(() => {
    let current = true;
    getService()
      .list(query)
      .then(
        (page) => current && setSettled({ query, version, outcome: { page } }),
        (error: unknown) =>
          current &&
          setSettled({ query, version, outcome: { error: toApiError(error) } }),
      );
    return () => {
      current = false;
    };
  }, [getService, query, version]);

  const isCurrent = settled?.query === query && settled.version === version;
  const status: ListStatus = !isCurrent
    ? "loading"
    : settled.outcome.error
      ? "error"
      : "success";

  return {
    status,
    /** Latest successful page, kept (stale) while a new request is in flight. */
    page: settled?.outcome.page,
    error: settled?.outcome.error,
    reload: () => setReloads((count) => count + 1),
  };
}
