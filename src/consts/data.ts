import { Code, Database, Server, Globe, Cpu, Brain, Building2, Briefcase, Laptop, User, GitBranch, Code2, Sparkles } from 'lucide-react';

export const TECH_CATEGORIES = [
  {
    title: 'Frontend',
    icon: Globe,
    skills: [
      { name: 'React', level: 100 },
      { name: 'TypeScript', level: 100 },
      { name: 'Next.js', level: 100 },
      { name: 'TailwindCSS', level: 100 },
      { name: 'Module Federation', level: 90 },
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
      { name: 'RabbitMQ', level: 75 },
      { name: 'Web3 Integration', level: 70 },
    ],
    color: 'neon-purple'
  },
  {
    title: 'Database',
    icon: Database,
    skills: [
      { name: 'Supabase', level: 100 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'Supabase Edge Functions', level: 90 },
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
      { name: 'VPS', level: 65 },
      { name: 'WSL', level: 80 },
      { name: 'Git', level: 100 },
      { name: 'Figma', level: 50 },
      { name: 'Vercel', level: 100 },
      { name: 'n8n', level: 75 },
      { name: 'GitHub Actions', level: 85 },
      { name: 'AWS', level: 50 }
    ],
    color: 'accent'
  },
  {
    title: 'Inteligência Artificial',
    icon: Sparkles,
    skills: [
      { name: 'Claude API (Anthropic)', level: 85 },
      { name: 'OpenAI API', level: 70 },
      { name: 'AI Agents', level: 80 },
      { name: 'Prompt Engineering', level: 85 },
      { name: 'n8n AI Workflows', level: 75 },
      { name: 'LLM Integration', level: 80 },
    ],
    color: 'neon-purple'
  },
  {
    title: 'Engenharia de Software',
    icon: Brain,
    skills: [
      { name: 'Miro', level: 90 },
      { name: 'Documentação', level: 100 },
      { name: 'Testes', level: 100 },
      { name: 'Arquitetura', level: 95 },
      { name: 'CI/CD', level: 100 },
      { name: 'Componentização', level: 100 },
      { name: 'Micro-frontends', level: 90 },
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
    website: 'https://www.marialva.pr.gov.br'
  },
  {
    company: 'DevFellowship',
    role: 'Líder Técnico & Desenvolvedor Full-Stack',
    period: 'Julho 2024 - Presente',
    description: 'Liderança técnica do ecossistema de micro-frontends com Module Federation. Arquitetura e desenvolvimento do super-app DFL Learn, Reviews App, Payments App e CI Revisor Bot com IA. Mentoria de fellows, definição de padrões técnicos, revisões de código e participação em hackathons premiados (ETH Latam 2025 e DevConnect ETH 2025).',
    stack: ['React', 'TypeScript', 'Vite', 'Module Federation', 'Supabase', 'PostgreSQL', 'NestJS', 'Node.js', 'Stripe', 'Claude API', 'n8n', 'GitHub Actions', 'Docker', 'TailwindCSS', 'Playwright'],
    logo: '/DevFelloShip.png',
    icon: Briefcase,
    website: 'https://devfellowship.com'
  },
  {
    company: 'M&M Informática',
    role: 'Líder de Arquitetura & Desenvolvimento de Projetos Internos',
    period: 'Dezembro 2024 - Fevereiro 2026',
    description: 'Liderança da arquitetura e desenvolvimento de projetos internos da empresa. Definição de padrões técnicos, stack tecnológica e boas práticas para a equipe de desenvolvimento. Desenvolvimento fullstack de novos sistemas com TypeScript, Next.js e NestJS. Integração com sistemas fiscais, bancos de dados Firebird e automação de processos internos.',
    stack: ['TypeScript', 'Next.js', 'NestJS', 'TailwindCSS', 'Firebird', 'Delphi', 'APIs', 'Sistemas Fiscais', 'Arquitetura de Software', 'Liderança Técnica', 'Suporte Técnico'],
    logo: '/MMIcon.png',
    icon: Laptop,
    website: 'https://mminfo.me'
  }
];

export const ADDITIONAL_SKILLS = [
  'Supabase',
  'Supabase Edge Functions',
  'PostgreSQL',
  'RabbitMQ',
  'Module Federation',
  'Micro-frontends',
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
  'GitHub Actions',
  'Linux',
  'Storybook',
  'Figma',
  'Miro',
  'Componentização',
  'DevOps',
  'API Development',
  'Inteligência Artificial',
  'Claude API',
  'OpenAI API',
  'AI Agents',
  'Prompt Engineering',
  'n8n',
  'LLM Integration',
  'Arquitetura de Software',
  'Liderança Técnica',
  'Docker',
  'VPS',
  'WSL',
  'Vercel',
  'AWS',
  'Mentoria',
  'Code Review'
];


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








