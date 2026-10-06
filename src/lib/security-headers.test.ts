import { afterEach, describe, expect, it, vi } from "vitest";
import { contentSecurityPolicy, securityHeaders } from "./security-headers";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("contentSecurityPolicy", () => {
  it("allows eval only outside production (HMR / Turbopack)", () => {
    vi.stubEnv("NODE_ENV", "development");
    expect(contentSecurityPolicy()).toContain("unsafe-eval");
    expect(contentSecurityPolicy()).toContain("ws:");

    vi.stubEnv("NODE_ENV", "production");
    expect(contentSecurityPolicy()).not.toContain("unsafe-eval");
    expect(contentSecurityPolicy()).not.toContain("ws:");
    expect(contentSecurityPolicy()).toContain("frame-ancestors 'none'");
    expect(contentSecurityPolicy()).toContain("object-src 'none'");
  });
});

describe("securityHeaders", () => {
  it("ships clickjacking, sniffing and referrer protections", () => {
    const map = Object.fromEntries(
      securityHeaders().map((header) => [header.key, header.value]),
    );
    expect(map["X-Content-Type-Options"]).toBe("nosniff");
    expect(map["X-Frame-Options"]).toBe("DENY");
    expect(map["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(map["Cross-Origin-Opener-Policy"]).toBe("same-origin");
    expect(map["Strict-Transport-Security"]).toContain("max-age=63072000");
  });
});
