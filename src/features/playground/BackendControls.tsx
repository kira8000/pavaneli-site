"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/Field";
import { showToast } from "@/components/ui/toast";
import { useT } from "@/i18n/locale-store";
import { DEFAULT_LATENCY_MS } from "@/repositories/mock/network";
import { getBackend } from "./backend";

const LATENCY_OPTIONS_MS = [0, DEFAULT_LATENCY_MS, 1500] as const;

/** Lets visitors tune the simulated API so loading and error states are easy to reach. */
export function BackendControls({ onReset }: { onReset: () => void }) {
  const t = useT();
  const [latencyMs, setLatencyMs] = useState<number>(DEFAULT_LATENCY_MS);
  const [failing, setFailing] = useState(false);

  // The backend outlives this component (it is a per-tab singleton), so start from known settings.
  useEffect(() => {
    Object.assign(getBackend().network.settings, {
      latencyMs: DEFAULT_LATENCY_MS,
      failing: false,
    });
  }, []);

  return (
    <div className="border-border bg-surface flex flex-wrap items-end gap-x-6 gap-y-4 rounded-md border p-4">
      <div>
        <h2 className="font-mono text-sm font-semibold">
          {t("playground.backend.title")}
        </h2>
        <p className="text-subtle mt-1 max-w-xs text-xs">
          {t("playground.backend.note")}
        </p>
      </div>

      <div className="w-36">
        <SelectField
          label={t("playground.backend.latency")}
          value={String(latencyMs)}
          options={LATENCY_OPTIONS_MS.map((ms) => ({
            value: String(ms),
            label: `${ms} ms`,
          }))}
          onChange={(event) => {
            const next = Number(event.target.value);
            setLatencyMs(next);
            getBackend().network.settings.latencyMs = next;
          }}
        />
      </div>

      <label className="flex cursor-pointer items-center gap-2 pb-2 text-sm">
        <input
          type="checkbox"
          className="size-4 accent-[var(--accent)]"
          checked={failing}
          onChange={(event) => {
            setFailing(event.target.checked);
            getBackend().network.settings.failing = event.target.checked;
          }}
        />
        {t("playground.backend.failure")}
      </label>

      <Button
        onClick={() => {
          getBackend().reset();
          onReset();
          showToast("success", t("playground.backend.resetDone"));
        }}
      >
        <RotateCcw aria-hidden className="size-4" />
        {t("playground.backend.reset")}
      </Button>
    </div>
  );
}
