"use client";

import { Button } from "@/components/ui/Button";
import { LOCALE_META, nextLocale } from "@/i18n/config";
import { setLocale, useLocale, useT } from "@/i18n/locale-store";

export function LocaleToggle() {
  const t = useT();
  const locale = useLocale();
  const target = nextLocale(locale);

  return (
    <Button
      variant="ghost"
      aria-label={`${t("header.switchLanguageTo")} ${LOCALE_META[target].name}`}
      onClick={() => setLocale(target)}
      className="px-3"
    >
      {LOCALE_META[locale].short}
    </Button>
  );
}
