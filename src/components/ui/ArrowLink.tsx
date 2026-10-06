import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-accent inline-flex items-center gap-1.5 font-mono text-sm hover:underline"
    >
      {children}
      <ArrowRight aria-hidden className="size-4" />
    </Link>
  );
}
