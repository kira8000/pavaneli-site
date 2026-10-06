"use client";

import { useT } from "@/i18n/locale-store";

export function SkipLink() {
  const t = useT();

  return (
    <a
      href="#main"
      className="bg-accent text-accent-fg sr-only rounded-md px-4 py-2 font-mono text-sm focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      {t("common.skipToContent")}
    </a>
  );
}
