"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

/**
 * WAI-ARIA tabs with automatic activation: arrows/Home/End move focus and
 * selection together. Only the active panel is mounted, so each demo starts
 * fresh and does no work while hidden.
 */
export function Tabs({ label, tabs }: { label: string; tabs: TabItem[] }) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(tabs[0].id);
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});

  function select(index: number) {
    const tab = tabs[(index + tabs.length) % tabs.length];
    setActiveId(tab.id);
    buttons.current[tab.id]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent, index: number) {
    const target = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target);
  }

  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        // The baseline is an inset shadow (not a border) so the active tab's underline
        // can sit on it without making the scroll container overflow vertically.
        className="flex gap-1 overflow-x-auto overflow-y-hidden shadow-[inset_0_-1px_0_var(--border)]"
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === active.id;
          return (
            <button
              key={tab.id}
              ref={(element) => {
                buttons.current[tab.id] = element;
              }}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "border-b-2 px-4 py-2.5 font-mono text-sm whitespace-nowrap transition-colors",
                selected
                  ? "border-accent text-fg"
                  : "text-muted hover:text-fg border-transparent",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel-${active.id}`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        tabIndex={0}
        className="pt-6"
      >
        {active.content}
      </div>
    </div>
  );
}
