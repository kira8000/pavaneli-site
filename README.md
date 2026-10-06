# pavaneli-site

Personal portfolio and engineering showcase: Next.js App Router, React, TypeScript (strict), Tailwind CSS v4.

The site is bilingual (EN / PT-BR), dark-first with a light theme, and includes a client-side mock backend plus playground so the architecture is visible, not just described.

## Setup

Requires Node.js 22 and npm. Copy `.env.example` only if you need a local `SITE_URL`; the default is `http://localhost:3000`.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | Purpose                            |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Dev server                         |
| `npm run build`        | Production build                   |
| `npm start`            | Serve the production build         |
| `npm run lint`         | ESLint                             |
| `npm run typecheck`    | `next typegen` + `tsc --noEmit`    |
| `npm test`             | Vitest (jsdom + Testing Library)   |
| `npm run format:check` | Prettier check (`format` to write) |

CI (`.github/workflows/ci.yml`) runs a production-dependency audit, lint, typecheck, format check, tests and build. Least-privilege: `contents: read`.

## Content

Factual copy lives in `src/content/` and is typed. It is not invented: remaining gaps are `TODO(owner)`. The phone number is not published. UI strings live in `src/i18n/messages`; long-form entries use `LocalizedText` (EN + PT-BR).

## Architecture

See [docs/architecture.md](docs/architecture.md) for the mock backend, i18n, theme, and why the layers exist. Agent standards live in `.cursor/rules/` and are part of the repo on purpose (how the project is built).

## Security

This is a static public site with no auth, no database and no secrets. Hardening (headers, URL allow-lists, JSON-LD escape, input caps) is documented in [SECURITY.md](SECURITY.md).

## Deploy

1. Push `main` to GitHub (public).
2. Import the repo in [Vercel](https://vercel.com) (Hobby is enough). Framework preset: Next.js. Install command `npm ci`, build `npm run build`.
3. Set `SITE_URL` to the canonical origin, e.g. `https://your-domain.vercel.app` or a custom domain — no trailing path.
4. Confirm `/sitemap.xml`, Open Graph images and the security headers on a live response.

## License

Source is published as a professional portfolio. Content (CV text, name, photo if added) remains the owner's.
