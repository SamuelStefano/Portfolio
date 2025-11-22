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
    description: "�rea de administra��o com telas de gest�o, controle e configura��es.",
    technologies: [...DEFAULT_TECHS]
  },
  challenge: {
    displayName: "Desafios",
    description: "Fluxos relacionados a desafios, submiss�es e ranking.",
    technologies: [...DEFAULT_TECHS]
  },
  create: {
    displayName: "Cria��o",
    description: "Telas de cria��o/edi��o de conte�do e formul�rios.",
    technologies: [...DEFAULT_TECHS]
  },
  dashboard: {
    displayName: "Dashboard",
    description: "Vis�o geral com gr�ficos, m�tricas e indicadores.",
    technologies: [...DEFAULT_TECHS, "Charts"]
  },
  login: {
    displayName: "Autentica��o",
    description: "Fluxos de login, cadastro e recupera��o de senha.",
    technologies: [...DEFAULT_TECHS]
  },
  others: {
    displayName: "Outros",
    description: "Se��es auxiliares e elementos diversos do projeto.",
    technologies: [...DEFAULT_TECHS]
  },
  aboutus: {
    displayName: "Sobre N�s",
    description: "Se��o institucional com informa��es da equipe e proposta.",
    technologies: [...DEFAULT_TECHS]
  },
  cardcourses: {
    displayName: "Cards de Cursos",
    description: "Componentes de cards e listagens de cursos.",
    technologies: [...DEFAULT_TECHS]
  },
  community: {
    displayName: "Comunidade",
    description: "P�ginas e componentes voltados � comunidade.",
    technologies: [...DEFAULT_TECHS]
  },
  footer: {
    displayName: "Rodap�",
    description: "Estrutura e links do rodap� do site.",
    technologies: [...DEFAULT_TECHS]
  },
  hero: {
    displayName: "Se��o Principal",
    description: "�rea hero com t�tulo, subt�tulo e chamada principal.",
    technologies: [...DEFAULT_TECHS]
  },
  methodologies: {
    displayName: "Metodologias",
    description: "Apresenta��o de metodologias, processos e boas pr�ticas.",
    technologies: [...DEFAULT_TECHS]
  },
  plansandprices: {
    displayName: "Planos e Pre�os",
    description: "Tabela de planos, pre�os e benef�cios.",
    technologies: [...DEFAULT_TECHS]
  },
  tablecodelibrary: {
    displayName: "Tabela Codelibrary",
    description: "Listagens, tabelas e elementos de dados do Codelibrary.",
    technologies: [...DEFAULT_TECHS]
  },
  devfellowship: {
    displayName: "DevFellowship",
    description: "Se��es e componentes do projeto DevFellowship.",
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
      : "Se��o",
    description: `Imagens e componentes da se��o ${folderName}`,
    technologies: [...DEFAULT_TECHS]
  };
};




