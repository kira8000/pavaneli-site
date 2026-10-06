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
    responsibilities: [
      {
        en: "Development and evolution of web applications using React.js, Next.js, TypeScript and JavaScript, working on internal and external products and tools.",
        "pt-BR":
          "Desenvolvimento e evolução de aplicações web utilizando React.js, Next.js, TypeScript e JavaScript, atuando em produtos e ferramentas internas e externas.",
      },
      {
        en: "Implementation of features for user management, Google Ads pricing rules and integrations with mobile applications.",
        "pt-BR":
          "Implementação de funcionalidades para gestão de usuários, regras de preço do Google Ads e integrações com aplicações mobile.",
      },
      {
        en: "Development of an administrative solution with a REST API for content management.",
        "pt-BR":
          "Desenvolvimento de solução administrativa com REST API para gerenciamento de conteúdo.",
      },
      {
        en: "Improvement of build and deploy pipelines on GCP.",
        "pt-BR": "Melhoria de pipelines de build e deploy em GCP.",
      },
      {
        en: "Development and evolution of web application features, considering requirements, business rules and integration between different systems and services.",
        "pt-BR":
          "Desenvolvimento e evolução de funcionalidades para aplicações web, considerando requisitos, regras de negócio e integração entre diferentes sistemas e serviços.",
      },
      {
        en: "Use of AI-assisted development practices to support implementation and code quality, with human definition of requirements and logic, review of the generated code and consultation of the technical documentation.",
        "pt-BR":
          "Utilização de práticas de desenvolvimento assistido por IA para apoiar implementação e qualidade do código, com definição humana dos requisitos e da lógica, revisão do código gerado e consulta à documentação técnica.",
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
    responsibilities: [
      {
        en: "Development and maintenance of corporate web applications using React.js, Next.js and TypeScript/JavaScript, ensuring high performance and usability.",
        "pt-BR":
          "Desenvolvimento e manutenção de aplicações web corporativas utilizando React.js, Next.js e TypeScript/JavaScript, garantindo alta performance e usabilidade.",
      },
      {
        en: "Creation of reusable components and development of complex features.",
        "pt-BR":
          "Criação de componentes reutilizáveis e desenvolvimento de funcionalidades complexas.",
      },
      {
        en: "Code refactoring to improve visual consistency and the maintainability of the applications.",
        "pt-BR":
          "Refatoração de código visando melhorar a consistência visual e a manutenção das aplicações.",
      },
      {
        en: "Integration with external services through REST APIs.",
        "pt-BR": "Integração com serviços externos por meio de REST APIs.",
      },
      {
        en: "Back-end development with Node.js, including simple CRUD operations and middleware, using an AI-assisted approach to support implementation and good practices.",
        "pt-BR":
          "Desenvolvimento backend com Node.js, incluindo operações CRUD simples e middleware, utilizando abordagem AI-assisted para apoiar implementação e aplicação de boas práticas.",
      },
      {
        en: "Definition of the requirements and logic of the back-end features, with human code review and validation against the technical documentation.",
        "pt-BR":
          "Definição dos requisitos e da lógica das funcionalidades backend, com revisão humana do código e validação utilizando documentação técnica.",
      },
    ],
  },
];
