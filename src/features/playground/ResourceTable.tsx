"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Pagination } from "@/components/ui/Pagination";
import { Skeleton } from "@/components/ui/Skeleton";
import { PAGE_SIZE_OPTIONS, type ListQuery, type Page } from "@/domain/pagination";
import { useT } from "@/i18n/locale-store";
import type { ApiError } from "@/domain/api-error";
import type { ListStatus } from "./hooks";

const SKELETON_ROWS = 5;

interface ResourceTableProps<TItem extends { id: string }, TSortKey extends string> {
  list: {
    status: ListStatus;
    page?: Page<TItem>;
    error?: ApiError;
    reload: () => void;
  };
  query: Pick<ListQuery<unknown, TSortKey>, "sortBy" | "sortDirection" | "pageSize">;
  onSortChange: (key: TSortKey) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  columns: readonly Column<TItem, TSortKey>[];
  caption: string;
  getLabel: (item: TItem) => string;
  hasActiveFilters: boolean;
  emptyTitle: string;
  emptyDescription: string;
  selected?: ReadonlySet<string>;
  onSelectedChange?: (ids: Set<string>) => void;
  rowActions?: (item: TItem) => ReactNode;
}

function LoadingRows({ label }: { label: string }) {
  return (
    <div role="status" className="space-y-3">
      <span className="sr-only">{label}</span>
      {Array.from({ length: SKELETON_ROWS }, (_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
    </div>
  );
}

/** Chooses between loading, error, empty and data views for any list demo. */
export function ResourceTable<TItem extends { id: string }, TSortKey extends string>({
  list,
  query,
  onSortChange,
  onPageChange,
  onPageSizeChange,
  columns,
  caption,
  getLabel,
  hasActiveFilters,
  emptyTitle,
  emptyDescription,
  selected,
  onSelectedChange,
  rowActions,
}: ResourceTableProps<TItem, TSortKey>) {
  const t = useT();
  const { status, page, error } = list;

  if (status === "error" && error) {
    return (
      <ErrorState
        title={t("playground.error.title")}
        description={t(`apiError.${error.code}`)}
        action={<Button onClick={list.reload}>{t("common.retry")}</Button>}
      />
    );
  }

  const loading = status === "loading";
  if (!page || (loading && page.total === 0)) {
    return <LoadingRows label={t("playground.loading")} />;
  }

  if (page.total === 0) {
    return (
      <EmptyState
        title={hasActiveFilters ? t("playground.empty.noMatchTitle") : emptyTitle}
        description={
          hasActiveFilters ? t("playground.empty.noMatchDescription") : emptyDescription
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <DataTable
        caption={caption}
        columns={columns}
        items={page.items}
        getId={(item) => item.id}
        getLabel={getLabel}
        sortBy={query.sortBy}
        sortDirection={query.sortDirection}
        onSortChange={onSortChange}
        selected={selected}
        onSelectedChange={onSelectedChange}
        rowActions={rowActions}
        busy={status === "loading"}
      />
      <Pagination
        page={page.page}
        pageCount={page.pageCount}
        pageSize={query.pageSize}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        total={page.total}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
