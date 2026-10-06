import type { PortfolioProject } from "./types";

export const PROJECTS: readonly PortfolioProject[] = [
  {
    id: "versus",
    name: "Versus",
    category: "personal",
    status: "inProgress",
    description: {
      en: "A system for managing rap battles.",
      "pt-BR": "Um sistema para gerenciamento de batalhas de rap.",
    },
    // TODO(owner): stack, repository and demo, once they exist and can be public.
    technologies: [],
    links: {},
    featured: true,
  },
];
