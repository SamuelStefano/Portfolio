export interface SectionMetadata {
  displayName: string;
  description: string;
  technologies: string[];
}

const DEFAULT_TECHS = ["React", "TypeScript", "Tailwind CSS"];

export const normalizeSectionKey = (name: string): string => {
  return (name || "")
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
};

const SECTION_MAP: Record<string, SectionMetadata> = {
  admin: {
    displayName: "Painel Administrativo",
    description: "Área de administração com telas de gestão, controle e configurações.",
    technologies: [...DEFAULT_TECHS]
  },
  challenge: {
    displayName: "Desafios",
    description: "Fluxos relacionados a desafios, submissões e ranking.",
    technologies: [...DEFAULT_TECHS]
  },
  create: {
    displayName: "Criação",
    description: "Telas de criação/edição de conteúdo e formulários.",
    technologies: [...DEFAULT_TECHS]
  },
  dashboard: {
    displayName: "Dashboard",
    description: "Visão geral com gráficos, métricas e indicadores.",
    technologies: [...DEFAULT_TECHS, "Charts"]
  },
  login: {
    displayName: "Autenticação",
    description: "Fluxos de login, cadastro e recuperação de senha.",
    technologies: [...DEFAULT_TECHS]
  },
  others: {
    displayName: "Outros",
    description: "Seções auxiliares e elementos diversos do projeto.",
    technologies: [...DEFAULT_TECHS]
  },
  aboutus: {
    displayName: "Sobre Nós",
    description: "Seção institucional com informações da equipe e proposta.",
    technologies: [...DEFAULT_TECHS]
  },
  cardcourses: {
    displayName: "Cards de Cursos",
    description: "Componentes de cards e listagens de cursos.",
    technologies: [...DEFAULT_TECHS]
  },
  community: {
    displayName: "Comunidade",
    description: "Páginas e componentes voltados à comunidade.",
    technologies: [...DEFAULT_TECHS]
  },
  footer: {
    displayName: "Rodapé",
    description: "Estrutura e links do rodapé do site.",
    technologies: [...DEFAULT_TECHS]
  },
  hero: {
    displayName: "Seção Principal",
    description: "Área hero com título, subtítulo e chamada principal.",
    technologies: [...DEFAULT_TECHS]
  },
  methodologies: {
    displayName: "Metodologias",
    description: "Apresentação de metodologias, processos e boas práticas.",
    technologies: [...DEFAULT_TECHS]
  },
  plansandprices: {
    displayName: "Planos e Preços",
    description: "Tabela de planos, preços e benefícios.",
    technologies: [...DEFAULT_TECHS]
  },
  tablecodelibrary: {
    displayName: "Tabela Codelibrary",
    description: "Listagens, tabelas e elementos de dados do Codelibrary.",
    technologies: [...DEFAULT_TECHS]
  },
  devfellowship: {
    displayName: "DevFellowship",
    description: "Seções e componentes do projeto DevFellowship.",
    technologies: [...DEFAULT_TECHS]
  }
};

export const getSectionMetadata = (folderName: string): SectionMetadata => {
  let key = normalizeSectionKey(folderName);
  if (key === 'comunity') key = 'community';
  if (SECTION_MAP[key]) return SECTION_MAP[key];
  return {
    displayName: folderName && folderName.trim().length
      ? folderName
      : "Seção",
    description: `Imagens e componentes da seção ${folderName}`,
    technologies: [...DEFAULT_TECHS]
  };
};

