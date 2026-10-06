"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { useT } from "@/i18n/locale-store";
import { SidebarContent } from "./SidebarContent";

// Must match Tailwind's `lg` breakpoint, where the fixed sidebar takes over.
const DESKTOP_QUERY = "(min-width: 64rem)";

export function MobileNav() {
  const t = useT();
  const [open, setOpen] = useState(false);

  // An open modal drawer would leave the page inert if the viewport grew to desktop width.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener("change", closeOnDesktop);
    return () => query.removeEventListener("change", closeOnDesktop);
  }, []);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={t("header.openMenu")}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden className="size-5" />
      </Button>

      <Dialog
        open={open}
        onClose={close}
        label={t("nav.mobileLabel")}
        className="drawer border-border fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-72 max-w-[85vw] border-r p-0"
      >
        <div className="relative h-full">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("header.closeMenu")}
            onClick={close}
            className="absolute top-2 right-2"
          >
            <X aria-hidden className="size-5" />
          </Button>
          <SidebarContent onNavigate={close} />
        </div>
      </Dialog>
    </div>
  );
}
