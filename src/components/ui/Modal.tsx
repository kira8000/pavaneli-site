"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useT } from "@/i18n/locale-store";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/** Centered dialog with a title and close button, built on the native <dialog>. */
export function Modal({ open, onClose, title, children }: ModalProps) {
  const t = useT();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      label={title}
      className="modal border-border m-auto max-h-[calc(100dvh-2rem)] w-[min(32rem,calc(100vw-2rem))] overflow-y-auto rounded-lg border p-0"
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="font-mono text-lg font-semibold">{title}</h2>
          <Button
            variant="ghost"
            aria-label={t("common.close")}
            onClick={onClose}
            className="-mt-2 -mr-2 size-9 px-0"
          >
            <X aria-hidden className="size-5" />
          </Button>
        </div>
        {children}
      </div>
    </Dialog>
  );
}
