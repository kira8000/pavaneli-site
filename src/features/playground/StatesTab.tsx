"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import type { ApiErrorCode } from "@/domain/api-error";
import type { MockNetworkSettings } from "@/repositories/mock/network";
import { useT } from "@/i18n/locale-store";
import { getBackend } from "./backend";
import { toApiError } from "./hooks";

const SCENARIOS = ["loading", "success", "empty", "error"] as const;
type Scenario = (typeof SCENARIOS)[number];

type View =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; names: string[] }
  | { kind: "empty" }
  | { kind: "error"; code: ApiErrorCode };

const SLOW_LATENCY_MS = 2500;
const PREVIEW_SIZE = 3;
const NO_MATCH_SEARCH = "no-such-user";

/** Network conditions that produce each scenario with a real request. */
const SCENARIO_NETWORK: Record<Scenario, Partial<MockNetworkSettings>> = {
  loading: { latencyMs: SLOW_LATENCY_MS },
  success: {},
  empty: {},
  error: { failing: true },
};

export function StatesTab() {
  const t = useT();
  const [view, setView] = useState<View>({ kind: "idle" });
  const running = view.kind === "loading";

  async function run(scenario: Scenario) {
    const { network, services } = getBackend();
    const previous = { ...network.settings };
    Object.assign(network.settings, SCENARIO_NETWORK[scenario]);
    setView({ kind: "loading" });

    try {
      const page = await services.users.list({
        pageSize: PREVIEW_SIZE,
        search: scenario === "empty" ? NO_MATCH_SEARCH : "",
      });
      setView(
        page.total === 0
          ? { kind: "empty" }
          : { kind: "success", names: page.items.map((user) => user.name) },
      );
    } catch (error) {
      setView({ kind: "error", code: toApiError(error).code });
    } finally {
      Object.assign(network.settings, previous);
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-muted max-w-2xl text-sm">{t("playground.states.description")}</p>

      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map((scenario) => (
          <Button key={scenario} disabled={running} onClick={() => run(scenario)}>
            {t(`playground.states.run.${scenario}`)}
          </Button>
        ))}
      </div>

      <div role="status" aria-live="polite" className="min-h-48">
        {view.kind === "idle" && (
          <EmptyState
            title={t("playground.states.idleTitle")}
            description={t("playground.states.idleDescription")}
          />
        )}
        {view.kind === "loading" && (
          <div className="space-y-3">
            <p className="text-muted font-mono text-sm">{t("playground.loading")}</p>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-2/3" />
          </div>
        )}
        {view.kind === "success" && (
          <div className="border-accent/40 rounded-md border p-4">
            <p className="text-accent font-mono text-sm font-semibold">
              {t("playground.states.successTitle")}
            </p>
            <ul className="text-muted mt-3 list-inside list-disc text-sm">
              {view.names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        )}
        {view.kind === "empty" && (
          <EmptyState
            title={t("playground.states.emptyTitle")}
            description={t("playground.states.emptyDescription")}
          />
        )}
        {view.kind === "error" && (
          <ErrorState
            title={t("playground.error.title")}
            description={t(`apiError.${view.code}`)}
            action={<Button onClick={() => run("error")}>{t("common.retry")}</Button>}
          />
        )}
      </div>
    </div>
  );
}
