"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Column } from "@/components/ui/DataTable";
import { SelectField, TextField } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { showToast } from "@/components/ui/toast";
import {
  USER_ROLES,
  USER_STATUSES,
  type User,
  type UserFilters,
  type UserSortKey,
} from "@/domain/user";
import { useLocale, useT } from "@/i18n/locale-store";
import { formatDate } from "@/lib/format";
import { getUsersService } from "./backend";
import { useListControls, useServiceList } from "./hooks";
import { ResourceTable } from "./ResourceTable";
import { USER_ROLE_TONE, USER_STATUS_TONE } from "./tones";
import { UserForm } from "./UserForm";

const ALL = "";
const NO_FILTERS: UserFilters = {};

interface FormDialog {
  open: boolean;
  user: User | null;
  /** Remounts the form on every open so its state starts clean. */
  key: number;
}

interface DeleteDialog {
  open: boolean;
  targets: { id: string; name: string }[];
}

export function UsersTab({ refreshKey }: { refreshKey: number }) {
  const t = useT();
  const locale = useLocale();
  const controls = useListControls<UserFilters, UserSortKey>({
    sortBy: "name",
    filters: NO_FILTERS,
  });
  const list = useServiceList(getUsersService, controls.query, refreshKey);

  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(new Set());
  const [formDialog, setFormDialog] = useState<FormDialog>({
    open: false,
    user: null,
    key: 0,
  });
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialog>({
    open: false,
    targets: [],
  });
  const [deleting, setDeleting] = useState(false);

  // Only rows currently on screen can be selected, so a stale selection never lingers.
  const visibleIds = new Set(list.page?.items.map((user) => user.id));
  const selected = new Set([...selectedIds].filter((id) => visibleIds.has(id)));

  const columns: Column<User, UserSortKey>[] = [
    {
      id: "name",
      header: t("playground.users.columns.name"),
      sortKey: "name",
      cell: (user) => <span className="font-medium">{user.name}</span>,
    },
    {
      id: "email",
      header: t("playground.users.columns.email"),
      sortKey: "email",
      cell: (user) => <span className="text-muted break-all">{user.email}</span>,
    },
    {
      id: "role",
      header: t("playground.users.columns.role"),
      sortKey: "role",
      cell: (user) => (
        <Badge tone={USER_ROLE_TONE[user.role]}>
          {t(`playground.users.role.${user.role}`)}
        </Badge>
      ),
    },
    {
      id: "status",
      header: t("playground.users.columns.status"),
      sortKey: "status",
      cell: (user) => (
        <Badge tone={USER_STATUS_TONE[user.status]}>
          {t(`playground.users.status.${user.status}`)}
        </Badge>
      ),
    },
    {
      id: "createdAt",
      header: t("playground.users.columns.createdAt"),
      sortKey: "createdAt",
      cell: (user) => (
        <span className="text-muted">{formatDate(locale, user.createdAt)}</span>
      ),
    },
  ];

  function openForm(user: User | null) {
    setFormDialog((current) => ({ open: true, user, key: current.key + 1 }));
  }

  function closeForm() {
    setFormDialog((current) => ({ ...current, open: false }));
  }

  function askToDelete(users: Pick<User, "id" | "name">[]) {
    setDeleteDialog({
      open: true,
      targets: users.map(({ id, name }) => ({ id, name })),
    });
  }

  async function confirmDelete() {
    setDeleting(true);
    const service = getUsersService();
    const results = await Promise.allSettled(
      deleteDialog.targets.map((target) => service.remove(target.id)),
    );
    const removed = results.filter((result) => result.status === "fulfilled").length;
    const failed = results.length - removed;

    if (removed > 0) {
      showToast("success", `${t("playground.users.deletedCount")} ${removed}`);
    }
    if (failed > 0) {
      showToast("error", `${t("playground.users.deleteFailedCount")} ${failed}`);
    }
    setDeleting(false);
    setDeleteDialog((current) => ({ ...current, open: false }));
    setSelectedIds(new Set());
    list.reload();
  }

  const roleFilter = [
    { value: ALL, label: t("playground.filters.all") },
    ...USER_ROLES.map((role) => ({
      value: role,
      label: t(`playground.users.role.${role}`),
    })),
  ];
  const statusFilter = [
    { value: ALL, label: t("playground.filters.all") },
    ...USER_STATUSES.map((status) => ({
      value: status,
      label: t(`playground.users.status.${status}`),
    })),
  ];

  const selectedUsers = list.page?.items.filter((user) => selected.has(user.id)) ?? [];
  const singleTarget = deleteDialog.targets.length === 1 ? deleteDialog.targets[0] : null;

  return (
    <div className="space-y-6">
      <p className="text-muted max-w-2xl text-sm">{t("playground.users.description")}</p>

      <div className="flex flex-wrap items-end gap-3">
        <div className="w-full sm:w-64">
          <TextField
            label={t("playground.users.search")}
            hideLabel
            type="search"
            placeholder={t("playground.users.search")}
            value={controls.searchInput}
            onChange={(event) => controls.setSearchInput(event.target.value)}
          />
        </div>
        <div className="w-36">
          <SelectField
            label={t("playground.users.columns.role")}
            value={controls.query.filters.role ?? ALL}
            options={roleFilter}
            onChange={(event) =>
              controls.setFilter(
                "role",
                (event.target.value || undefined) as User["role"],
              )
            }
          />
        </div>
        <div className="w-36">
          <SelectField
            label={t("playground.users.columns.status")}
            value={controls.query.filters.status ?? ALL}
            options={statusFilter}
            onChange={(event) =>
              controls.setFilter(
                "status",
                (event.target.value || undefined) as User["status"],
              )
            }
          />
        </div>
        <div className="flex flex-1 flex-wrap justify-end gap-2">
          {selectedUsers.length > 0 && (
            <Button onClick={() => askToDelete(selectedUsers)}>
              <Trash2 aria-hidden className="size-4" />
              {t("playground.users.deleteSelected")} ({selectedUsers.length})
            </Button>
          )}
          <Button variant="primary" onClick={() => openForm(null)}>
            <Plus aria-hidden className="size-4" />
            {t("playground.users.new")}
          </Button>
        </div>
      </div>

      <ResourceTable
        list={list}
        query={controls.query}
        onSortChange={controls.toggleSort}
        onPageChange={controls.setPage}
        onPageSizeChange={controls.setPageSize}
        columns={columns}
        caption={t("playground.users.caption")}
        getLabel={(user) => user.name}
        hasActiveFilters={controls.hasActiveFilters}
        emptyTitle={t("playground.users.emptyTitle")}
        emptyDescription={t("playground.users.emptyDescription")}
        selected={selected}
        onSelectedChange={setSelectedIds}
        rowActions={(user) => (
          <>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`${t("common.edit")}: ${user.name}`}
              onClick={() => openForm(user)}
            >
              <Pencil aria-hidden className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`${t("common.delete")}: ${user.name}`}
              onClick={() => askToDelete([user])}
            >
              <Trash2 aria-hidden className="size-4" />
            </Button>
          </>
        )}
      />

      <Modal
        open={formDialog.open}
        onClose={closeForm}
        title={
          formDialog.user ? t("playground.users.editTitle") : t("playground.users.new")
        }
      >
        {formDialog.key > 0 && (
          <UserForm
            key={formDialog.key}
            user={formDialog.user}
            onCancel={closeForm}
            onSaved={() => {
              closeForm();
              list.reload();
            }}
          />
        )}
      </Modal>

      <Modal
        open={deleteDialog.open}
        onClose={() => setDeleteDialog((current) => ({ ...current, open: false }))}
        title={
          singleTarget
            ? t("playground.users.deleteTitle")
            : t("playground.users.deleteManyTitle")
        }
      >
        <p className="text-muted text-sm">
          {singleTarget
            ? `${singleTarget.name} — ${t("playground.users.deleteBody")}`
            : `${deleteDialog.targets.length} ${t("playground.users.deleteManyBody")}`}
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="ghost"
            disabled={deleting}
            onClick={() => setDeleteDialog((current) => ({ ...current, open: false }))}
          >
            {t("common.cancel")}
          </Button>
          <Button
            variant="primary"
            disabled={deleting}
            aria-busy={deleting}
            onClick={confirmDelete}
          >
            {deleting ? t("playground.users.deleting") : t("common.delete")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
