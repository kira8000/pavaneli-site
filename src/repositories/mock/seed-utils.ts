const MS_PER_DAY = 86_400_000;

/** Seeds are derived from fixed dates so every reset and test run is identical. */
export function addDays(baseIso: string, days: number): string {
  return new Date(Date.parse(baseIso) + days * MS_PER_DAY).toISOString();
}

export function toIsoDate(iso: string): string {
  return iso.slice(0, 10);
}

export function rank<T extends string>(order: readonly T[], value: T): number {
  return order.indexOf(value);
}
