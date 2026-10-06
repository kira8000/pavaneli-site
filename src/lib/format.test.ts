import { describe, expect, it } from "vitest";
import { formatMonthYear } from "./format";

describe("formatMonthYear", () => {
  it("formats per locale without time-zone drift", () => {
    expect(formatMonthYear("en", "2024-01")).toBe("Jan 2024");
    expect(formatMonthYear("pt-BR", "2024-01")).toMatch(/jan\.? de 2024/i);
  });

  it("returns malformed input untouched instead of throwing", () => {
    expect(formatMonthYear("en", "2024-13")).toBe("2024-13");
    expect(formatMonthYear("en", "soon")).toBe("soon");
  });
});
