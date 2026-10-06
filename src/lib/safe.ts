/** Rejects javascript:, data: and other non-web protocols before they reach the DOM. */
export function isSafeHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

/**
 * Origin only (scheme + host + port). Query, path, credentials and unknown
 * schemes are dropped so a bad `SITE_URL` cannot leak into sitemap or JSON-LD.
 */
export function toPublicOrigin(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  try {
    const url = new URL(trimmed);
    if (!isSafeHttpUrl(url.href)) return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

/**
 * `mailto:` with a bare address. Rejects extra headers (`?bcc=`, `%0A`) that
 * would turn a contact link into a vector.
 */
export function mailtoHref(email: string): string | undefined {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return undefined;
  if (/[?&#%]/.test(email)) return undefined;
  return `mailto:${email}`;
}

/**
 * JSON-LD lives inside a `<script>` tag. Escaping `<` closes the
 * `</script>` breakout even if a future content string contained HTML.
 */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
