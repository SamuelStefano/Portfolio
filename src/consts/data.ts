import { Code, Database, Server, Globe, Cpu, Brain, Building2, Briefcase, Laptop, User, GitBranch, Code2 } from 'lucide-react';

export const TECH_CATEGORIES = [
  {
    title: 'Frontend',
    icon: Globe,
    skills: [
      { name: 'React', level: 100 },
      { name: 'TypeScript', level: 100 },
      { name: 'Next.js', level: 100 },
      { name: 'TailwindCSS', level: 100 },
      { name: 'Storybook', level: 90 },
    ],
    color: 'neon-blue'
  },
  {
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'NestJS', level: 75 },
      { name: 'APIs', level: 90 },
      { name: 'JWT', level: 80 },
      { name: 'Web3 Integration', level: 70 },
    ],
    color: 'neon-purple'
  },
  {
    title: 'Database',
    icon: Database,
    skills: [
      { name: 'Supabase', level: 90 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'MySQL', level: 70 },
      { name: 'Prisma', level: 40 },
      { name: 'Firebird', level: 20 }
    ],
    color: 'neon-cyan'
  },
  {
    title: 'DevOps & Tools',
    icon: Cpu,
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'VPS', level: 60 },
      { name: 'WSL', level: 80 },
      { name: 'Git', level: 100 },
      { name: 'Figma', level: 50 },
      { name: 'Vercel', level: 100 },
      { name: 'n8n', level: 5 },
      { name: 'AWS', level: 50 }
    ],
    color: 'accent'
  },
  {
    title: 'Engenharia de Software',
    icon: Brain,
    skills: [
      { name: 'Miro', level: 90 },
      { name: 'Documentação', level: 100 },
      { name: 'Testes', level: 100 },
      { name: 'Arquitetura', level: 90 },
      { name: 'CI/CD', level: 100 },
      { name: 'Componentização', level: 100 },
    ],
    color: 'neon-green'
  },
  {
    title: 'Web3 & Blockchain',
    icon: Code,
    skills: [
      { name: 'Solidity', level: 20 },
      { name: 'Smart Contracts', level: 65 },
      { name: 'ERC-20 / ERC-721', level: 70 },
      { name: 'Base / Scroll', level: 60 },
      { name: 'Viem', level: 20 }
    ],
    color: 'neon-green'
  },
];

export const EXPERIENCE_DATA = [
  {
    company: 'Prefeitura de Marialva',
    role: 'Suporte Técnico',
    period: 'Fevereiro 2023 - Dezembro 2024',
    description: 'Suporte Técinico, atendendo órgãos públicos do municipio em relação a informática.',
    stack: ['Suporte Técnico', 'Informação', 'Configurações de Rede', 'Configurações de Impressoras', 'Configurações de Servidores', 'Configurações de Computadores', 'Configurações de Sistemas Operacionais'],
    logo: '/prefeitura.png',
    icon: Building2,
    website: null
  },
  {
    company: 'DevFellowship',
    role: 'Desenvolvedor Full-Stack & Mentor',
    period: 'Julho 2024 - Presente',
    description: 'Desenvolvimento de projetos educacionais, plataformas de desafios e sistemas Web3. Atuação como mentor, realizando revisões de código, auxiliando em arquitetura de software e orientando novos fellows. Participação em hackathons premiados.',
    stack: ['React', 'TypeScript', 'Node.js', 'NestJS', 'Next.js', 'Supabase', 'Prisma', 'Docker', 'VPS', 'Solidity', 'Web3', 'Judge0', 'TailwindCSS', 'Git'],
    logo: '/DevFelloShip.png',
    icon: Briefcase,
    website: 'https://devfellowship.com'
  },
  {
    company: 'M&M Informática',
    role: 'Suporte Técnico & Desenvolvedor a',
    period: 'Dezembro 2024 - atualmente',
    description: 'Suporte técnico especializado em diversos softwares que a empresa desenvolve.',
    stack: ['Firebird', 'Delphi', 'APIs', 'Sistemas Fiscais', 'Javascript', 'Typescript', 'Nest', 'TailwindCSS', 'Next', 'Suporte Técnico'],
    logo: '/MMIcon.png',
    icon: Laptop,
    website: null
  }
];

export const ADDITIONAL_SKILLS = [
  'Judge0 API',
  'REST APIs',
  'Responsive Design',
  'UI/UX Design',
  'Automação',
  'Banco de Dados',
  'Suporte Técnico',
  'Frontend',
  'Backend',
  'Web3 & Blockchain',
  'Smart Contracts',
  'Solidity',
  'ERC-20 / ERC-721',
  'Base',
  'WEB3',
  'Trabalho em Equipe',
  'Metodologias Ágeis',
  'Resolução de Problemas',
  'Comprometimento',
  'Criatividade',
  'Git & GitHub',
  'Linux',
  'Storybook',
  'Figma',
  'Miro',
  'Componentização',
  'DevOps',
  'API Development',
  'Inteligência Artificial',
  'Arquitetura de Software',
  'Docker',
  'VPS',
  'WSL',
  'Vercel',
  'AWS',
  'Supabase',
  'Mentoria',
  'Code Review'
];

// Stats Template
export const STATS_TEMPLATE = [
  {
    label: 'Tempo de atuação profissional',
    value: '2+ anos',
    icon: User
  },
  {
    label: 'Repositórios GitHub',
    value: '15+',
    icon: GitBranch
  },
  {
    label: 'Tecnologias',
    value: '15+',
    icon: Globe
  },
  {
    label: 'Linhas de Código',
    value: '50K+',
    icon: Code2
  }
];








