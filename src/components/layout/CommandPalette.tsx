"use client";

import { Languages, Search, SunMoon, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { nextLocale } from "@/i18n/config";
import { setLocale, useLocale, useT } from "@/i18n/locale-store";
import type { MessageKey } from "@/i18n/translate";
import { cn } from "@/lib/cn";
import { normalizeText } from "@/lib/text";
import { NAV_ITEMS } from "./nav";
import { toggleTheme } from "./ThemeToggle";

type Group = "navigate" | "actions";

interface Command {
  id: string;
  group: Group;
  label: string;
  icon: LucideIcon;
  run: () => void;
}

const GROUP_ORDER: readonly Group[] = ["navigate", "actions"];
const GROUP_LABEL: Record<Group, MessageKey> = {
  navigate: "palette.navigate",
  actions: "palette.actions",
};

const isMac = () => /Mac|iPhone|iPad/.test(navigator.userAgent);
const subscribeNever = () => () => {};

/** "⌘" on Apple devices, "Ctrl" elsewhere; the server and hydration always say "Ctrl". */
function useModifierLabel(): string {
  return useSyncExternalStore(
    subscribeNever,
    () => (isMac() ? "⌘" : "Ctrl"),
    () => "Ctrl",
  );
}

function useCommands(): Command[] {
  const t = useT();
  const locale = useLocale();
  const router = useRouter();

  const pages: Command[] = NAV_ITEMS.map(({ href, labelKey, icon }) => ({
    id: href,
    group: "navigate",
    label: t(labelKey),
    icon,
    run: () => router.push(href),
  }));

  return [
    ...pages,
    {
      id: "toggle-theme",
      group: "actions",
      label: t("palette.toggleTheme"),
      icon: SunMoon,
      run: toggleTheme,
    },
    {
      id: "toggle-language",
      group: "actions",
      label: t("palette.toggleLanguage"),
      icon: Languages,
      run: () => setLocale(nextLocale(locale)),
    },
  ];
}

export function filterCommands<T extends { label: string }>(
  commands: readonly T[],
  query: string,
): T[] {
  const needle = normalizeText(query.trim());
  return needle
    ? commands.filter((command) => normalizeText(command.label).includes(needle))
    : [...commands];
}

interface PaletteContentProps {
  onClose: () => void;
}

function PaletteContent({ onClose }: PaletteContentProps) {
  const t = useT();
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;
  const optionId = (index: number) => `${baseId}-option-${index}`;
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const optionRefs = useRef<(HTMLElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useCommands();
  const results = filterCommands(commands, query);
  // Results shrink as the visitor types; never point past the end.
  const active = Math.min(activeIndex, results.length - 1);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    optionRefs.current[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function run(command: Command) {
    onClose();
    command.run();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) => {
        const index = Math.min(current, results.length - 1);
        return (index + step + results.length) % results.length;
      });
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(results.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[active]);
    }
  }

  const indexed = results.map((command, index) => ({ command, index }));

  return (
    <div>
      <div className="border-border flex items-center gap-3 border-b px-4">
        <Search aria-hidden className="text-subtle size-4 shrink-0" />
        <input
          ref={inputRef}
          autoFocus
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={listboxId}
          aria-activedescendant={results.length > 0 ? optionId(active) : undefined}
          aria-autocomplete="list"
          aria-label={t("palette.placeholder")}
          placeholder={t("palette.placeholder")}
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          className="placeholder:text-subtle h-12 w-full bg-transparent text-sm outline-none"
        />
      </div>

      {results.length === 0 ? (
        <p role="status" className="text-muted px-4 py-8 text-center text-sm">
          {t("palette.noResults")}
        </p>
      ) : (
        <div
          id={listboxId}
          role="listbox"
          aria-label={t("palette.results")}
          className="max-h-[50dvh] overflow-y-auto p-2"
        >
          {GROUP_ORDER.map((group) => {
            const items = indexed.filter(({ command }) => command.group === group);
            if (items.length === 0) return null;
            const headingId = `${baseId}-group-${group}`;

            return (
              <div key={group} role="group" aria-labelledby={headingId}>
                <div
                  id={headingId}
                  role="presentation"
                  className="text-subtle px-2 pt-2 pb-1 font-mono text-xs"
                >
                  {t(GROUP_LABEL[group])}
                </div>
                {items.map(({ command, index }) => {
                  const Icon = command.icon;
                  return (
                    <div
                      key={command.id}
                      ref={(element) => {
                        optionRefs.current[index] = element;
                      }}
                      id={optionId(index)}
                      role="option"
                      aria-selected={index === active}
                      onMouseMove={() => setActiveIndex(index)}
                      // Keep focus in the input so typing continues after a click.
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => run(command)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm",
                        index === active ? "bg-raised text-fg" : "text-muted",
                      )}
                    >
                      <Icon aria-hidden className="size-4 shrink-0" />
                      {command.label}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function CommandPalette() {
  const t = useT();
  const modifier = useModifierLabel();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleShortcut(event: globalThis.KeyboardEvent) {
      if (event.key.toLowerCase() !== "k" || !(event.ctrlKey || event.metaKey)) return;
      event.preventDefault();
      setOpen((wasOpen) => {
        // A second modal on top of the mobile drawer would leave the page inert.
        if (!wasOpen && document.querySelector("dialog[open]")) return false;
        return !wasOpen;
      });
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <>
      <Button
        variant="secondary"
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K"
        aria-label={t("palette.open")}
        onClick={() => setOpen(true)}
        className="size-10 px-0 sm:w-auto sm:px-3"
      >
        <Search aria-hidden className="size-4" />
        <span aria-hidden className="text-subtle hidden text-xs sm:inline">
          {modifier} K
        </span>
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        label={t("palette.title")}
        className="modal border-border mx-auto mt-[12vh] mb-auto w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-lg border p-0"
      >
        {/* Mounted only while open, so each opening starts with a clean query. */}
        {open && <PaletteContent onClose={() => setOpen(false)} />}
      </Dialog>
    </>
  );
}
