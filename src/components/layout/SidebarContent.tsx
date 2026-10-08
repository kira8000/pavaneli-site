"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink, MailLink } from "@/components/ui/ExternalLink";
import { PROFILE } from "@/content/profile";
import { useT } from "@/i18n/locale-store";
import { NAV_ITEMS, UPCOMING_NAV_ITEM } from "./nav";

const ITEM_CLASS =
  "flex items-center gap-3 border-l-2 px-3 py-2 font-mono text-sm transition-colors";

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const t = useT();
  const pathname = usePathname();
  const UpcomingIcon = UPCOMING_NAV_ITEM.icon;

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-4">
      <Link href="/" onClick={onNavigate} className="block rounded-md px-3 py-2">
        <span className="text-fg block font-mono text-sm font-semibold">
          <span aria-hidden className="text-accent">
            &gt;{" "}
          </span>
          {PROFILE.name}
        </span>
        <span className="text-subtle block pl-4 font-mono text-xs">{PROFILE.role}</span>
      </Link>

      <nav aria-label={t("nav.primaryLabel")}>
        <ul className="flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={pathname === href ? "page" : undefined}
                className={`${ITEM_CLASS} text-muted hover:bg-raised hover:text-fg aria-[current=page]:border-accent aria-[current=page]:bg-raised aria-[current=page]:text-fg border-transparent`}
              >
                <Icon aria-hidden className="size-4 shrink-0" />
                {t(labelKey)}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={UPCOMING_NAV_ITEM.href}
              onClick={onNavigate}
              className={`${ITEM_CLASS} text-muted hover:bg-raised hover:text-fg flex-wrap border-transparent`}
            >
              <UpcomingIcon aria-hidden className="size-4 shrink-0" />
              {t(UPCOMING_NAV_ITEM.labelKey)}
              <Badge tone="warning">{t("common.inDevelopment")}</Badge>
            </Link>
          </li>
        </ul>
      </nav>

      <ul
        aria-label={t("sidebar.links")}
        className="mt-auto flex flex-col gap-2 px-3 font-mono text-sm"
      >
        <li>
          <ExternalLink href={PROFILE.links.github}>GitHub</ExternalLink>
        </li>
        <li>
          <ExternalLink href={PROFILE.links.linkedin}>LinkedIn</ExternalLink>
        </li>
        <li>
          <MailLink email={PROFILE.email}>{PROFILE.email}</MailLink>
        </li>
      </ul>
    </div>
  );
}
