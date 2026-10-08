/**
 * English is the source of truth for the message shape.
 * `pt-BR.ts` is typed against it, so a missing key is a compile error.
 */
export const en = {
  nav: {
    home: "Home",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    engineering: "Engineering",
    aiAssisted: "AI-Assisted",
    playground: "Playground",
    contact: "Contact",
    versus: "Versus",
    primaryLabel: "Primary",
    mobileLabel: "Navigation menu",
  },
  common: {
    skipToContent: "Skip to content",
    inDevelopment: "In development",
    opensInNewTab: "(opens in a new tab)",
    comingSoon: "This section is under construction.",
    backHome: "Back to home",
    retry: "Try again",
    dismiss: "Dismiss",
    close: "Close",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
  },
  header: {
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    breadcrumb: "Breadcrumb",
    switchLanguageTo: "Switch language to",
    switchToLightTheme: "Switch to light theme",
    switchToDarkTheme: "Switch to dark theme",
  },
  palette: {
    open: "Open command palette",
    title: "Command palette",
    placeholder: "Search pages and actions",
    navigate: "Navigate",
    actions: "Actions",
    results: "Results",
    noResults: "No matching commands.",
    toggleTheme: "Toggle theme",
    toggleLanguage: "Toggle language",
  },
  footer: {
    links: "Profile links",
    email: "Email",
  },
  sidebar: {
    links: "External links",
  },
  notFound: {
    title: "Page not found",
    description: "The route you requested does not exist.",
  },
  error: {
    title: "Something went wrong",
    description: "An unexpected error occurred while rendering this page.",
  },
  validation: {
    required: "This field is required.",
    tooShort: "This value is too short.",
    tooLong: "This value is too long.",
    invalidEmail: "Enter a valid email address.",
    invalid: "This value is not valid.",
    duplicate: "This value is already in use.",
  },
  apiError: {
    validation: "Some fields are invalid. Check the form and try again.",
    not_found: "The requested record no longer exists.",
    conflict: "This change conflicts with an existing record.",
    unavailable: "The service is unavailable. Try again in a moment.",
  },
  playground: {
    title: "Interactive Engineering Demo",
    description:
      "A working admin-style demo on a simulated, in-memory API. It is not PostgreSQL and it is not a production backend.",
    capabilitiesLabel: "What this demo covers",
    capabilities: {
      crud: "CRUD",
      search: "Search",
      filtering: "Filtering",
      sorting: "Sorting",
      pagination: "Pagination",
      validation: "Validation",
      loading: "Loading states",
      error: "Error states",
      dialogs: "Dialogs",
      notifications: "Notifications",
      api: "Simulated API (HTTP-style status codes)",
    },
    source: "Source in this repository",
    loading: "Loading…",
    backend: {
      title: "Simulated backend",
      note: "Runs in your browser on fictional in-memory data. Nothing is sent anywhere.",
      latency: "Latency",
      failure: "Simulate API failure",
      reset: "Reset data",
      resetDone: "Mock data restored.",
    },
    tabs: {
      label: "Playground demos",
      users: "Users",
      tickets: "Tickets",
      api: "API demo",
      states: "States",
    },
    toast: { region: "Notifications" },
    table: {
      selectAll: "Select all rows on this page",
      selectRow: "Select",
      sortBy: "Sort by",
      sortedAsc: "Ascending. Click to sort descending.",
      sortedDesc: "Descending. Click to sort ascending.",
      actions: "Actions",
    },
    pagination: {
      label: "Pagination",
      results: "results",
      pageSize: "Rows per page",
      previous: "Previous page",
      next: "Next page",
      page: "Page",
      of: "of",
    },
    filters: { all: "All" },
    error: { title: "Could not load the data" },
    empty: {
      noMatchTitle: "No results",
      noMatchDescription: "Nothing matches the current search and filters.",
    },
    form: {
      requiredNote: "Fields marked with * are required.",
      save: "Save",
      saving: "Saving…",
    },
    users: {
      description:
        "Full CRUD with search, filters, sorting, pagination, row selection and bulk delete.",
      search: "Search by name or email",
      caption: "Users",
      columns: {
        name: "Name",
        email: "Email",
        role: "Role",
        status: "Status",
        createdAt: "Created",
      },
      role: { admin: "Admin", editor: "Editor", viewer: "Viewer" },
      status: { active: "Active", inactive: "Inactive", invited: "Invited" },
      new: "New user",
      editTitle: "Edit user",
      created: "User created.",
      updated: "User updated.",
      deleteSelected: "Delete selected",
      deleteTitle: "Delete user?",
      deleteBody: "This record will be removed from the mock data.",
      deleteManyTitle: "Delete selected users?",
      deleteManyBody: "selected users will be removed from the mock data.",
      deleting: "Deleting…",
      deletedCount: "Users deleted:",
      deleteFailedCount: "Users that could not be deleted:",
      emptyTitle: "No users yet",
      emptyDescription: "Create the first user, or reset the data.",
    },
    tickets: {
      description:
        "A second domain on the same table components: read-only, with filters, sorting and pagination.",
      search: "Search by title or description",
      caption: "Tickets",
      columns: {
        title: "Title",
        status: "Status",
        priority: "Priority",
        assignee: "Assignee",
        updatedAt: "Updated",
      },
      status: {
        open: "Open",
        in_progress: "In progress",
        resolved: "Resolved",
        closed: "Closed",
      },
      priority: { low: "Low", medium: "Medium", high: "High", critical: "Critical" },
      unassigned: "Unassigned",
      emptyTitle: "No tickets",
      emptyDescription: "There are no tickets in the mock data.",
    },
    api: {
      description:
        "Send GET, POST, PATCH and DELETE requests through the same service layer the tables use, and inspect the HTTP-style response.",
      resource: "Resource",
      method: "Method",
      idRequired: "Record id",
      idOptional: "Record id (optional)",
      body: "JSON body",
      send: "Send request",
      sending: "Sending…",
      response: "Response",
      noResponse: "Send a request to see the response.",
      noContent: "(no content)",
      simulated:
        "Simulated: status codes and bodies mirror what a REST API would return.",
    },
    states: {
      description:
        "Each button runs a real request against the mock backend under the conditions that produce that state.",
      run: {
        loading: "Slow request",
        success: "Success",
        empty: "Empty result",
        error: "Server error",
      },
      idleTitle: "Pick a scenario",
      idleDescription: "The result of the request appears here.",
      successTitle: "Success: first users returned",
      emptyTitle: "Empty state",
      emptyDescription: "The request worked, but no record matched the search.",
    },
  },
  skills: {
    languages: "Languages",
    frontend: "Front-end",
    backend: "Back-end",
    apis: "APIs & integrations",
    database: "Databases",
    testing: "Testing",
    cloud: "Cloud & DevOps",
    workflow: "AI-assisted development",
    practices: "Engineering practices",
    practiceItems: {
      testing: "Testing",
      architecture: "Architecture",
      components: "Reusable components",
      enterprise: "Corporate applications",
      problemSolving: "Problem solving",
      refactoring: "Refactoring and evolving systems",
      aiReview: "AI-assisted development with human review",
    },
  },
  workflow: {
    steps: {
      requirements: "Requirements",
      businessRules: "Business rules",
      architecture: "Architecture",
      aiImplementation: "AI-assisted implementation",
      humanReview: "Human review",
      testing: "Testing",
      staticChecks: "Lint / typecheck",
      securityReview: "Security review",
      documentation: "Documentation",
      delivery: "Delivery",
    },
  },
  home: {
    heroDescription:
      "I build web applications in React.js, Next.js and TypeScript — UI, APIs and business rules included. Open to Front-end and Full Stack roles, including remote work in Brazil.",
    ctaProjects: "View my work",
    ctaContact: "Let's talk",
    summaryTitle: "Professional summary",
    summaryBody:
      "I work on web applications with a strong front-end base in React.js, Next.js and TypeScript, and I take them through APIs, business rules and Node.js when the work needs it. I care about code that is easy to understand, test and change. AI speeds up implementation; I still own the requirements, the review and the validation.",
    skillsTitle: "Core skills",
    experienceTitle: "Experience",
    experienceBody:
      "A timeline of the applications I worked on, the technologies involved and my responsibilities.",
    experienceCta: "See experience",
    projectsTitle: "Projects",
    projectsCta: "All projects",
    mindsetTitle: "Engineering mindset",
    mindsetBody: "Decisions I try to justify in every project:",
    mindsetCta: "How I approach engineering",
    mindset: {
      simplicity: "Simplicity before abstraction: complexity only when it is justified.",
      separation: "Clear separation between UI, domain rules and data access.",
      testing: "Tests that verify behavior, not implementation details.",
      accessibility: "Accessibility and responsiveness as requirements, not extras.",
      performance: "Performance decisions backed by a reason, not guesswork.",
    },
    aiTitle: "AI-assisted engineering",
    aiBody:
      "AI helps with implementation. Requirements, architecture, business rules, validation and quality remain my responsibility.",
    aiCta: "See the workflow",
    ctaTitle: "Let's talk",
    ctaBody:
      "LinkedIn, GitHub or email. I am based in São Paulo and open to remote opportunities in Brazil.",
  },
  about: {
    description: "What I build, how I work, and the stack I use on web applications.",
    profileTitle: "Profile",
    profileOne:
      "I build web applications in React.js, Next.js and TypeScript: reusable components, clear structure, and code that can be maintained.",
    profileTwo:
      "On the back end I work with Node.js, NestJS, REST APIs, PostgreSQL, Prisma and OpenAPI when the product needs that layer.",
    trajectoryTitle: "Trajectory",
    frontendTitle: "Front-end",
    frontendBody:
      "My strongest area: React.js, Next.js, TypeScript and JavaScript, on reusable components and corporate applications.",
    fullstackTitle: "Full Stack",
    fullstackBody:
      "APIs, business rules and data access with Node.js, NestJS, REST, PostgreSQL, Prisma and OpenAPI.",
    nextTitle: "Focus going forward",
    nextBody: "Deeper architecture, testing, and evolving systems that already exist.",
    focusTitle: "Focus areas",
    educationTitle: "Education",
    aiTitle: "Responsible use of AI",
    aiBody:
      "AI accelerates implementation. I still own requirements, architecture, business rules, review, tests and security. I should be able to understand, explain, debug, modify and validate the code I ship.",
    aiCta: "See the workflow",
  },
  experience: {
    description: "What I worked on, what I owned, and the stack in each role.",
    timelineLabel: "Professional timeline",
    present: "Present",
    applicationType: "Application type",
    technologies: "Technologies",
    workedOn: "What I worked on",
    responsibilities: "What I was responsible for",
    highlights: "Technical highlights",
    emptyTitle: "Experience details coming soon",
    emptyBody: "The professional timeline is being prepared and will be published here.",
  },
  projects: {
    description:
      "Selected work. Versus is the main case study; more projects will follow as they can be published.",
    inProgress: "In development",
    completed: "Completed",
    implemented: "Implemented",
    planned: "Planned",
    category: {
      professional: "Professional",
      personal: "Personal project",
      openSource: "Open source",
    },
    stack: "Stack",
    repository: "Repository",
    demo: "Demo",
    caseStudy: "Case study",
    problem: "Problem",
    architecture: "Architecture",
    domain: "Domain concepts",
    noDemo: "No public demo yet.",
    noRepo: "The source repositories are not public yet.",
    pendingDetails:
      "Repository, demo and architecture notes will be added as the project evolves.",
    moreSoon: "More projects will be added here when they can be published honestly.",
  },
  contact: {
    description:
      "LinkedIn, GitHub or email. São Paulo, SP — also open to remote work in Brazil.",
    channelsTitle: "Channels",
    channelsBody: "Professional contact: LinkedIn. Code: GitHub. Direct: email.",
    email: "Email",
    location: "Location",
    copyEmail: "Copy email",
    copied: "Email copied",
  },
  engineering: {
    description:
      "How I think about building software: architecture, quality and trade-offs.",
    illustrativeNote:
      "“From this repository” is real code in this site. “Illustrative” is a pattern, not a production system I shipped. “Conceptual” is knowledge and practice, not a claim that this portfolio runs that stack.",
    origin: {
      illustrative: "Illustrative",
      repository: "From this repository",
      conceptual: "Conceptual",
    },
    performanceNote:
      "This site is Server Components by default, with self-hosted fonts and no client data library. The Playground is the main client bundle and loads on that route. There is no fabricated Lighthouse score here.",
    aiTitle: "AI-assisted engineering",
    aiBody: "AI is a tool inside an engineering process, not a replacement for it.",
    aiCta: "See how I use AI as an engineering tool",
    topics: {
      frontend: {
        title: "Frontend architecture",
        intro: "How I structure React and Next.js applications.",
        components:
          "Small, cohesive components. Reuse only when the duplication is real, not to save a few lines.",
        boundaries:
          "Server Components by default; Client Components only for interactivity and browser APIs.",
        state:
          "State lives close to where it is used. No global store without a real need.",
        forms:
          "Forms validate at the boundary with schemas and give accessible, specific feedback.",
        separation:
          "UI stays free of business rules. Data access goes through services and repositories, so the data source can change without rewriting the UI.",
      },
      backend: {
        title: "Backend architecture",
        intro: "How I organize REST APIs with Node.js and NestJS.",
        rest: "REST resources with clear verbs and meaningful status codes.",
        layers:
          "Controllers handle HTTP, services hold business rules, repositories handle persistence.",
        validation:
          "Input is validated at the boundary (DTOs and schemas) before it reaches business logic.",
        middleware:
          "Cross-cutting concerns such as authentication, logging and error mapping live in middleware, guards and filters.",
        contracts:
          "API contracts are documented with OpenAPI, so clients and servers share one source of truth.",
        errors: "Consistent error responses that never leak internal details.",
      },
      database: {
        title: "Database",
        intro: "Relational modeling with PostgreSQL and Prisma.",
        note: "Conceptual only: this portfolio does not use a real PostgreSQL database. The playground runs on in-memory mock data.",
        modeling: "Entities, constraints and relationships are modeled explicitly.",
        prisma:
          "The Prisma schema is the typed source of truth for models and migrations.",
        crud: "CRUD operations go through a repository, never directly from controllers or components.",
        relationships:
          "One-to-many relationships, such as users and their tickets, expressed with foreign keys.",
      },
      testing: {
        title: "Testing",
        intro: "Tests that give confidence, not just coverage.",
        note: "This project uses Vitest and Testing Library; in professional work I use Jest.",
        unit: "Unit tests for pure domain rules and utilities.",
        component:
          "Component tests with Testing Library, using roles and labels to verify behavior instead of implementation.",
        integration:
          "Integration tests where layers meet, such as a service working with its repository.",
        e2e: "End-to-end tests for critical user flows. This is a concept here: this project has no E2E suite.",
      },
      performance: {
        title: "Performance",
        intro: "Decisions backed by a reason, not guesswork.",
        server: "Server Components and static rendering to ship less JavaScript.",
        splitting:
          "Code splitting and lazy loading for heavy client code that is not needed on first paint.",
        assets: "Optimized images and fonts with next/image and next/font.",
        rerenders:
          "Avoid unnecessary re-renders: measure first, memoize only with evidence.",
        caching: "An explicit caching and revalidation strategy for data fetching.",
      },
      accessibility: {
        title: "Accessibility",
        intro: "A requirement, not a final polish step.",
        semantic: "Semantic HTML first; ARIA only when native semantics are not enough.",
        keyboard:
          "Everything is reachable and operable with the keyboard, with visible focus.",
        focus:
          "Modals and drawers use the native dialog element, which provides focus trapping, Escape and focus return.",
        contrast:
          "Sufficient color contrast in both themes, and no information conveyed by color alone.",
        screenReaders:
          "Accessible names for icon buttons, a sensible heading hierarchy and respect for reduced motion.",
      },
      security: {
        title: "Security",
        intro: "Treated as an engineering requirement, even for a portfolio.",
        note: "This portfolio has no authentication and stores no user data; these are the principles I follow.",
        validation: "Validate and sanitize all external input at trust boundaries.",
        xss: "Never render untrusted HTML: React escapes by default and dangerouslySetInnerHTML is avoided.",
        links: 'External links use rel="noopener noreferrer".',
        env: "Secrets live only in server-side environment variables, never in client bundles.",
        authn:
          "Authentication proves who you are; authorization decides what you can do and is enforced on the server.",
        api: "Secure API design: least privilege, input limits and consistent error handling.",
      },
    },
  },
  aiPage: {
    title: "AI-Assisted Engineering",
    description:
      "AI accelerates implementation. Requirements, architecture, business rules, data modeling, review, tests, security and accessibility stay with me.",
    accountability:
      "I should be able to understand, explain, debug, modify and validate the code I ship.",
    workflowTitle: "Workflow",
    workflowBody: "AI takes part in one step. Everything around it is still engineering.",
    humanTitle: "What stays with me",
    human: {
      requirements: "Defining requirements and business rules.",
      logic: "Defining the logic and the data models.",
      architecture: "Understanding and deciding the architecture.",
      review: "Reviewing every piece of generated code.",
      validation: "Validating behavior with tests, types and lint.",
      quality: "Considering security and accessibility.",
      docs: "Making the documentation reflect the real behavior.",
    },
    helpsTitle: "Where AI helps",
    helps: {
      implementation:
        "Implementing tasks whose requirements and logic I have already defined.",
      practices: "Supporting the consistent application of good practices.",
    },
    checklistTitle: "Review checklist",
    checklistBody: "What I verify before accepting generated code:",
    checklist: {
      requirements: "It does what was specified, nothing more.",
      rules: "It follows the project architecture and rules.",
      types: "Types are correct: strict mode, no unnecessary any.",
      checks: "Lint and typecheck pass without disabling rules.",
      tests: "Tests verify behavior, not implementation details.",
      security: "Inputs are validated and no secrets are exposed.",
      accessibility: "It is semantic and operable with the keyboard.",
      docs: "Documentation matches the real behavior.",
    },
    exampleTitle: "Example",
    exampleBody:
      "An illustrative task specification and the kind of review notes it leads to.",
    toolsTitle: "Development workflow",
    toolsBody:
      "Cursor and Claude Code are part of the workflow, not a substitute for the stack. This repository includes Cursor rules (in .cursor/rules) that the tools have to follow.",
  },
};

export type Messages = typeof en;
