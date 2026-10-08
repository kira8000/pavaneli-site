import type { Messages } from "./en";

export const ptBR: Messages = {
  nav: {
    home: "Início",
    about: "Sobre",
    experience: "Experiência",
    projects: "Projetos",
    engineering: "Engenharia",
    aiAssisted: "IA na Engenharia",
    playground: "Playground",
    contact: "Contato",
    versus: "Versus",
    primaryLabel: "Principal",
    mobileLabel: "Menu de navegação",
  },
  common: {
    skipToContent: "Pular para o conteúdo",
    inDevelopment: "Em desenvolvimento",
    opensInNewTab: "(abre em uma nova aba)",
    comingSoon: "Esta seção está em construção.",
    backHome: "Voltar ao início",
    retry: "Tentar novamente",
    dismiss: "Dispensar",
    close: "Fechar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Excluir",
  },
  header: {
    openMenu: "Abrir menu de navegação",
    closeMenu: "Fechar menu de navegação",
    breadcrumb: "Trilha de navegação",
    switchLanguageTo: "Mudar idioma para",
    switchToLightTheme: "Mudar para o tema claro",
    switchToDarkTheme: "Mudar para o tema escuro",
  },
  palette: {
    open: "Abrir paleta de comandos",
    title: "Paleta de comandos",
    placeholder: "Buscar páginas e ações",
    navigate: "Navegar",
    actions: "Ações",
    results: "Resultados",
    noResults: "Nenhum comando correspondente.",
    toggleTheme: "Alternar tema",
    toggleLanguage: "Alternar idioma",
  },
  footer: {
    links: "Links do perfil",
    email: "E-mail",
  },
  sidebar: {
    links: "Links externos",
  },
  notFound: {
    title: "Página não encontrada",
    description: "A rota solicitada não existe.",
  },
  error: {
    title: "Algo deu errado",
    description: "Ocorreu um erro inesperado ao renderizar esta página.",
  },
  validation: {
    required: "Este campo é obrigatório.",
    tooShort: "Este valor é curto demais.",
    tooLong: "Este valor é longo demais.",
    invalidEmail: "Informe um e-mail válido.",
    invalid: "Este valor não é válido.",
    duplicate: "Este valor já está em uso.",
  },
  apiError: {
    validation: "Alguns campos são inválidos. Revise o formulário e tente novamente.",
    not_found: "O registro solicitado não existe mais.",
    conflict: "Esta alteração conflita com um registro existente.",
    unavailable: "O serviço está indisponível. Tente novamente em instantes.",
  },
  playground: {
    title: "Demo interativa de engenharia",
    description:
      "Uma demo funcional no estilo painel administrativo sobre uma API simulada em memória. Não é PostgreSQL e não é um backend de produção.",
    capabilitiesLabel: "O que esta demo cobre",
    capabilities: {
      crud: "CRUD",
      search: "Busca",
      filtering: "Filtros",
      sorting: "Ordenação",
      pagination: "Paginação",
      validation: "Validação",
      loading: "Estados de carregamento",
      error: "Estados de erro",
      dialogs: "Diálogos",
      notifications: "Notificações",
      api: "API simulada (status no estilo HTTP)",
    },
    source: "Código neste repositório",
    loading: "Carregando…",
    backend: {
      title: "Backend simulado",
      note: "Roda no seu navegador com dados fictícios em memória. Nada é enviado para fora.",
      latency: "Latência",
      failure: "Simular falha da API",
      reset: "Restaurar dados",
      resetDone: "Dados de exemplo restaurados.",
    },
    tabs: {
      label: "Demos do playground",
      users: "Usuários",
      tickets: "Tickets",
      api: "Demo de API",
      states: "Estados",
    },
    toast: { region: "Notificações" },
    table: {
      selectAll: "Selecionar todas as linhas desta página",
      selectRow: "Selecionar",
      sortBy: "Ordenar por",
      sortedAsc: "Crescente. Clique para ordenar de forma decrescente.",
      sortedDesc: "Decrescente. Clique para ordenar de forma crescente.",
      actions: "Ações",
    },
    pagination: {
      label: "Paginação",
      results: "resultados",
      pageSize: "Linhas por página",
      previous: "Página anterior",
      next: "Próxima página",
      page: "Página",
      of: "de",
    },
    filters: { all: "Todos" },
    error: { title: "Não foi possível carregar os dados" },
    empty: {
      noMatchTitle: "Nenhum resultado",
      noMatchDescription: "Nada corresponde à busca e aos filtros atuais.",
    },
    form: {
      requiredNote: "Campos marcados com * são obrigatórios.",
      save: "Salvar",
      saving: "Salvando…",
    },
    users: {
      description:
        "CRUD completo com busca, filtros, ordenação, paginação, seleção de linhas e exclusão em lote.",
      search: "Buscar por nome ou e-mail",
      caption: "Usuários",
      columns: {
        name: "Nome",
        email: "E-mail",
        role: "Perfil",
        status: "Status",
        createdAt: "Criado em",
      },
      role: { admin: "Admin", editor: "Editor", viewer: "Leitor" },
      status: { active: "Ativo", inactive: "Inativo", invited: "Convidado" },
      new: "Novo usuário",
      editTitle: "Editar usuário",
      created: "Usuário criado.",
      updated: "Usuário atualizado.",
      deleteSelected: "Excluir selecionados",
      deleteTitle: "Excluir usuário?",
      deleteBody: "Este registro será removido dos dados de exemplo.",
      deleteManyTitle: "Excluir usuários selecionados?",
      deleteManyBody: "usuários selecionados serão removidos dos dados de exemplo.",
      deleting: "Excluindo…",
      deletedCount: "Usuários excluídos:",
      deleteFailedCount: "Usuários que não puderam ser excluídos:",
      emptyTitle: "Nenhum usuário ainda",
      emptyDescription: "Crie o primeiro usuário ou restaure os dados.",
    },
    tickets: {
      description:
        "Um segundo domínio nos mesmos componentes de tabela: somente leitura, com filtros, ordenação e paginação.",
      search: "Buscar por título ou descrição",
      caption: "Tickets",
      columns: {
        title: "Título",
        status: "Status",
        priority: "Prioridade",
        assignee: "Responsável",
        updatedAt: "Atualizado em",
      },
      status: {
        open: "Aberto",
        in_progress: "Em andamento",
        resolved: "Resolvido",
        closed: "Fechado",
      },
      priority: { low: "Baixa", medium: "Média", high: "Alta", critical: "Crítica" },
      unassigned: "Sem responsável",
      emptyTitle: "Nenhum ticket",
      emptyDescription: "Não há tickets nos dados de exemplo.",
    },
    api: {
      description:
        "Envie requisições GET, POST, PATCH e DELETE pela mesma camada de serviço usada nas tabelas e veja a resposta no formato HTTP.",
      resource: "Recurso",
      method: "Método",
      idRequired: "Id do registro",
      idOptional: "Id do registro (opcional)",
      body: "Corpo JSON",
      send: "Enviar requisição",
      sending: "Enviando…",
      response: "Resposta",
      noResponse: "Envie uma requisição para ver a resposta.",
      noContent: "(sem conteúdo)",
      simulated:
        "Simulado: códigos de status e corpos refletem o que uma API REST retornaria.",
    },
    states: {
      description:
        "Cada botão executa uma requisição real contra o backend simulado, nas condições que produzem aquele estado.",
      run: {
        loading: "Requisição lenta",
        success: "Sucesso",
        empty: "Resultado vazio",
        error: "Erro do servidor",
      },
      idleTitle: "Escolha um cenário",
      idleDescription: "O resultado da requisição aparece aqui.",
      successTitle: "Sucesso: primeiros usuários retornados",
      emptyTitle: "Estado vazio",
      emptyDescription:
        "A requisição funcionou, mas nenhum registro corresponde à busca.",
    },
  },
  skills: {
    languages: "Linguagens",
    frontend: "Front-end",
    backend: "Back-end",
    apis: "APIs e integrações",
    database: "Banco de dados",
    testing: "Testes",
    cloud: "Cloud e DevOps",
    workflow: "Desenvolvimento assistido por IA",
    practices: "Práticas de engenharia",
    practiceItems: {
      testing: "Testes",
      architecture: "Arquitetura",
      components: "Componentes reutilizáveis",
      enterprise: "Aplicações corporativas",
      problemSolving: "Resolução de problemas",
      refactoring: "Refatoração e evolução de sistemas",
      aiReview: "Desenvolvimento assistido por IA com revisão humana",
    },
  },
  workflow: {
    steps: {
      requirements: "Requisitos",
      businessRules: "Regras de negócio",
      architecture: "Arquitetura",
      aiImplementation: "Implementação assistida por IA",
      humanReview: "Revisão humana",
      testing: "Testes",
      staticChecks: "Lint / typecheck",
      securityReview: "Revisão de segurança",
      documentation: "Documentação",
      delivery: "Entrega",
    },
  },
  home: {
    heroDescription:
      "Construo aplicações web em React.js, Next.js e TypeScript — interface, APIs e regras de negócio. Aberto a vagas de Front-end e Full Stack, inclusive remoto no Brasil.",
    ctaProjects: "Ver o trabalho",
    ctaContact: "Vamos conversar",
    summaryTitle: "Resumo profissional",
    summaryBody:
      "Trabalho em aplicações web com base forte em React.js, Next.js e TypeScript, e levo isso até APIs, regras de negócio e Node.js quando o produto pede. Me importa código fácil de entender, testar e mudar. A IA acelera a implementação; requisitos, revisão e validação continuam comigo.",
    skillsTitle: "Principais competências",
    experienceTitle: "Experiência",
    experienceBody:
      "Uma linha do tempo das aplicações em que atuei, das tecnologias envolvidas e das minhas responsabilidades.",
    experienceCta: "Ver experiência",
    projectsTitle: "Projetos",
    projectsCta: "Todos os projetos",
    mindsetTitle: "Mentalidade de engenharia",
    mindsetBody: "Decisões que busco justificar em cada projeto:",
    mindsetCta: "Como penso engenharia",
    mindset: {
      simplicity:
        "Simplicidade antes de abstração: complexidade somente quando justificada.",
      separation: "Separação clara entre interface, regras de domínio e acesso a dados.",
      testing: "Testes que verificam comportamento, não detalhes de implementação.",
      accessibility: "Acessibilidade e responsividade como requisitos, não extras.",
      performance: "Decisões de performance com justificativa, não suposição.",
    },
    aiTitle: "Engenharia assistida por IA",
    aiBody:
      "A IA ajuda na implementação. Requisitos, arquitetura, regras de negócio, validação e qualidade continuam sob minha responsabilidade.",
    aiCta: "Ver o fluxo",
    ctaTitle: "Vamos conversar",
    ctaBody:
      "LinkedIn, GitHub ou e-mail. Estou em São Paulo e aberto a oportunidades remotas no Brasil.",
  },
  about: {
    description: "O que eu construo, como trabalho e a stack que uso em aplicações web.",
    profileTitle: "Perfil",
    profileOne:
      "Construo aplicações web em React.js, Next.js e TypeScript: componentes reutilizáveis, estrutura clara e código que dá para manter.",
    profileTwo:
      "No back-end trabalho com Node.js, NestJS, APIs REST, PostgreSQL, Prisma e OpenAPI quando o produto precisa dessa camada.",
    trajectoryTitle: "Trajetória",
    frontendTitle: "Front-end",
    frontendBody:
      "Minha área mais forte: React.js, Next.js, TypeScript e JavaScript, em componentes reutilizáveis e aplicações corporativas.",
    fullstackTitle: "Full Stack",
    fullstackBody:
      "APIs, regras de negócio e acesso a dados com Node.js, NestJS, REST, PostgreSQL, Prisma e OpenAPI.",
    nextTitle: "Foco daqui para frente",
    nextBody: "Arquitetura, testes e a evolução de sistemas que já existem.",
    focusTitle: "Áreas de foco",
    educationTitle: "Formação acadêmica",
    aiTitle: "Uso responsável de IA",
    aiBody:
      "A IA acelera a implementação. Requisitos, arquitetura, regras de negócio, revisão, testes e segurança continuam comigo. Eu preciso entender, explicar, depurar, alterar e validar o código que entrego.",
    aiCta: "Ver o fluxo",
  },
  experience: {
    description:
      "Em que trabalhei, o que era minha responsabilidade e a stack de cada função.",
    timelineLabel: "Linha do tempo profissional",
    present: "Atual",
    applicationType: "Tipo de aplicação",
    technologies: "Tecnologias",
    workedOn: "Em que trabalhei",
    responsibilities: "Pelo que fui responsável",
    highlights: "Destaques técnicos",
    emptyTitle: "Detalhes da experiência em breve",
    emptyBody:
      "A linha do tempo profissional está sendo preparada e será publicada aqui.",
  },
  projects: {
    description:
      "Trabalho selecionado. O Versus é o case study principal; outros projetos entram quando puderem ser publicados.",
    inProgress: "Em desenvolvimento",
    completed: "Concluído",
    implemented: "Implementado",
    planned: "Planejado",
    category: {
      professional: "Profissional",
      personal: "Projeto pessoal",
      openSource: "Código aberto",
    },
    stack: "Stack",
    repository: "Repositório",
    demo: "Demo",
    caseStudy: "Case study",
    problem: "Problema",
    architecture: "Arquitetura",
    domain: "Conceitos de domínio",
    noDemo: "Ainda sem demo pública.",
    noRepo: "Os repositórios ainda não são públicos.",
    pendingDetails:
      "Repositório, demo e notas de arquitetura serão adicionados conforme o projeto evoluir.",
    moreSoon: "Mais projetos entram aqui quando puderem ser publicados com honestidade.",
  },
  contact: {
    description:
      "LinkedIn, GitHub ou e-mail. São Paulo, SP — também aberto a trabalho remoto no Brasil.",
    channelsTitle: "Canais",
    channelsBody: "Contato profissional: LinkedIn. Código: GitHub. Direto: e-mail.",
    email: "E-mail",
    location: "Localização",
    copyEmail: "Copiar e-mail",
    copied: "E-mail copiado",
  },
  engineering: {
    description:
      "Como penso a construção de software: arquitetura, qualidade e trade-offs.",
    illustrativeNote:
      "“Deste repositório” é código real deste site. “Ilustrativo” é um padrão, não um sistema de produção que eu tenha entregue. “Conceitual” é conhecimento e prática, não a afirmação de que este portfólio roda essa stack.",
    origin: {
      illustrative: "Ilustrativo",
      repository: "Deste repositório",
      conceptual: "Conceitual",
    },
    performanceNote:
      "Este site é Server Components por padrão, com fontes self-hosted e sem biblioteca de dados no cliente. O Playground é o principal bundle client e carrega nessa rota. Não há score de Lighthouse inventado aqui.",
    aiTitle: "Engenharia assistida por IA",
    aiBody:
      "A IA é uma ferramenta dentro de um processo de engenharia, não um substituto dele.",
    aiCta: "Veja como uso IA como ferramenta de engenharia",
    topics: {
      frontend: {
        title: "Arquitetura front-end",
        intro: "Como estruturo aplicações React e Next.js.",
        components:
          "Componentes pequenos e coesos. Reutilizo somente quando a duplicação é real, não para economizar poucas linhas.",
        boundaries:
          "Server Components por padrão; Client Components apenas para interatividade e APIs do navegador.",
        state:
          "O estado fica perto de onde é usado. Sem store global sem necessidade real.",
        forms:
          "Formulários validam na fronteira com schemas e dão feedback acessível e específico.",
        separation:
          "A interface fica livre de regras de negócio. O acesso a dados passa por services e repositories, então a fonte de dados pode mudar sem reescrever a UI.",
      },
      backend: {
        title: "Arquitetura back-end",
        intro: "Como organizo APIs REST com Node.js e NestJS.",
        rest: "Recursos REST com verbos claros e status codes significativos.",
        layers:
          "Controllers cuidam do HTTP, services concentram regras de negócio, repositories cuidam da persistência.",
        validation:
          "A entrada é validada na fronteira (DTOs e schemas) antes de chegar à lógica de negócio.",
        middleware:
          "Preocupações transversais como autenticação, logs e mapeamento de erros ficam em middlewares, guards e filters.",
        contracts:
          "Contratos de API documentados com OpenAPI, para que clientes e servidores compartilhem uma única fonte de verdade.",
        errors: "Respostas de erro consistentes que nunca vazam detalhes internos.",
      },
      database: {
        title: "Banco de dados",
        intro: "Modelagem relacional com PostgreSQL e Prisma.",
        note: "Apenas conceitual: este portfólio não usa um banco PostgreSQL real. O playground roda sobre dados mockados em memória.",
        modeling:
          "Entidades, constraints e relacionamentos são modelados de forma explícita.",
        prisma:
          "O schema do Prisma é a fonte de verdade tipada para modelos e migrations.",
        crud: "Operações de CRUD passam por um repository, nunca direto de controllers ou componentes.",
        relationships:
          "Relacionamentos um-para-muitos, como usuários e seus tickets, expressos com chaves estrangeiras.",
      },
      testing: {
        title: "Testes",
        intro: "Testes que dão confiança, não apenas cobertura.",
        note: "Este projeto usa Vitest e Testing Library; no trabalho profissional uso Jest.",
        unit: "Testes unitários para regras de domínio puras e utilitários.",
        component:
          "Testes de componente com Testing Library, usando roles e labels para verificar comportamento e não implementação.",
        integration:
          "Testes de integração onde as camadas se encontram, como um service trabalhando com seu repository.",
        e2e: "Testes end-to-end para fluxos críticos de usuário. Aqui é apenas um conceito: este projeto não tem suíte E2E.",
      },
      performance: {
        title: "Performance",
        intro: "Decisões com justificativa, não suposição.",
        server: "Server Components e renderização estática para enviar menos JavaScript.",
        splitting:
          "Code splitting e lazy loading para código cliente pesado que não é necessário na primeira pintura.",
        assets: "Imagens e fontes otimizadas com next/image e next/font.",
        rerenders:
          "Evitar re-renderizações desnecessárias: medir primeiro, memoizar só com evidência.",
        caching: "Uma estratégia explícita de cache e revalidação para busca de dados.",
      },
      accessibility: {
        title: "Acessibilidade",
        intro: "Um requisito, não um acabamento final.",
        semantic: "HTML semântico primeiro; ARIA só quando a semântica nativa não basta.",
        keyboard: "Tudo é alcançável e operável pelo teclado, com foco visível.",
        focus:
          "Modais e drawers usam o elemento dialog nativo, que oferece focus trap, Escape e retorno do foco.",
        contrast:
          "Contraste de cor suficiente nos dois temas e nenhuma informação transmitida apenas pela cor.",
        screenReaders:
          "Nomes acessíveis em botões de ícone, hierarquia de headings coerente e respeito a movimento reduzido.",
      },
      security: {
        title: "Segurança",
        intro: "Tratada como requisito de engenharia, mesmo em um portfólio.",
        note: "Este portfólio não tem autenticação e não armazena dados de usuários; estes são os princípios que sigo.",
        validation:
          "Validar e sanitizar toda entrada externa nas fronteiras de confiança.",
        xss: "Nunca renderizar HTML não confiável: o React escapa por padrão e dangerouslySetInnerHTML é evitado.",
        links: 'Links externos usam rel="noopener noreferrer".',
        env: "Segredos ficam apenas em variáveis de ambiente no servidor, nunca em bundles do cliente.",
        authn:
          "Autenticação prova quem você é; autorização define o que você pode fazer e é aplicada no servidor.",
        api: "Design seguro de API: menor privilégio, limites de entrada e tratamento consistente de erros.",
      },
    },
  },
  aiPage: {
    title: "Engenharia Assistida por IA",
    description:
      "A IA acelera a implementação. Requisitos, arquitetura, regras de negócio, modelagem, revisão, testes, segurança e acessibilidade ficam comigo.",
    accountability:
      "Eu preciso entender, explicar, depurar, alterar e validar o código que entrego.",
    workflowTitle: "Fluxo",
    workflowBody: "A IA participa de uma etapa. Todo o resto continua sendo engenharia.",
    humanTitle: "O que fica comigo",
    human: {
      requirements: "Definir requisitos e regras de negócio.",
      logic: "Definir a lógica e os modelos de dados.",
      architecture: "Entender e decidir a arquitetura.",
      review: "Revisar cada trecho de código gerado.",
      validation: "Validar o comportamento com testes, tipos e lint.",
      quality: "Considerar segurança e acessibilidade.",
      docs: "Garantir que a documentação reflita o comportamento real.",
    },
    helpsTitle: "Onde a IA ajuda",
    helps: {
      implementation: "Implementar tarefas cujos requisitos e lógica eu já defini.",
      practices: "Apoiar a aplicação consistente de boas práticas.",
    },
    checklistTitle: "Checklist de revisão",
    checklistBody: "O que verifico antes de aceitar código gerado:",
    checklist: {
      requirements: "Faz o que foi especificado, nada além.",
      rules: "Segue a arquitetura e as regras do projeto.",
      types: "Os tipos estão corretos: strict mode, sem any desnecessário.",
      checks: "Lint e typecheck passam sem desabilitar regras.",
      tests: "Os testes verificam comportamento, não detalhes de implementação.",
      security: "Entradas são validadas e nenhum segredo é exposto.",
      accessibility: "É semântico e operável pelo teclado.",
      docs: "A documentação corresponde ao comportamento real.",
    },
    exampleTitle: "Exemplo",
    exampleBody:
      "Uma especificação de tarefa ilustrativa e o tipo de notas de revisão que ela gera.",
    toolsTitle: "Fluxo de desenvolvimento",
    toolsBody:
      "Cursor e Claude Code fazem parte do fluxo, não substituem a stack. Este repositório inclui regras do Cursor (em .cursor/rules) que as ferramentas precisam seguir.",
  },
};
