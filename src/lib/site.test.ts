import { describe, expect, it } from "vitest";
import { SITE_URL } from "./site";

describe("SITE_URL", () => {
  it("is an absolute http(s) origin without a trailing slash", () => {
    expect(SITE_URL).toMatch(/^https?:\/\/[^/]+$/);
  });
});
