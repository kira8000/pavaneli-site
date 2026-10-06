export interface HeaderEntry {
  key: string;
  value: string;
}

/**
 * Security headers for every route. CSP skips nonces on purpose: Next.js still
 * emits a small inline bootstrap, and a nonce pipeline would add middleware
 * without reducing risk on a static portfolio. `unsafe-eval` is development
 * only (Turbopack / HMR). There are no third-party scripts or fonts.
 */
export function contentSecurityPolicy(): string {
  const isDev = process.env.NODE_ENV !== "production";
  const scriptSrc = isDev
    ? "'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'"
    : "'self' 'unsafe-inline'";
  const connectSrc = isDev ? "'self' ws: wss:" : "'self'";

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src ${connectSrc}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' mailto:",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function securityHeaders(): HeaderEntry[] {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy() },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "X-DNS-Prefetch-Control", value: "off" },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
  ];
}
