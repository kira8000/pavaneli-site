import type { PortfolioProject } from "./types";

export const PROJECTS: readonly PortfolioProject[] = [
  {
    id: "versus",
    name: "Versus",
    category: "personal",
    status: "inProgress",
    description: {
      en: "Software for rap-battle organizers: live editions, MCs, matches, rounds and results.",
      "pt-BR":
        "Software para organizadores de batalha de rima: edições ao vivo, MCs, confrontos, rounds e resultados.",
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
    links: {},
    featured: true,
    caseStudyHref: "/projects#versus",
  },
];
