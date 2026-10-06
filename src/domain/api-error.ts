/**
 * Validation codes are stable identifiers, not display text: the UI maps them
 * to the active locale (`validation.<code>` message keys).
 */
export const VALIDATION_CODES = [
  "required",
  "tooShort",
  "tooLong",
  "invalidEmail",
  "invalid",
  "duplicate",
] as const;

export type ValidationCode = (typeof VALIDATION_CODES)[number];

export type FieldErrors = Partial<Record<string, ValidationCode>>;

/** HTTP-like status per code, so a future `ApiRepository` can map responses 1:1. */
const STATUS_BY_CODE = {
  validation: 422,
  not_found: 404,
  conflict: 409,
  unavailable: 503,
} as const;

export type ApiErrorCode = keyof typeof STATUS_BY_CODE;

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status: number;
  readonly fieldErrors: FieldErrors;

  constructor(code: ApiErrorCode, fieldErrors: FieldErrors = {}) {
    super(code);
    this.name = "ApiError";
    this.code = code;
    this.status = STATUS_BY_CODE[code];
    this.fieldErrors = fieldErrors;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
