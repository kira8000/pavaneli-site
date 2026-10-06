import { SidebarContent } from "./SidebarContent";

/** Desktop only; below `lg` the same content is shown in `MobileNav`'s drawer. */
export function Sidebar() {
  return (
    <aside className="border-border bg-surface sticky top-0 hidden h-dvh w-64 shrink-0 border-r lg:block">
      <SidebarContent />
    </aside>
  );
}
