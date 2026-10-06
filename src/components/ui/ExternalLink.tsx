"use client";

import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { useT } from "@/i18n/locale-store";
import { isSafeHttpUrl, mailtoHref } from "@/lib/safe";

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  const t = useT();

  if (!isSafeHttpUrl(href)) {
    return <span className="text-muted">{children}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted hover:text-fg inline-flex items-center gap-1 transition-colors"
    >
      {children}
      <ArrowUpRight aria-hidden className="size-3.5" />
      <span className="sr-only">{t("common.opensInNewTab")}</span>
    </a>
  );
}

export function MailLink({ email, children }: { email: string; children: ReactNode }) {
  const href = mailtoHref(email);
  if (!href) return <span className="text-muted">{children}</span>;

  return (
    <a href={href} className="text-muted hover:text-fg transition-colors">
      {children}
    </a>
  );
}
