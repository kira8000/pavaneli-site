"use client";

import Link from "next/link";
import { Button, buttonStyles } from "@/components/ui/Button";
import { useT } from "@/i18n/locale-store";

interface StatusViewProps {
  code: string;
  variant: "not-found" | "error";
  onRetry?: () => void;
}

/** Shared by the 404 and error boundary: both are "something is off, here is the way out". */
export function StatusView({ code, variant, onRetry }: StatusViewProps) {
  const t = useT();
  const isNotFound = variant === "not-found";

  return (
    <div role={isNotFound ? undefined : "alert"}>
      <p aria-hidden className="text-accent font-mono text-6xl font-semibold">
        {code}
      </p>
      <h1 className="mt-4 font-mono text-2xl font-semibold">
        {t(isNotFound ? "notFound.title" : "error.title")}
      </h1>
      <p className="text-muted mt-3">
        {t(isNotFound ? "notFound.description" : "error.description")}
      </p>
      <div className="mt-6">
        {onRetry ? (
          <Button variant="primary" onClick={onRetry}>
            {t("common.retry")}
          </Button>
        ) : (
          <Link href="/" className={buttonStyles({ variant: "primary" })}>
            {t("common.backHome")}
          </Link>
        )}
      </div>
    </div>
  );
}
