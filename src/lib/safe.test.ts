import { describe, expect, it } from "vitest";
import { isSafeHttpUrl, mailtoHref, toJsonLd, toPublicOrigin } from "./safe";

describe("isSafeHttpUrl", () => {
  it("accepts http(s) without credentials", () => {
    expect(isSafeHttpUrl("https://example.com/path")).toBe(true);
    expect(isSafeHttpUrl("http://localhost:3000")).toBe(true);
  });

  it("rejects non-web schemes, credentials and junk", () => {
    expect(isSafeHttpUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeHttpUrl("data:text/html,hi")).toBe(false);
    expect(isSafeHttpUrl("https://user:pass@example.com")).toBe(false);
    expect(isSafeHttpUrl("/relative")).toBe(false);
    expect(isSafeHttpUrl("not a url")).toBe(false);
  });
});

describe("toPublicOrigin", () => {
  it("keeps only the origin of a valid http(s) URL", () => {
    expect(toPublicOrigin(" https://example.com/blog?q=1 ")).toBe("https://example.com");
  });

  it("drops invalid or credentialed values", () => {
    expect(toPublicOrigin("javascript:alert(1)")).toBeUndefined();
    expect(toPublicOrigin("https://user:pass@example.com")).toBeUndefined();
    expect(toPublicOrigin("")).toBeUndefined();
  });
});

describe("mailtoHref", () => {
  it("wraps a bare address", () => {
    expect(mailtoHref("a@b.com")).toBe("mailto:a@b.com");
  });

  it("rejects header injection and malformed addresses", () => {
    expect(mailtoHref("a@b.com?bcc=evil@x.com")).toBeUndefined();
    expect(mailtoHref("a@b.com%0Abcc:x@y.com")).toBeUndefined();
    expect(mailtoHref("not-an-email")).toBeUndefined();
  });
});

describe("toJsonLd", () => {
  it("escapes < so a payload cannot close the script tag", () => {
    expect(toJsonLd({ name: "</script><img src=x onerror=alert(1)>" })).toBe(
      '{"name":"\\u003c/script>\\u003cimg src=x onerror=alert(1)>"}',
    );
  });
});
