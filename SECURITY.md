# Security

This site is a public static portfolio. There is no login, no database, no cookies used for identity, and no third-party scripts. The goal is a small, honest threat model: stop XSS and injection in the surfaces that exist, keep secrets off the machine and out of git, and fail closed when content or env values are hostile.

## Threat model

| Surface                   | Risk                                      | Control                                                        |
| ------------------------- | ----------------------------------------- | -------------------------------------------------------------- |
| External / profile links  | `javascript:`, `data:`, credentialed URLs | `isSafeHttpUrl` — fail closed, render text instead of an `<a>` |
| `mailto:`                 | Extra headers (`?bcc=`, `%0A`)            | `mailtoHref` — bare address only                               |
| `SITE_URL`                | Poisoned sitemap, Open Graph, JSON-LD     | `toPublicOrigin` — origin only; invalid values ignored         |
| JSON-LD                   | `</script>` breakout                      | `toJsonLd` escapes `<` to `\u003c`                             |
| Playground writes         | Oversized / malformed JSON                | Body cap (8 KiB), id length cap, zod at the service            |
| Framing / MIME / referrer | Clickjacking, sniffing, leaky referrers   | CSP, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`     |
| Dependencies              | Known CVEs in production                  | CI `npm audit --omit=dev --audit-level=high`, Dependabot       |
| Secrets                   | Keys in git or the client bundle          | No app secrets; `.env*` gitignored except `.env.example`       |
| Error UI                  | Stack traces in production                | Generic 500 page; `console.error` only in development          |

Dev-only CSP allows `unsafe-eval` and `ws:` for Next.js HMR. Production CSP does not allow `eval`. `script-src` still includes `unsafe-inline` because Next.js emits a small inline bootstrap and this app has an inline theme script. Nonces would require middleware without removing that bootstrap; they are not used.

`x-powered-by` is disabled. `form-action` allows `self` and `mailto:` only.

## What this project does not need

- Authentication, CSRF tokens, or rate limits (no server mutations, no sessions).
- A WAF or bot manager at this scale.
- Storing API keys — there are none. Do not add a `.env` with tokens “just in case”.

If a real backend is added later, authorization must live in the data layer, cookies must be http-only, and this document should be rewritten — the mock playground is not a production API.

## Machine and repository hygiene

- Install with `npm ci` from the lockfile. Do not run unknown `postinstall` from ad-hoc packages.
- Never commit `.env`, `.env.local`, PEM files, or cloud credentials. The template is `.env.example` (`SITE_URL` only).
- Treat Dependabot PRs as security work: read the changelog, run CI, merge promptly for production deps.
- Do not paste GitHub / Vercel tokens into the repo, issues, or chat logs.
- Keep the published content free of private phone numbers and unpublished personal data (`src/content` tests guard this).

## Reporting

Open a GitHub issue on this repository. There is no bug bounty. Please do not file issues that only restate a Dependabot finding already in flight.
