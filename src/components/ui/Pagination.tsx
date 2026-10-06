"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "@/i18n/locale-store";
import { Button } from "./Button";
import { SelectField } from "./Field";

interface PaginationProps {
  page: number;
  pageCount: number;
  pageSize: number;
  pageSizeOptions: readonly number[];
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function Pagination({
  page,
  pageCount,
  pageSize,
  pageSizeOptions,
  total,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const t = useT();

  return (
    <nav
      aria-label={t("playground.pagination.label")}
      className="flex flex-wrap items-center justify-between gap-4"
    >
      <p className="text-muted font-mono text-sm">
        {total} {t("playground.pagination.results")}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-28">
          <SelectField
            label={t("playground.pagination.pageSize")}
            value={String(pageSize)}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            options={pageSizeOptions.map((size) => ({
              value: String(size),
              label: String(size),
            }))}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            aria-label={t("playground.pagination.previous")}
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft aria-hidden className="size-4" />
          </Button>
          <p aria-live="polite" className="font-mono text-sm whitespace-nowrap">
            {t("playground.pagination.page")} {page} {t("playground.pagination.of")}{" "}
            {pageCount}
          </p>
          <Button
            variant="secondary"
            size="icon"
            aria-label={t("playground.pagination.next")}
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight aria-hidden className="size-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
