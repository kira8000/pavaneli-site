import { DEFAULT_LOCALE, type Locale, type LocalizedText } from "./config";
import { en, type Messages } from "./messages/en";
import { ptBR } from "./messages/pt-BR";

const MESSAGES: Record<Locale, Messages> = { en, "pt-BR": ptBR };

type Leaves<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${K}`
    : Leaves<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export type MessageKey = Leaves<Messages>;

function lookup(messages: Messages, key: string): string | undefined {
  let node: unknown = messages;
  for (const segment of key.split(".")) {
    if (typeof node !== "object" || node === null) return undefined;
    node = (node as Record<string, unknown>)[segment];
  }
  return typeof node === "string" ? node : undefined;
}

export function localize(locale: Locale, text: LocalizedText): string {
  return text[locale];
}

/** Falls back to the default locale, then to the key itself, so a gap is visible but never crashes. */
export function translate(locale: Locale, key: MessageKey): string {
  return lookup(MESSAGES[locale], key) ?? lookup(MESSAGES[DEFAULT_LOCALE], key) ?? key;
}
