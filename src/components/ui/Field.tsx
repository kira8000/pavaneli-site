import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

const CONTROL =
  "border-border bg-bg text-fg placeholder:text-subtle h-10 w-full rounded-md border px-3 text-sm aria-[invalid=true]:border-danger disabled:opacity-50";

interface FieldProps {
  label: string;
  /** Already-translated error message; also flips `aria-invalid`. */
  error?: string;
  required?: boolean;
  /** Keeps the label for assistive tech only (e.g. toolbar search). */
  hideLabel?: boolean;
}

interface FieldShellProps extends FieldProps {
  children: (control: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
    "aria-required": boolean | undefined;
  }) => ReactNode;
}

function FieldShell({ label, error, required, hideLabel, children }: FieldShellProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className={cn("text-muted block text-sm font-medium", hideLabel && "sr-only")}
      >
        {label}
        {required && (
          <span aria-hidden className="text-accent ml-1">
            *
          </span>
        )}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
        "aria-required": required || undefined,
      })}
      {error && (
        <p id={errorId} className="text-danger text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = FieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "required" | "id">;

export function TextField({
  label,
  error,
  required,
  hideLabel,
  className,
  ...input
}: TextFieldProps) {
  return (
    <FieldShell label={label} error={error} required={required} hideLabel={hideLabel}>
      {(control) => <input {...control} {...input} className={cn(CONTROL, className)} />}
    </FieldShell>
  );
}

export interface SelectOption {
  value: string;
  label: string;
}

type SelectFieldProps = FieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "required" | "id" | "children"> & {
    options: readonly SelectOption[];
  };

export function SelectField({
  label,
  error,
  required,
  hideLabel,
  options,
  className,
  ...select
}: SelectFieldProps) {
  return (
    <FieldShell label={label} error={error} required={required} hideLabel={hideLabel}>
      {(control) => (
        <select {...control} {...select} className={cn(CONTROL, className)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
}

type TextAreaFieldProps = FieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "required" | "id">;

export function TextAreaField({
  label,
  error,
  required,
  hideLabel,
  className,
  ...textarea
}: TextAreaFieldProps) {
  return (
    <FieldShell label={label} error={error} required={required} hideLabel={hideLabel}>
      {(control) => (
        <textarea
          {...control}
          {...textarea}
          className={cn(CONTROL, "h-auto py-2 font-mono", className)}
        />
      )}
    </FieldShell>
  );
}
