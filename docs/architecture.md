# Architecture

Decision notes for people (and agents) onboarding this repo. Code remains the source of truth.

## Shape

The App Router owns routes and layouts. Shared UI lives in `src/components`. Domain types and validation live in `src/domain` so playground forms, the API demo and services share one contract. There is no auth, no real HTTP API, and no data store on the server.

A `features/` folder exists only where a screen has its own hooks and orchestration (`playground`, plus small presentational slices for experience/engineering/projects). Repositories exist because the playground has two consumers of the same write path (the Users UI and the API demo) and because swapping the mock for `fetch` should not touch React.

## Mock backend

Users, Tickets and Projects are fictional and in-memory. Every mutation is validated with zod at the service boundary (`unknown` in, typed out). The UI never talks to storage directly.

```
UI → service → Repository (interface) → mock repository
```

`createMockBackend` is the composition root: it is the only module that knows the implementation is mocked. A future HTTP repository would implement the same `Repository` methods and pass the same `Repositories` object into `createServices`.

`MockNetwork` wraps calls with latency and a failure switch so loading/error states are produced by the same path as success, not by fake flags in JSX. State lives in the tab; reload resets to seeds.

This is a demo, not a product API: there is no referential integrity, no persistence, and no authorization model to implement.

## i18n and theme

Dictionaries are TypeScript modules. `pt-BR.ts` is typed against `en.ts`, so a missing key fails `tsc`. Locale is a tiny external store (`useSyncExternalStore`) in `sessionStorage`. The server always renders English; the stored locale applies after hydration to avoid mismatches.

Theme is `localStorage` plus an inline `<head>` script built only from the allowed theme constants. That script is the sole `dangerouslySetInnerHTML` besides JSON-LD (which is escaped — see SECURITY.md).

## Testing

Vitest + Testing Library, tests next to the code. The router and jsdom's missing `<dialog>` are stubbed; child components are not. There is no Playwright suite: pages stay thin and behavior lives in tested modules.

## What we deliberately did not add

No i18n library, no UI kit, no client data cache, no Sentry, no auth, no CMS. Each would be justified only by a second real consumer or a production backend.
