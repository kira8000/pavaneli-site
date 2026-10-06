"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import { ToastRegion } from "@/components/ui/toast";
import { useT } from "@/i18n/locale-store";
import { ApiDemoTab } from "./ApiDemoTab";
import { BackendControls } from "./BackendControls";
import { StatesTab } from "./StatesTab";
import { TicketsTab } from "./TicketsTab";
import { UsersTab } from "./UsersTab";

export function Playground() {
  const t = useT();
  // Bumped when the mock data is reset so any mounted table refetches.
  const [dataVersion, setDataVersion] = useState(0);

  return (
    <div className="space-y-8">
      <BackendControls onReset={() => setDataVersion((version) => version + 1)} />
      <Tabs
        label={t("playground.tabs.label")}
        tabs={[
          {
            id: "users",
            label: t("playground.tabs.users"),
            content: <UsersTab refreshKey={dataVersion} />,
          },
          {
            id: "tickets",
            label: t("playground.tabs.tickets"),
            content: <TicketsTab refreshKey={dataVersion} />,
          },
          { id: "api", label: t("playground.tabs.api"), content: <ApiDemoTab /> },
          { id: "states", label: t("playground.tabs.states"), content: <StatesTab /> },
        ]}
      />
      <ToastRegion />
    </div>
  );
}
