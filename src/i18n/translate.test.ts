import { describe, expect, it } from "vitest";
import { en } from "./messages/en";
import { ptBR } from "./messages/pt-BR";
import { translate, type MessageKey } from "./translate";

function collectKeys(node: object, prefix = ""): string[] {
  return Object.entries(node).flatMap(([key, value]) =>
    typeof value === "string"
      ? [`${prefix}${key}`]
      : collectKeys(value, `${prefix}${key}.`),
  );
}

describe("translate", () => {
  it("keeps both locales in sync and never ships empty strings", () => {
    expect(collectKeys(ptBR).sort()).toEqual(collectKeys(en).sort());
    for (const key of collectKeys(en)) {
      expect(translate("en", key as MessageKey)).not.toBe("");
      expect(translate("pt-BR", key as MessageKey)).not.toBe("");
    }
  });

  it("returns the localized message", () => {
    expect(translate("en", "nav.home")).toBe("Home");
    expect(translate("pt-BR", "nav.home")).toBe("Início");
  });

  it("falls back to the key when it is unknown", () => {
    expect(translate("pt-BR", "nav.nope" as MessageKey)).toBe("nav.nope");
  });
});
