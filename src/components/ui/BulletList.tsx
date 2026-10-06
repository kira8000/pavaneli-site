import { T } from "@/i18n/T";
import type { MessageKey } from "@/i18n/translate";

export function BulletList({ keys }: { keys: readonly MessageKey[] }) {
  return (
    <ul className="text-muted space-y-2">
      {keys.map((key) => (
        <li key={key} className="flex gap-3">
          <span aria-hidden className="text-accent font-mono">
            ›
          </span>
          <span>
            <T k={key} />
          </span>
        </li>
      ))}
    </ul>
  );
}
