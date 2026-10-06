import { describe, expect, it } from "vitest";
import { NAV_ITEMS } from "@/components/layout/nav";
import { SITE_URL } from "@/lib/site";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("SEO routes", () => {
  it("lists every navigable page once, with absolute URLs", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toHaveLength(NAV_ITEMS.length);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls[0]).toBe(SITE_URL);
    for (const url of urls) {
      expect(url.startsWith("http")).toBe(true);
      expect(url.startsWith(SITE_URL)).toBe(true);
    }
  });

  it("points crawlers at the sitemap", () => {
    const document = robots();

    expect(document.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(document.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });
});
