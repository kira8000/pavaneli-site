"use client";

import { EDUCATION } from "@/content/education";
import { useLocale, useLocalize } from "@/i18n/locale-store";
import { formatMonthYear } from "@/lib/format";

export function EducationList() {
  const locale = useLocale();
  const localize = useLocalize();

  return (
    <ul className="space-y-5">
      {EDUCATION.map((entry) => (
        <li key={entry.id}>
          <h3 className="font-mono text-base font-semibold">{localize(entry.course)}</h3>
          <p className="text-muted mt-1">{entry.institution}</p>
          <p className="text-subtle mt-1 font-mono text-xs">
            {formatMonthYear(locale, entry.startDate)} –{" "}
            {formatMonthYear(locale, entry.endDate)}
          </p>
        </li>
      ))}
    </ul>
  );
}
