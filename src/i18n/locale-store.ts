"use client";

import { useSyncExternalStore } from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isLocale,
  type Locale,
  type LocalizedText,
} from "./config";
import { localize, translate, type MessageKey } from "./translate";

/**
 * Locale lives outside React so any component can read it without a provider.
 * The server (and the hydration pass) always use DEFAULT_LOCALE via
 * `getServerSnapshot`; the stored preference is applied right after hydration,
 * which avoids a hydration mismatch at the cost of a brief default-language paint.
 */
const listeners = new Set<() => void>();
let current: Locale | null = null;

function readStoredLocale(): Locale {
  try {
    const stored = window.sessionStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    // Storage can be blocked (privacy modes); the in-memory value still works.
    return DEFAULT_LOCALE;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Locale {
  current ??= readStoredLocale();
  return current;
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

export function setLocale(locale: Locale) {
  current = locale;
  try {
    window.sessionStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Preference simply won't persist across reloads.
  }
  listeners.forEach((listener) => listener());
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useT(): (key: MessageKey) => string {
  const locale = useLocale();
  return (key) => translate(locale, key);
}

export function useLocalize(): (text: LocalizedText) => string {
  const locale = useLocale();
  return (text) => localize(locale, text);
}
