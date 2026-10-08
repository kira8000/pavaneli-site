import type { ExperienceEntry } from "./types";

/** From the owner's CV; EN text is a faithful translation of the original PT-BR. */
export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    id: "begrowth",
    company: "BeGrowth",
    role: {
      en: "Mid-level Front-end Developer",
      "pt-BR": "Desenvolvedor Front-end Pleno",
    },
    startDate: "2024-01",
    endDate: "2026-06",
    applicationType: {
      en: "Internal and external products and tools",
      "pt-BR": "Produtos e ferramentas internas e externas",
    },
    technologies: ["React.js", "Next.js", "TypeScript", "JavaScript", "REST APIs", "GCP"],
    workedOn: [
      {
        en: "Internal and external web products and tools.",
        "pt-BR": "Produtos e ferramentas web internas e externas.",
      },
      {
        en: "User management, Google Ads pricing rules, and integrations with mobile applications.",
        "pt-BR":
          "Gestão de usuários, regras de preço do Google Ads e integrações com aplicações mobile.",
      },
      {
        en: "An administrative solution with a REST API for content management.",
        "pt-BR": "Uma solução administrativa com REST API para gerenciamento de conteúdo.",
      },
    ],
    responsibilities: [
      {
        en: "Implementing and evolving web features against product requirements, business rules, and integrations between systems.",
        "pt-BR":
          "Implementar e evoluir funcionalidades web a partir de requisitos, regras de negócio e integração entre sistemas.",
      },
      {
        en: "Improving build and deploy pipelines on GCP.",
        "pt-BR": "Melhorar pipelines de build e deploy em GCP.",
      },
      {
        en: "Defining requirements and logic myself, then reviewing AI-assisted implementation against the technical documentation.",
        "pt-BR":
          "Definir requisitos e lógica, e revisar a implementação assistida por IA contra a documentação técnica.",
      },
    ],
  },
  {
    id: "letz",
    company: "Letz",
    role: {
      en: "Junior / Mid-level Front-end Developer",
      "pt-BR": "Desenvolvedor Front-end Jr / Pleno",
    },
    startDate: "2020-03",
    endDate: "2023-04",
    applicationType: {
      en: "Corporate web applications",
      "pt-BR": "Aplicações web corporativas",
    },
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "REST APIs",
      "Node.js",
    ],
    workedOn: [
      {
        en: "Corporate web applications in React.js, Next.js and TypeScript/JavaScript.",
        "pt-BR":
          "Aplicações web corporativas em React.js, Next.js e TypeScript/JavaScript.",
      },
      {
        en: "Reusable components and complex features.",
        "pt-BR": "Componentes reutilizáveis e funcionalidades complexas.",
      },
      {
        en: "Integrations with external services through REST APIs.",
        "pt-BR": "Integrações com serviços externos por REST APIs.",
      },
      {
        en: "Node.js back-end pieces, including simple CRUD operations and middleware.",
        "pt-BR":
          "Trechos de back-end em Node.js, incluindo CRUD simples e middleware.",
      },
    ],
    responsibilities: [
      {
        en: "Maintaining and evolving those applications, with attention to usability.",
        "pt-BR": "Manter e evoluir essas aplicações, com atenção à usabilidade.",
      },
      {
        en: "Refactoring to improve visual consistency and maintainability.",
        "pt-BR": "Refatorar para melhorar consistência visual e manutenção.",
      },
      {
        en: "Defining requirements and logic for the back-end features, then reviewing the code against the technical documentation.",
        "pt-BR":
          "Definir requisitos e lógica das funcionalidades de back-end, e revisar o código contra a documentação técnica.",
      },
    ],
  },
];
