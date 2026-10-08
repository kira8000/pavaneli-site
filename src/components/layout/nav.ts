import {
  Briefcase,
  Cpu,
  FlaskConical,
  FolderGit2,
  House,
  Layers,
  Mail,
  User,
  type LucideIcon,
} from "lucide-react";
import type { MessageKey } from "@/i18n/translate";

export interface NavItem {
  href: string;
  labelKey: MessageKey;
  icon: LucideIcon;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", labelKey: "nav.home", icon: House },
  { href: "/about", labelKey: "nav.about", icon: User },
  { href: "/experience", labelKey: "nav.experience", icon: Briefcase },
  { href: "/projects", labelKey: "nav.projects", icon: FolderGit2 },
  { href: "/engineering", labelKey: "nav.engineering", icon: Layers },
  { href: "/engineering/ai-assisted", labelKey: "nav.aiAssisted", icon: Cpu },
  { href: "/playground", labelKey: "nav.playground", icon: FlaskConical },
  { href: "/contact", labelKey: "nav.contact", icon: Mail },
];

/** Featured project: lives on the Projects page as a case study. */
export const UPCOMING_NAV_ITEM = {
  href: "/projects#versus",
  labelKey: "nav.versus",
  icon: FolderGit2,
} as const satisfies NavItem;
