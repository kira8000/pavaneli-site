export const LOCALES = ["en", "pt-BR"] as const;
export type Locale = (typeof LOCALES)[number];

/** Long-form content data (experience, projects) carries its own translations. */
export type LocalizedText = Record<Locale, string>;

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "locale";

/** Native names: a language switcher should name each language in that language. */
export const LOCALE_META: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  "pt-BR": { short: "PT", name: "Português (Brasil)" },
};

export function isLocale(value: unknown): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

export function nextLocale(current: Locale): Locale {
  const index = LOCALES.indexOf(current);
  return LOCALES[(index + 1) % LOCALES.length];
}
