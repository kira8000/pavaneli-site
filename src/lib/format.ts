import type { Locale } from "@/i18n/config";

const YEAR_MONTH = /^(\d{4})-(0[1-9]|1[0-2])$/;

/** Formats an ISO timestamp as a date (UTC, same stability reasoning as below). */
export function formatDate(locale: Locale, iso: string): string {
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return iso;
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(
    time,
  );
}

/**
 * Formats a "YYYY-MM" string. UTC keeps the month stable regardless of the
 * server/browser time zone, which would otherwise risk a hydration mismatch.
 */
export function formatMonthYear(locale: Locale, yearMonth: string): string {
  const match = YEAR_MONTH.exec(yearMonth);
  if (!match) return yearMonth;

  const [, year, month] = match;
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(Number(year), Number(month) - 1, 1)));
}
