"use client";

import { usePathname } from "next/navigation";
import { useT } from "@/i18n/locale-store";
import { NAV_ITEMS } from "./nav";

function buildTrail(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((segment, index) => ({
    href: `/${segments.slice(0, index + 1).join("/")}`,
    fallback: segment,
  }));
}

export function Breadcrumb() {
  const t = useT();
  const pathname = usePathname();
  const trail = buildTrail(pathname);

  return (
    <nav aria-label={t("header.breadcrumb")} className="min-w-0">
      <ol className="text-muted flex items-center gap-2 truncate font-mono text-sm">
        <li aria-hidden className="text-accent">
          ~
        </li>
        {trail.length === 0 && (
          <li aria-current="page" className="text-fg">
            {t("nav.home")}
          </li>
        )}
        {trail.map(({ href, fallback }, index) => {
          const item = NAV_ITEMS.find((candidate) => candidate.href === href);
          const isLast = index === trail.length - 1;
          return (
            <li
              key={href}
              aria-current={isLast ? "page" : undefined}
              className="flex gap-2"
            >
              <span aria-hidden>/</span>
              <span className={isLast ? "text-fg" : undefined}>
                {item ? t(item.labelKey) : fallback}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
