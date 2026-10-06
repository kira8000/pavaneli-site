import type { MetadataRoute } from "next";
import { NAV_ITEMS } from "@/components/layout/nav";
import { SITE_URL } from "@/lib/site";

// No `lastModified`: the pages are static and a made-up date would be misleading.
export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_ITEMS.map(({ href }) => ({
    url: href === "/" ? SITE_URL : `${SITE_URL}${href}`,
  }));
}
