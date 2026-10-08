"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { ExperienceEntry } from "@/content/types";
import { useLocale, useLocalize, useT } from "@/i18n/locale-store";
import { cn } from "@/lib/cn";
import { formatMonthYear } from "@/lib/format";

const LABEL = "font-mono text-xs text-subtle";

export function ExperienceTimeline({ entries }: { entries: readonly ExperienceEntry[] }) {
  const t = useT();
  const locale = useLocale();
  const localize = useLocalize();

  // "YYYY-MM" strings sort lexicographically; newest first.
  const sorted = [...entries].sort((a, b) => b.startDate.localeCompare(a.startDate));
  const [openId, setOpenId] = useState<string | null>(sorted[0]?.id ?? null);

  if (sorted.length === 0) {
    return (
      <EmptyState
        title={t("experience.emptyTitle")}
        description={t("experience.emptyBody")}
      />
    );
  }

  return (
    <ol
      aria-label={t("experience.timelineLabel")}
      className="border-border ml-1.5 border-l"
    >
      {sorted.map((entry) => {
        const isOpen = entry.id === openId;
        const panelId = `experience-${entry.id}`;
        const period = `${formatMonthYear(locale, entry.startDate)} – ${
          entry.endDate ? formatMonthYear(locale, entry.endDate) : t("experience.present")
        }`;

        return (
          <li key={entry.id} className="relative pb-8 pl-6 last:pb-0">
            <span
              aria-hidden
              className={cn(
                "border-border bg-bg absolute top-2 -left-[5px] size-2.5 rounded-full border",
                isOpen && "border-accent bg-accent",
              )}
            />
            <h2 className="font-mono text-lg font-semibold">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : entry.id)}
                className="hover:text-accent flex w-full items-start justify-between gap-3 rounded-md text-left"
              >
                <span>
                  {entry.company}
                  <span className="text-muted block text-base font-normal">
                    {localize(entry.role)}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "mt-1 size-5 shrink-0 transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h2>
            <p className="text-subtle mt-1 font-mono text-xs">{period}</p>

            <div id={panelId} hidden={!isOpen} className="mt-4 space-y-5">
              {entry.summary && <p className="text-muted">{localize(entry.summary)}</p>}

              {entry.applicationType && (
                <div>
                  <p className={LABEL}>{t("experience.applicationType")}</p>
                  <p className="text-muted mt-1">{localize(entry.applicationType)}</p>
                </div>
              )}

              {entry.technologies.length > 0 && (
                <div>
                  <p className={LABEL}>{t("experience.technologies")}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {entry.technologies.map((technology) => (
                      <li key={technology}>
                        <Badge>{technology}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {entry.workedOn && entry.workedOn.length > 0 && (
                <BulletList
                  label={t("experience.workedOn")}
                  items={entry.workedOn.map(localize)}
                />
              )}

              {entry.responsibilities.length > 0 && (
                <BulletList
                  label={t("experience.responsibilities")}
                  items={entry.responsibilities.map(localize)}
                />
              )}

              {entry.highlights && entry.highlights.length > 0 && (
                <BulletList
                  label={t("experience.highlights")}
                  items={entry.highlights.map(localize)}
                />
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function BulletList({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div>
      <p className={LABEL}>{label}</p>
      <ul className="text-muted marker:text-accent mt-2 list-disc space-y-1.5 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
