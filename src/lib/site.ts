import { toPublicOrigin } from "./safe";

const LOCAL_URL = "http://localhost:3000";

function vercelOrigin(): string | undefined {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (!host || host.includes("/") || host.includes(":") || host.includes("\\")) {
    return undefined;
  }
  return toPublicOrigin(`https://${host}`);
}

/**
 * Canonical origin used for metadata, the sitemap and social images.
 * Set `SITE_URL` (server-side only) on the host. Invalid values are ignored
 * so a typo cannot inject a javascript: URL into JSON-LD or the sitemap.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL;
  if (explicit) {
    const origin = toPublicOrigin(explicit);
    if (origin) return origin;
  }
  return vercelOrigin() ?? LOCAL_URL;
}

export const SITE_URL = resolveSiteUrl();
