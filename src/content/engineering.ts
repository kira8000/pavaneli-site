import type { MessageKey } from "@/i18n/translate";
import {
  NATIVE_DIALOG,
  NEST_LAYERS,
  PRISMA_SCHEMA,
  SERVER_CLIENT_BOUNDARY,
  THEME_TOGGLE_TEST,
  type CodeSnippet,
} from "./code-snippets";

export interface EngineeringTopic {
  id: string;
  titleKey: MessageKey;
  introKey: MessageKey;
  pointKeys: readonly MessageKey[];
  /** Caveat about scope (for example "conceptual only"); rendered prominently. */
  noteKey?: MessageKey;
  /** Technical nouns, intentionally not translated. */
  flow?: readonly string[];
  snippet?: CodeSnippet;
}

export const ENGINEERING_TOPICS: readonly EngineeringTopic[] = [
  {
    id: "frontend",
    titleKey: "engineering.topics.frontend.title",
    introKey: "engineering.topics.frontend.intro",
    pointKeys: [
      "engineering.topics.frontend.components",
      "engineering.topics.frontend.boundaries",
      "engineering.topics.frontend.state",
      "engineering.topics.frontend.forms",
      "engineering.topics.frontend.separation",
    ],
    flow: ["UI", "Hooks", "Services", "Repository", "Mock / API"],
    snippet: SERVER_CLIENT_BOUNDARY,
  },
  {
    id: "backend",
    titleKey: "engineering.topics.backend.title",
    introKey: "engineering.topics.backend.intro",
    pointKeys: [
      "engineering.topics.backend.rest",
      "engineering.topics.backend.layers",
      "engineering.topics.backend.validation",
      "engineering.topics.backend.middleware",
      "engineering.topics.backend.contracts",
      "engineering.topics.backend.errors",
    ],
    flow: ["Request", "Middleware", "Controller", "Service", "Repository", "Database"],
    snippet: NEST_LAYERS,
  },
  {
    id: "database",
    titleKey: "engineering.topics.database.title",
    introKey: "engineering.topics.database.intro",
    noteKey: "engineering.topics.database.note",
    pointKeys: [
      "engineering.topics.database.modeling",
      "engineering.topics.database.prisma",
      "engineering.topics.database.crud",
      "engineering.topics.database.relationships",
    ],
    snippet: PRISMA_SCHEMA,
  },
  {
    id: "testing",
    titleKey: "engineering.topics.testing.title",
    introKey: "engineering.topics.testing.intro",
    noteKey: "engineering.topics.testing.note",
    pointKeys: [
      "engineering.topics.testing.unit",
      "engineering.topics.testing.component",
      "engineering.topics.testing.integration",
      "engineering.topics.testing.e2e",
    ],
    snippet: THEME_TOGGLE_TEST,
  },
  {
    id: "performance",
    titleKey: "engineering.topics.performance.title",
    introKey: "engineering.topics.performance.intro",
    pointKeys: [
      "engineering.topics.performance.server",
      "engineering.topics.performance.splitting",
      "engineering.topics.performance.assets",
      "engineering.topics.performance.rerenders",
      "engineering.topics.performance.caching",
    ],
  },
  {
    id: "accessibility",
    titleKey: "engineering.topics.accessibility.title",
    introKey: "engineering.topics.accessibility.intro",
    pointKeys: [
      "engineering.topics.accessibility.semantic",
      "engineering.topics.accessibility.keyboard",
      "engineering.topics.accessibility.focus",
      "engineering.topics.accessibility.contrast",
      "engineering.topics.accessibility.screenReaders",
    ],
    snippet: NATIVE_DIALOG,
  },
  {
    id: "security",
    titleKey: "engineering.topics.security.title",
    introKey: "engineering.topics.security.intro",
    noteKey: "engineering.topics.security.note",
    pointKeys: [
      "engineering.topics.security.validation",
      "engineering.topics.security.xss",
      "engineering.topics.security.links",
      "engineering.topics.security.env",
      "engineering.topics.security.authn",
      "engineering.topics.security.api",
    ],
  },
];
