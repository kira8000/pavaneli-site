"use client";

import { useState } from "react";
import { useT } from "@/i18n/locale-store";
import { buttonStyles } from "./Button";

export function CopyEmailButton({ email }: { email: string }) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be blocked; the mailto link remains available.
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={copy}
        className={buttonStyles({ variant: "ghost", size: "md" })}
      >
        {copied ? t("contact.copied") : t("contact.copyEmail")}
      </button>
      <span role="status" className="sr-only" aria-live="polite">
        {copied ? t("contact.copied") : ""}
      </span>
    </span>
  );
}
