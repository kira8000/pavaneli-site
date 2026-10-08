import type { LocalizedText } from "@/i18n/config";

export type VersusScope = "implemented" | "inDevelopment" | "planned";

export interface VersusConcept {
  name: string;
  status: VersusScope;
}

export interface VersusRepo {
  label: LocalizedText;
  href: string;
}

/**
 * Facts taken from the Versus repositories (mobile-versus, service-versus):
 * READMEs, Prisma schema, domain reference and Phase 1 scope. Nothing here is invented.
 */
export const VERSUS = {
  name: "Versus",
  problem: {
    en: "Rap-battle organizers in Brazil run live events with rosters, brackets, rounds and results. Versus is software for that operational work — not a social network and not a public ranking of the scene.",
    "pt-BR":
      "Organizadores de batalha de rima no Brasil conduzem eventos ao vivo com roster, chave, rounds e resultados. O Versus é o software dessa operação — não uma rede social e não um ranking público da cena.",
  },
  summary: {
    en: "A Flutter app for the battle operator and a NestJS REST API. The operator starts an edition, records rounds and results, and can undo. Data is the organization’s own declaration.",
    "pt-BR":
      "Um app Flutter para o operador da batalha e uma API REST em NestJS. O operador inicia uma edição, registra rounds e resultados, e pode desfazer. Os dados são a declaração da própria organização.",
  },
  architecture: {
    en: "The mobile app talks to a versioned REST API (`/v1`). Persistence is PostgreSQL through Prisma. Live rounds, ties and undo are stored as append-only edition events (LIFO). Scoring, bracket phases, repechage and double three are domain rules on the API. The operator drives those flows; there is no automatic bracket generator.",
    "pt-BR":
      "O app mobile fala com uma API REST versionada (`/v1`). A persistência é PostgreSQL via Prisma. Rounds ao vivo, empates e undo ficam em eventos de edição append-only (LIFO). Placar, fases da chave, repescagem e double three são regras de domínio na API. O operador conduz esses fluxos; não há gerador automático de chave.",
  },
  technologies: [
    "Flutter",
    "Dart",
    "NestJS",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "REST APIs",
    "OpenAPI",
  ],
  concepts: [
    { name: "Organization", status: "implemented" },
    { name: "Edition", status: "implemented" },
    { name: "MC (participant)", status: "implemented" },
    { name: "Battle (match)", status: "implemented" },
    { name: "Round", status: "implemented" },
    { name: "Result", status: "implemented" },
    { name: "Ranking (per organization)", status: "implemented" },
    { name: "Bracket (phase progression)", status: "implemented" },
    { name: "Repescagem", status: "implemented" },
    { name: "Auth", status: "planned" },
  ] as const satisfies readonly VersusConcept[],
  implemented: [
    {
      en: "Organization, edition, participant (MC) and match CRUD.",
      "pt-BR": "CRUD de organização, edição, participante (MC) e confronto.",
    },
    {
      en: "Live ops: best-of-3 rounds, sudden death, ties, undo.",
      "pt-BR": "Operação ao vivo: melhor de 3, morte súbita, empate, undo.",
    },
    {
      en: "Operator-driven repechage and double three in the qualifying stage.",
      "pt-BR": "Repescagem e double three conduzidos pelo operador na classificatória.",
    },
    {
      en: "Bracket phases by format target (TOP 4 / 8 / 16), including bye.",
      "pt-BR": "Fases da chave por meta (TOP 4 / 8 / 16), incluindo bye.",
    },
    {
      en: "Aggregated ranking per organization.",
      "pt-BR": "Ranking agregado por organização.",
    },
    {
      en: "OpenAPI/Swagger at `/docs`, health check, PostgreSQL via Prisma.",
      "pt-BR": "OpenAPI/Swagger em `/docs`, health check, PostgreSQL via Prisma.",
    },
  ] as const satisfies readonly LocalizedText[],
  inDevelopment: [
    {
      en: "The product is still in progress (Phase 1 / 1.5). The public contract is an API without organizer login.",
      "pt-BR":
        "O produto ainda está em andamento (Fase 1 / 1.5). O contrato público é uma API sem login de organizador.",
    },
  ] as const satisfies readonly LocalizedText[],
  planned: [
    {
      en: "Organizer authentication (Phase 2 in the project scope).",
      "pt-BR": "Autenticação de organizador (Fase 2 no escopo do projeto).",
    },
    {
      en: "Automatic bracket generation (groups / Swiss) — explicitly out of the current scope.",
      "pt-BR":
        "Gerador automático de chave (grupos / suíço) — fora do escopo atual, de forma explícita.",
    },
    {
      en: "Map / geolocation, public calendar, global MC profiles.",
      "pt-BR": "Mapa / geolocalização, calendário público, perfis globais de MC.",
    },
  ] as const satisfies readonly LocalizedText[],
  // Local Versus repos exist but are not in the public GitHub account (404 as of this writing).
  repos: [] as readonly VersusRepo[],
} as const;
