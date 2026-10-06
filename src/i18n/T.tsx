"use client";

import type { LocalizedText } from "./config";
import { useLocalize, useT } from "./locale-store";
import type { MessageKey } from "./translate";

/**
 * Tiny client islands for text nodes, so pages and sections can stay Server
 * Components. Use `useT` directly when a translated string is needed as an attribute.
 */
export function T({ k }: { k: MessageKey }) {
  const t = useT();
  return <>{t(k)}</>;
}

export function L({ text }: { text: LocalizedText }) {
  const localize = useLocalize();
  return <>{localize(text)}</>;
}
