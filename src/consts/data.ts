import { Code, Database, Server, Globe, Cpu, Brain, Building2, Briefcase, Laptop, User, GitBranch, Code2, Sparkles, GraduationCap, Users } from 'lucide-react';

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
      { name: 'Solidity', level: 35 },
      { name: 'Smart Contracts', level: 65 },
      { name: 'ERC-20 / ERC-721', level: 70 },
      { name: 'Solana / Anchor', level: 45 },
      { name: 'Rust', level: 30 },
      { name: 'Chainlink (CRE / CCIP)', level: 50 },
      { name: 'Foundry', level: 35 },
      { name: 'Base / Scroll', level: 60 },
      { name: 'Viem', level: 20 }
    ],
    color: 'neon-green'
  },
  {
    title: 'Colaboração & Processos',
    icon: Users,
    skills: [
      { name: 'Daily / Scrum', level: 100 },
      { name: 'Code & PR Reviews', level: 95 },
      { name: 'Pair Programming', level: 90 },
      { name: 'UI/UX Design', level: 80 },
      { name: 'Mentoring', level: 90 },
      { name: 'Documentation', level: 95 },
    ],
    color: 'neon-blue'
  },
];

export const EXPERIENCE_DATA = [
  {
    company: 'DevFellowship',
    role: 'Líder Técnico & Desenvolvedor Full-Stack',
    period: 'Julho 2024 - Presente',
    current: true,
    description: 'Liderança técnica do ecossistema de micro-frontends da DevFellowship com Module Federation. Arquitetei e desenvolvi o super-app DFL Learn (host), Reviews, Payments (revenue/cobrança recorrente + NF-e Spedy), Flows (kanban com regras de unlock) e o CI Revisor Bot com IA. Construí 4 MCP servers (work/learn/payments/plans) e a stack de back-end TS (Hono+Bun). Mentoria de fellows, definição de padrões e participação em hackathons premiados.',
    highlights: [
      '4º lugar ETH Latam 2025 — GreenLoop (recicláveis → tokens on-chain na Base)',
      '2º lugar DevConnect ETH 2025 trilha Scroll — TalentDAO',
      'Squad multi-agente para review/SDD adotada como padrão do time',
      'Arquitetura do Revenue (contratos→cobranças→NF-e) end-to-end em produção',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Module Federation', 'Hono', 'Bun', 'Supabase', 'PostgreSQL', 'Edge Functions', 'NestJS', 'Claude API', 'OpenRouter', 'MCP', 'n8n', 'GitHub Actions', 'Docker', 'TailwindCSS', 'Playwright'],
    logo: '/DevFelloShip.png',
    icon: Briefcase,
    website: 'https://devfellowship.com'
  },
  {
    company: 'Instituto Educar+',
    role: 'Professor de Programação',
    period: 'Janeiro 2025 - Presente',
    current: true,
    description: 'Professor de programação no Instituto Educar+, instituto profissionalizante em tecnologia. Ensino lógica de programação, desenvolvimento web e boas práticas para alunos iniciantes, com mentoria em projetos práticos — alunos chegaram a apresentar trabalhos em hackathons.',
    highlights: [
      'Turmas iniciantes em lógica, HTML/CSS, JS e Git',
      'Mentoria de projetos finais, com alunos indo a hackathons',
      'Trilha didática "do zero ao deploy" em Vercel/Supabase',
    ],
    stack: ['Ensino', 'Lógica de Programação', 'JavaScript', 'HTML', 'CSS', 'Git & GitHub', 'Vercel', 'Mentoria'],
    logo: '/EducarMais.webp',
    icon: GraduationCap,
    website: 'https://institutoeducarmais.org/'
  },
  {
    company: 'M&M Informática',
    role: 'Líder de Arquitetura & Desenvolvimento de Projetos Internos',
    period: 'Dezembro 2024 - Fevereiro 2026',
    current: false,
    description: 'Liderei a arquitetura e desenvolvimento dos projetos internos. Definição de padrões técnicos, stack e boas práticas para o time. Entreguei sistemas fullstack em TypeScript, Next.js e NestJS, integração com sistemas fiscais, banco de dados Firebird e automação de processos internos.',
    highlights: [
      'Padronização da stack TS/Next/NestJS para projetos novos',
      'Integrações fiscais (NF-e) e automação de processos legacy',
      'Bridge entre sistemas Delphi/Firebird e novas APIs REST',
    ],
    stack: ['TypeScript', 'Next.js', 'NestJS', 'TailwindCSS', 'Firebird', 'Delphi', 'APIs', 'Sistemas Fiscais', 'Arquitetura de Software', 'Liderança Técnica'],
    logo: '/MMIcon.png',
    icon: Laptop,
    website: 'https://mminfo.me'
  },
  {
    company: 'Prefeitura de Marialva',
    role: 'Suporte Técnico',
    period: 'Fevereiro 2023 - Dezembro 2024',
    current: false,
    description: 'Suporte técnico atendendo órgãos públicos do município. Cuidei de redes, servidores, impressoras, computadores e sistemas operacionais, garantindo continuidade da operação do setor público.',
    highlights: [
      'Atendimento ponta-a-ponta a múltiplos órgãos municipais',
      'Configuração e manutenção de redes e servidores',
      'Primeiro contato profissional com TI em larga escala',
    ],
    stack: ['Suporte Técnico', 'Redes', 'Servidores', 'Impressoras', 'Sistemas Operacionais', 'Infraestrutura'],
    logo: '/prefeitura.png',
    icon: Building2,
    website: 'https://www.marialva.pr.gov.br'
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
    value: '3+ anos',
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

export const EVENTS_DATA = [
  { name: 'Web3 Expertz Brazil', type: 'conference', date: 'Jun 2026', location: 'Brasil', url: '' },
  { name: 'Hackanation', type: 'hackathon', date: 'Jun 2026', location: 'São Paulo, BR', url: '' },
  { name: 'Solana / Chainlink Workshop', type: 'workshop', date: '2026', location: 'Brasil', url: '' },
  { name: 'Avalanche', type: 'meetup', date: '2026', location: 'Brasil', url: '' },
  { name: 'Klever', type: 'meetup', date: '2026', location: 'Brasil', url: '' },
  { name: 'Binance', type: 'meetup', date: '2026', location: 'Brasil', url: '' },
];








