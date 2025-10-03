import { Code, Database, Server, Globe, Cpu, Brain, Building2, Briefcase, Laptop, User, GitBranch, Code2 } from 'lucide-react';

export const TECH_CATEGORIES = [
  {
    title: 'Frontend',
    icon: Globe,
    skills: [
      { name: 'React', level: 80 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 80 },
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
      { name: 'Delphi', level: 15 },
      { name: 'APIs', level: 90 },
      { name: 'JWT', level: 80 },
    ],
    color: 'neon-purple'
  },
  {
    title: 'Database',
    icon: Database,
    skills: [
      { name: 'Supabase', level: 85 },
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
      { name: 'VPS', level: 70 },
      { name: 'WSL', level: 70 },
      { name: 'Git', level: 90 },
      { name: 'Figma', level: 70 }
    ],
    color: 'accent'
  },
  {
    title: 'Engenharia de Software',
    icon: Brain,
    skills: [
      { name: 'Miro', level: 80 },
      { name: 'Documentação', level: 100 },
      { name: 'Testes', level: 100 },
      { name: 'Arquitetura', level: 80 },
      { name: 'CI/CD', level: 100 },
      { name: 'Componentização', level: 100 },
    ],
    color: 'neon-green'
  },
  {
    title: 'Outros',
    icon: Code,
    skills: [
      { name: 'Linux/Ubuntu', level: 70 },
      { name: 'Deploy', level: 70 },
      { name: 'Kotlin', level: 20 },
      { name: 'n8n', level: 10 }
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
    role: 'Desenvolvedor Full-Stack',
    period: 'Julho 2024 - Presente',
    description: 'Desenvolvimento de projetos educacionais e plataformas de desafios. Trabalho em equipe com metodologias ágeis.',
    stack: ['React', 'TypeScript', 'Node.js', 'Supabase', 'Prisma', 'Docker', 'VPS', 'WSL', 'Vercel', 'n8n', 'Linux/Ubuntu', 'Git', 'TailwindCSS', 'NestJS', 'Nextjs',],
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
  'Banco de Dados',
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
  'n8n',
  'Comprometimento'
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





