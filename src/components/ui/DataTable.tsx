"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { ReactNode } from "react";
import type { SortDirection } from "@/domain/pagination";
import { useT } from "@/i18n/locale-store";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { SelectField } from "./Field";

export interface Column<TItem, TSortKey extends string> {
  id: string;
  header: string;
  /** Makes the column sortable by this key. */
  sortKey?: TSortKey;
  cell: (item: TItem) => ReactNode;
}

interface DataTableProps<TItem, TSortKey extends string> {
  caption: string;
  columns: readonly Column<TItem, TSortKey>[];
  items: readonly TItem[];
  getId: (item: TItem) => string;
  /** Accessible name of a row, used by its checkbox. */
  getLabel: (item: TItem) => string;
  sortBy?: TSortKey;
  sortDirection: SortDirection;
  /** Called with the clicked key; the owner decides how direction changes. */
  onSortChange: (key: TSortKey) => void;
  selected?: ReadonlySet<string>;
  onSelectedChange?: (ids: Set<string>) => void;
  rowActions?: (item: TItem) => ReactNode;
  /** Dims the rows while a refetch is in flight. */
  busy?: boolean;
}

const CELL = "px-3 py-3 text-left align-middle";
const CHECKBOX = "accent-[var(--accent)] size-4";

function SortIcon({ direction }: { direction?: SortDirection }) {
  const className = "size-3.5";
  if (direction === "asc") return <ArrowUp aria-hidden className={className} />;
  if (direction === "desc") return <ArrowDown aria-hidden className={className} />;
  return <ArrowUpDown aria-hidden className={cn(className, "opacity-50")} />;
}

/**
 * Desktop: a real <table>. Below `md`: stacked cards, because a wide table
 * would force horizontal scrolling and hide the row actions.
 */
export function DataTable<TItem, TSortKey extends string>({
  caption,
  columns,
  items,
  getId,
  getLabel,
  sortBy,
  sortDirection,
  onSortChange,
  selected,
  onSelectedChange,
  rowActions,
  busy,
}: DataTableProps<TItem, TSortKey>) {
  const t = useT();
  const selectable = Boolean(selected && onSelectedChange);
  const allSelected =
    items.length > 0 && items.every((item) => selected?.has(getId(item)));
  const someSelected = !allSelected && items.some((item) => selected?.has(getId(item)));
  const sortableColumns = columns.filter((column) => column.sortKey);

  function toggleAll() {
    onSelectedChange?.(allSelected ? new Set() : new Set(items.map(getId)));
  }

  function toggleOne(id: string) {
    const next = new Set(selected);
    if (!next.delete(id)) next.add(id);
    onSelectedChange?.(next);
  }

  function selectCheckbox(item: TItem) {
    const id = getId(item);
    return (
      <input
        type="checkbox"
        className={CHECKBOX}
        checked={selected?.has(id) ?? false}
        onChange={() => toggleOne(id)}
        aria-label={`${t("playground.table.selectRow")}: ${getLabel(item)}`}
      />
    );
  }

  return (
    <div aria-busy={busy} className={cn("transition-opacity", busy && "opacity-60")}>
      {/* Mobile: sort controls + cards */}
      <div className="md:hidden">
        {sortableColumns.length > 0 && (
          <div className="mb-4 flex items-end gap-2">
            <div className="flex-1">
              <SelectField
                label={t("playground.table.sortBy")}
                value={sortBy ?? ""}
                onChange={(event) => onSortChange(event.target.value as TSortKey)}
                options={sortableColumns.map((column) => ({
                  value: column.sortKey as string,
                  label: column.header,
                }))}
              />
            </div>
            <Button
              variant="secondary"
              size="icon"
              disabled={!sortBy}
              onClick={() => sortBy && onSortChange(sortBy)}
              aria-label={
                sortDirection === "asc"
                  ? t("playground.table.sortedAsc")
                  : t("playground.table.sortedDesc")
              }
            >
              <SortIcon direction={sortDirection} />
            </Button>
          </div>
        )}
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={getId(item)}
              className={cn(
                "border-border bg-surface rounded-md border p-4",
                selected?.has(getId(item)) && "border-accent/60",
              )}
            >
              <div className="flex items-start gap-3">
                {selectable && selectCheckbox(item)}
                <div className="min-w-0 flex-1 font-medium break-words">
                  {columns[0].cell(item)}
                </div>
              </div>
              <dl className="mt-3 space-y-2 text-sm">
                {columns.slice(1).map((column) => (
                  <div
                    key={column.id}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <dt className="text-subtle">{column.header}</dt>
                    <dd className="min-w-0 text-right break-words">
                      {column.cell(item)}
                    </dd>
                  </div>
                ))}
              </dl>
              {rowActions && (
                <div className="border-border mt-3 flex justify-end gap-2 border-t pt-3">
                  {rowActions(item)}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: table */}
      <div className="border-border hidden overflow-x-auto rounded-md border md:block">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-surface text-muted border-border border-b font-mono text-xs">
            <tr>
              {selectable && (
                <th scope="col" className={cn(CELL, "w-10")}>
                  <input
                    type="checkbox"
                    className={CHECKBOX}
                    checked={allSelected}
                    ref={(element) => {
                      if (element) element.indeterminate = someSelected;
                    }}
                    onChange={toggleAll}
                    aria-label={t("playground.table.selectAll")}
                  />
                </th>
              )}
              {columns.map((column) => {
                const active = column.sortKey !== undefined && column.sortKey === sortBy;
                return (
                  <th
                    key={column.id}
                    scope="col"
                    className={CELL}
                    aria-sort={
                      column.sortKey
                        ? active
                          ? sortDirection === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                        : undefined
                    }
                  >
                    {column.sortKey ? (
                      <button
                        type="button"
                        onClick={() => onSortChange(column.sortKey as TSortKey)}
                        className={cn(
                          "hover:text-fg inline-flex items-center gap-1.5 rounded",
                          active && "text-fg",
                        )}
                      >
                        {column.header}
                        <SortIcon direction={active ? sortDirection : undefined} />
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
              {rowActions && (
                <th scope="col" className={cn(CELL, "text-right")}>
                  <span className="sr-only">{t("playground.table.actions")}</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={getId(item)}
                className={cn(
                  "border-border hover:bg-raised/60 border-b last:border-b-0",
                  selected?.has(getId(item)) && "bg-raised",
                )}
              >
                {selectable && <td className={CELL}>{selectCheckbox(item)}</td>}
                {columns.map((column) => (
                  <td key={column.id} className={CELL}>
                    {column.cell(item)}
                  </td>
                ))}
                {rowActions && (
                  <td className={cn(CELL, "text-right")}>
                    <div className="flex justify-end gap-1">{rowActions(item)}</div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
