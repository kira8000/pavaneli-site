import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ApiError } from "@/domain/api-error";
import type { ListQuery, Page } from "@/domain/pagination";
import type { UserFilters, UserSortKey } from "@/domain/user";
import { createMockBackend } from "@/services/mock-backend";
import { toApiError, useListControls, useServiceList } from "./hooks";

type Query = ListQuery<UserFilters, UserSortKey>;

function useControls() {
  return useListControls<UserFilters, UserSortKey>({ sortBy: "name", filters: {} });
}

describe("toApiError", () => {
  it("keeps API errors and reports anything else as unavailable", () => {
    const original = new ApiError("conflict");

    expect(toApiError(original)).toBe(original);
    expect(toApiError(new TypeError("boom")).code).toBe("unavailable");
    expect(toApiError("nope").code).toBe("unavailable");
  });
});

describe("useListControls", () => {
  it("starts on the first page with the initial sort", () => {
    const { result } = renderHook(useControls);

    expect(result.current.query).toMatchObject({
      page: 1,
      sortBy: "name",
      sortDirection: "asc",
      search: "",
      filters: {},
    });
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it("goes back to page 1 when filters, sort or page size change", () => {
    const { result } = renderHook(useControls);

    act(() => result.current.setPage(3));
    expect(result.current.query.page).toBe(3);

    act(() => result.current.setFilter("role", "admin"));
    expect(result.current.query).toMatchObject({ page: 1, filters: { role: "admin" } });
    expect(result.current.hasActiveFilters).toBe(true);

    act(() => result.current.setPage(2));
    act(() => result.current.toggleSort("email"));
    expect(result.current.query.page).toBe(1);

    act(() => result.current.setPage(2));
    act(() => result.current.setPageSize(20));
    expect(result.current.query).toMatchObject({ page: 1, pageSize: 20 });
  });

  it("toggles direction on the same column and resets it on a new one", () => {
    const { result } = renderHook(useControls);

    act(() => result.current.toggleSort("name"));
    expect(result.current.query.sortDirection).toBe("desc");

    act(() => result.current.toggleSort("name"));
    expect(result.current.query.sortDirection).toBe("asc");

    act(() => result.current.toggleSort("name"));
    act(() => result.current.toggleSort("email"));
    expect(result.current.query).toMatchObject({ sortBy: "email", sortDirection: "asc" });
  });

  it("debounces the search term and treats clearing a filter as no filter", async () => {
    const { result } = renderHook(useControls);

    act(() => result.current.setSearchInput("ana"));
    expect(result.current.searchInput).toBe("ana");
    expect(result.current.query.search).toBe("");

    await waitFor(() => expect(result.current.query.search).toBe("ana"));
    expect(result.current.hasActiveFilters).toBe(true);

    act(() => result.current.setSearchInput(""));
    act(() => result.current.setFilter("role", "admin"));
    act(() => result.current.setFilter("role", undefined));
    await waitFor(() => expect(result.current.hasActiveFilters).toBe(false));
  });
});

describe("useServiceList", () => {
  const backend = createMockBackend({ latencyMs: 0 });
  const getService = () => backend.services.users;
  const baseQuery: Query = {
    page: 1,
    pageSize: 5,
    search: "",
    sortDirection: "asc",
    filters: {},
  };

  it("reports loading, then the page", async () => {
    const { result } = renderHook(() => useServiceList(getService, baseQuery, 0));

    expect(result.current.status).toBe("loading");
    expect(result.current.page).toBeUndefined();

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.page?.items).toHaveLength(5);
  });

  it("keeps showing the previous rows while a new query loads", async () => {
    const { result, rerender } = renderHook(
      ({ query }: { query: Query }) => useServiceList(getService, query, 0),
      { initialProps: { query: baseQuery } },
    );
    await waitFor(() => expect(result.current.status).toBe("success"));
    const firstPage = result.current.page;

    rerender({ query: { ...baseQuery, page: 2 } });

    expect(result.current.status).toBe("loading");
    expect(result.current.page).toBe(firstPage);
    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.page?.page).toBe(2);
  });

  it("surfaces failures as ApiError and recovers on reload", async () => {
    backend.network.settings.failing = true;
    const { result } = renderHook(() => useServiceList(getService, baseQuery, 0));

    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.error?.code).toBe("unavailable");
    expect(result.current.page).toBeUndefined();

    backend.network.settings.failing = false;
    act(() => result.current.reload());

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.error).toBeUndefined();
  });

  it("refetches when the external refresh key changes", async () => {
    const list = vi.fn(async (): Promise<Page<never>> => ({
      items: [],
      total: 0,
      page: 1,
      pageSize: 5,
      pageCount: 1,
    }));
    const service = { list } as unknown as ReturnType<typeof getService>;
    const stable = () => service;
    const { result, rerender } = renderHook(
      ({ key }: { key: number }) => useServiceList(stable, baseQuery, key),
      { initialProps: { key: 0 } },
    );
    await waitFor(() => expect(result.current.status).toBe("success"));

    rerender({ key: 1 });

    await waitFor(() => expect(list).toHaveBeenCalledTimes(2));
  });

  it("ignores a response that arrives after the query changed", async () => {
    let resolveFirst: (page: Page<never>) => void = () => {};
    const emptyPage = (total: number): Page<never> => ({
      items: [],
      total,
      page: 1,
      pageSize: 5,
      pageCount: 1,
    });
    const list = vi
      .fn()
      .mockImplementationOnce(() => new Promise((resolve) => (resolveFirst = resolve)))
      .mockResolvedValue(emptyPage(2));
    const service = { list } as unknown as ReturnType<typeof getService>;
    const stable = () => service;
    const { result, rerender } = renderHook(
      ({ query }: { query: Query }) => useServiceList(stable, query, 0),
      { initialProps: { query: baseQuery } },
    );

    rerender({ query: { ...baseQuery, search: "x" } });
    await waitFor(() => expect(result.current.page?.total).toBe(2));

    await act(async () => resolveFirst(emptyPage(99)));

    expect(result.current.page?.total).toBe(2);
  });
});
