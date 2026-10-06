"use client";

import { useEffect } from "react";
import { StatusView } from "@/components/StatusView";

export default function ErrorPage({ error, retry }: { error: Error; retry: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return <StatusView code="500" variant="error" onRetry={retry} />;
}
