"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { useT } from "@/i18n/locale-store";
import { DEFAULT_THEME, THEME_STORAGE_KEY, isTheme, type Theme } from "@/lib/theme";

/**
 * The DOM attribute is the source of truth: the inline init script in <head>
 * has already applied the stored choice before React hydrates.
 */
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Theme {
  const attribute = document.documentElement.getAttribute("data-theme");
  return isTheme(attribute) ? attribute : DEFAULT_THEME;
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Preference simply won't persist across visits.
  }
  listeners.forEach((listener) => listener());
}

/** Shared with the command palette, so both entry points behave identically. */
export function toggleTheme() {
  applyTheme(getSnapshot() === "dark" ? "light" : "dark");
}

export function ThemeToggle() {
  const t = useT();
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t(isDark ? "header.switchToLightTheme" : "header.switchToDarkTheme")}
      onClick={() => applyTheme(isDark ? "light" : "dark")}
    >
      <Icon aria-hidden className="size-5" />
    </Button>
  );
}
