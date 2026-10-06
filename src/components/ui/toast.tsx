"use client";

import { X } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useT } from "@/i18n/locale-store";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

export type ToastTone = "success" | "error";

interface Toast {
  id: number;
  tone: ToastTone;
  message: string;
}

const TOAST_DURATION_MS = 5000;
const NO_TOASTS: readonly Toast[] = [];

/**
 * Module-level store (same approach as the locale store): any handler can call
 * `showToast` without a provider; only one `<ToastRegion />` needs to be mounted.
 */
let toasts: readonly Toast[] = NO_TOASTS;
let nextId = 1;
const listeners = new Set<() => void>();

function emit(next: readonly Toast[]) {
  toasts = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function dismissToast(id: number) {
  emit(toasts.filter((toast) => toast.id !== id));
}

export function showToast(tone: ToastTone, message: string) {
  const id = nextId++;
  emit([...toasts, { id, tone, message }]);
  setTimeout(() => dismissToast(id), TOAST_DURATION_MS);
}

const TONE_STYLES: Record<ToastTone, string> = {
  success: "border-accent/50",
  error: "border-danger/60",
};

export function ToastRegion() {
  const t = useT();
  const items = useSyncExternalStore(
    subscribe,
    () => toasts,
    () => NO_TOASTS,
  );

  return (
    <ol
      aria-label={t("playground.toast.region")}
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-end gap-2 sm:left-auto sm:w-96"
    >
      {items.map((toast) => (
        <li
          key={toast.id}
          // Errors interrupt; confirmations wait their turn.
          role={toast.tone === "error" ? "alert" : "status"}
          className={cn(
            "toast bg-raised pointer-events-auto flex w-full items-start gap-3 rounded-md border p-4 text-sm shadow-lg",
            TONE_STYLES[toast.tone],
          )}
        >
          <p className="flex-1">{toast.message}</p>
          <Button
            variant="ghost"
            aria-label={t("common.dismiss")}
            onClick={() => dismissToast(toast.id)}
            className="-m-2 size-8 px-0"
          >
            <X aria-hidden className="size-4" />
          </Button>
        </li>
      ))}
    </ol>
  );
}
