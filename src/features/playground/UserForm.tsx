"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/Field";
import { showToast } from "@/components/ui/toast";
import type { FieldErrors } from "@/domain/api-error";
import {
  USER_ROLES,
  USER_STATUSES,
  type User,
  type UserRole,
  type UserStatus,
} from "@/domain/user";
import { useT } from "@/i18n/locale-store";
import { getUsersService } from "./backend";
import { toApiError } from "./hooks";

interface UserFormProps {
  /** Editing when set, creating otherwise. */
  user: User | null;
  onSaved: () => void;
  onCancel: () => void;
}

interface Values {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

const EMPTY_VALUES: Values = { name: "", email: "", role: "viewer", status: "invited" };

export function UserForm({ user, onSaved, onCancel }: UserFormProps) {
  const t = useT();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(
    user
      ? { name: user.name, email: user.email, role: user.role, status: user.status }
      : EMPTY_VALUES,
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Move focus to the first invalid field so keyboard and screen-reader users land on the problem.
  useEffect(() => {
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors]);

  const fieldError = (field: keyof Values) => {
    const code = errors[field];
    return code ? t(`validation.${code}`) : undefined;
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});
    setFormError(null);

    try {
      const service = getUsersService();
      if (user) await service.update(user.id, values);
      else await service.create(values);
      showToast(
        "success",
        t(user ? "playground.users.updated" : "playground.users.created"),
      );
      onSaved();
    } catch (caught) {
      const error = toApiError(caught);
      const message = t(`apiError.${error.code}`);
      setErrors(error.fieldErrors);
      setFormError(message);
      showToast("error", message);
    } finally {
      setSubmitting(false);
    }
  }

  const roleOptions = USER_ROLES.map((role) => ({
    value: role,
    label: t(`playground.users.role.${role}`),
  }));
  const statusOptions = USER_STATUSES.map((status) => ({
    value: status,
    label: t(`playground.users.status.${status}`),
  }));

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
      <p className="text-subtle text-sm">{t("playground.form.requiredNote")}</p>
      {formError && (
        <p
          role="alert"
          className="border-danger/50 text-danger rounded-md border p-3 text-sm"
        >
          {formError}
        </p>
      )}
      <TextField
        label={t("playground.users.columns.name")}
        required
        autoComplete="off"
        value={values.name}
        error={fieldError("name")}
        onChange={(event) => setValues({ ...values, name: event.target.value })}
      />
      <TextField
        label={t("playground.users.columns.email")}
        type="email"
        required
        autoComplete="off"
        value={values.email}
        error={fieldError("email")}
        onChange={(event) => setValues({ ...values, email: event.target.value })}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label={t("playground.users.columns.role")}
          required
          value={values.role}
          options={roleOptions}
          error={fieldError("role")}
          onChange={(event) =>
            setValues({ ...values, role: event.target.value as UserRole })
          }
        />
        <SelectField
          label={t("playground.users.columns.status")}
          required
          value={values.status}
          options={statusOptions}
          error={fieldError("status")}
          onChange={(event) =>
            setValues({ ...values, status: event.target.value as UserStatus })
          }
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel} disabled={submitting}>
          {t("common.cancel")}
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? t("playground.form.saving") : t("playground.form.save")}
        </Button>
      </div>
    </form>
  );
}
