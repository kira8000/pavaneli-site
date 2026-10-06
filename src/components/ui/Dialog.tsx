"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name; required because the dialog has no guaranteed visible heading. */
  label: string;
  className?: string;
  children: ReactNode;
}

/**
 * Thin wrapper over the native <dialog>: `showModal()` already provides focus
 * trapping, Esc to close, inert background and focus restoration.
 * Keep `display` utilities off `className`; they would defeat the closed state.
 * Children must fill the dialog (no padding on it) so a click on the dialog
 * element itself can only be a backdrop click.
 */
export function Dialog({ open, onClose, label, className, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn("bg-surface text-fg backdrop:bg-black/60", className)}
    >
      {children}
    </dialog>
  );
}
