/** Lowercases and strips diacritics, so "joao" matches "João". */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function compareText(a: string, b: string): number {
  return normalizeText(a).localeCompare(normalizeText(b));
}
