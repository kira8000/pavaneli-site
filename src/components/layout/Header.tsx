import { Breadcrumb } from "./Breadcrumb";
import { CommandPalette } from "./CommandPalette";
import { LocaleToggle } from "./LocaleToggle";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-border bg-bg sticky top-0 z-20 flex h-14 items-center gap-2 border-b px-3 sm:px-6 lg:px-10">
      <MobileNav />
      <div className="min-w-0 flex-1 overflow-hidden">
        <Breadcrumb />
      </div>
      <div className="ml-auto flex items-center gap-1">
        <CommandPalette />
        <LocaleToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
