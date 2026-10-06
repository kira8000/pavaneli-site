import { z } from "zod";
import {
  ApiError,
  VALIDATION_CODES,
  type FieldErrors,
  type ValidationCode,
} from "./api-error";

const FALLBACK_CODE: ValidationCode = "invalid";

function isValidationCode(value: string): value is ValidationCode {
  return (VALIDATION_CODES as readonly string[]).includes(value);
}

/** Schemas use validation codes as messages; anything else degrades to "invalid". */
function toFieldErrors(issues: readonly z.core.$ZodIssue[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const field = String(issue.path[0] ?? "");
    if (field in errors) continue; // first issue per field is the most relevant
    errors[field] = isValidationCode(issue.message) ? issue.message : FALLBACK_CODE;
  }
  return errors;
}

/** Parses untrusted input; throws an `ApiError("validation")` with per-field codes. */
export function parseInput<TSchema extends z.ZodType>(
  schema: TSchema,
  data: unknown,
): z.output<TSchema> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ApiError("validation", toFieldErrors(result.error.issues));
  }
  return result.data;
}

/** Trimmed string with required/min/max rules reported as validation codes. */
export function text(min: number, max: number) {
  return z
    .string({ error: "required" })
    .trim()
    .min(1, "required")
    .min(min, "tooShort")
    .max(max, "tooLong");
}

/** Like `text`, but an empty value is valid. */
export function optionalText(max: number) {
  return z.string({ error: "required" }).trim().max(max, "tooLong");
}

/** Error map for non-text fields: a missing value is "required", anything else "invalid". */
export function missingOrInvalid(issue: { input?: unknown }): ValidationCode {
  return issue.input === undefined ? "required" : "invalid";
}

export function enumOf<const T extends readonly [string, ...string[]]>(values: T) {
  return z.enum(values, { error: missingOrInvalid });
}
