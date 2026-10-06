"use client";

import { Badge } from "@/components/ui/Badge";
import type { Column } from "@/components/ui/DataTable";
import { SelectField, TextField } from "@/components/ui/Field";
import {
  TICKET_PRIORITIES,
  TICKET_STATUSES,
  type Ticket,
  type TicketFilters,
  type TicketPriority,
  type TicketSortKey,
  type TicketStatus,
} from "@/domain/ticket";
import { useLocale, useT } from "@/i18n/locale-store";
import { formatDate } from "@/lib/format";
import { getTicketsService } from "./backend";
import { useListControls, useServiceList } from "./hooks";
import { ResourceTable } from "./ResourceTable";
import { TICKET_PRIORITY_TONE, TICKET_STATUS_TONE } from "./tones";

const ALL = "";
const NO_FILTERS: TicketFilters = {};

/** Read-only second table: same building blocks, different domain. */
export function TicketsTab({ refreshKey }: { refreshKey: number }) {
  const t = useT();
  const locale = useLocale();
  const controls = useListControls<TicketFilters, TicketSortKey>({
    sortBy: "updatedAt",
    sortDirection: "desc",
    filters: NO_FILTERS,
  });
  const list = useServiceList(getTicketsService, controls.query, refreshKey);

  const columns: Column<Ticket, TicketSortKey>[] = [
    {
      id: "title",
      header: t("playground.tickets.columns.title"),
      sortKey: "title",
      cell: (ticket) => <span className="font-medium">{ticket.title}</span>,
    },
    {
      id: "status",
      header: t("playground.tickets.columns.status"),
      sortKey: "status",
      cell: (ticket) => (
        <Badge tone={TICKET_STATUS_TONE[ticket.status]}>
          {t(`playground.tickets.status.${ticket.status}`)}
        </Badge>
      ),
    },
    {
      id: "priority",
      header: t("playground.tickets.columns.priority"),
      sortKey: "priority",
      cell: (ticket) => (
        <Badge tone={TICKET_PRIORITY_TONE[ticket.priority]}>
          {t(`playground.tickets.priority.${ticket.priority}`)}
        </Badge>
      ),
    },
    {
      id: "assignee",
      header: t("playground.tickets.columns.assignee"),
      cell: (ticket) =>
        ticket.assigneeId ? (
          <span className="font-mono text-xs">{ticket.assigneeId}</span>
        ) : (
          <span className="text-subtle">{t("playground.tickets.unassigned")}</span>
        ),
    },
    {
      id: "updatedAt",
      header: t("playground.tickets.columns.updatedAt"),
      sortKey: "updatedAt",
      cell: (ticket) => (
        <span className="text-muted">{formatDate(locale, ticket.updatedAt)}</span>
      ),
    },
  ];

  const statusFilter = [
    { value: ALL, label: t("playground.filters.all") },
    ...TICKET_STATUSES.map((status) => ({
      value: status,
      label: t(`playground.tickets.status.${status}`),
    })),
  ];
  const priorityFilter = [
    { value: ALL, label: t("playground.filters.all") },
    ...TICKET_PRIORITIES.map((priority) => ({
      value: priority,
      label: t(`playground.tickets.priority.${priority}`),
    })),
  ];

  return (
    <div className="space-y-6">
      <p className="text-muted max-w-2xl text-sm">
        {t("playground.tickets.description")}
      </p>

      <div className="flex flex-wrap items-end gap-3">
        <div className="w-full sm:w-64">
          <TextField
            label={t("playground.tickets.search")}
            hideLabel
            type="search"
            placeholder={t("playground.tickets.search")}
            value={controls.searchInput}
            onChange={(event) => controls.setSearchInput(event.target.value)}
          />
        </div>
        <div className="w-40">
          <SelectField
            label={t("playground.tickets.columns.status")}
            value={controls.query.filters.status ?? ALL}
            options={statusFilter}
            onChange={(event) =>
              controls.setFilter(
                "status",
                (event.target.value || undefined) as TicketStatus,
              )
            }
          />
        </div>
        <div className="w-40">
          <SelectField
            label={t("playground.tickets.columns.priority")}
            value={controls.query.filters.priority ?? ALL}
            options={priorityFilter}
            onChange={(event) =>
              controls.setFilter(
                "priority",
                (event.target.value || undefined) as TicketPriority,
              )
            }
          />
        </div>
      </div>

      <ResourceTable
        list={list}
        query={controls.query}
        onSortChange={controls.toggleSort}
        onPageChange={controls.setPage}
        onPageSizeChange={controls.setPageSize}
        columns={columns}
        caption={t("playground.tickets.caption")}
        getLabel={(ticket) => ticket.title}
        hasActiveFilters={controls.hasActiveFilters}
        emptyTitle={t("playground.tickets.emptyTitle")}
        emptyDescription={t("playground.tickets.emptyDescription")}
      />
    </div>
  );
}
