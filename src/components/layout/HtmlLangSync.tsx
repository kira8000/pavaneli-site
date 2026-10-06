"use client";

import { useEffect } from "react";
import { useLocale } from "@/i18n/locale-store";

/** Keeps <html lang> in sync with the client-chosen locale (needed by screen readers). */
export function HtmlLangSync() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
