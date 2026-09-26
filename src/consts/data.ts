import { Code, Server, Globe, Cpu, Brain, Building2, Briefcase, Laptop, Sparkles, GraduationCap } from 'lucide-react';

export type SkillTier = 'daily' | 'shipped' | 'learning';

export const SKILL_TIERS: SkillTier[] = ['daily', 'shipped', 'learning'];

export const TECH_CATEGORIES: { key: string; icon: typeof Globe; skills: { name: string; tier: SkillTier }[] }[] = [
  {
    key: 'frontend',
    icon: Globe,
    skills: [
      { name: 'React', tier: 'daily' },
      { name: 'TypeScript', tier: 'daily' },
      { name: 'Vite', tier: 'daily' },
      { name: 'TailwindCSS', tier: 'daily' },
      { name: 'TanStack Query', tier: 'shipped' },
      { name: 'Next.js', tier: 'shipped' },
      { name: 'Module Federation', tier: 'shipped' },
      { name: 'Storybook', tier: 'shipped' },
    ],
  },
  {
    key: 'backend',
    icon: Server,
    skills: [
      { name: 'Node.js', tier: 'daily' },
      { name: 'Supabase', tier: 'daily' },
      { name: 'PostgreSQL', tier: 'daily' },
      { name: 'Edge Functions', tier: 'daily' },
      { name: 'Hono + Bun', tier: 'shipped' },
      { name: 'Zod', tier: 'shipped' },
      { name: 'NestJS', tier: 'shipped' },
      { name: 'ClickHouse', tier: 'shipped' },
      { name: 'MySQL', tier: 'learning' },
      { name: 'RabbitMQ', tier: 'learning' },
    ],
  },
  {
    key: 'ai',
    icon: Sparkles,
    skills: [
      { name: 'Claude API', tier: 'daily' },
      { name: 'MCP servers', tier: 'daily' },
      { name: 'AI agents', tier: 'daily' },
      { name: 'LLM integration', tier: 'shipped' },
      { name: 'OpenAI API', tier: 'shipped' },
      { name: 'n8n', tier: 'shipped' },
    ],
  },
  {
    key: 'devops',
    icon: Cpu,
    skills: [
      { name: 'Git & GitHub', tier: 'daily' },
      { name: 'GitHub Actions', tier: 'daily' },
      { name: 'Vercel', tier: 'daily' },
      { name: 'Docker', tier: 'shipped' },
      { name: 'Linux / VPS', tier: 'shipped' },
      { name: 'Dokploy', tier: 'shipped' },
      { name: 'AWS', tier: 'learning' },
    ],
  },
  {
    key: 'quality',
    icon: Brain,
    skills: [
      { name: 'Code review', tier: 'daily' },
      { name: 'Vitest', tier: 'shipped' },
      { name: 'Playwright', tier: 'shipped' },
      { name: 'Technical docs', tier: 'shipped' },
      { name: 'Figma', tier: 'learning' },
    ],
  },
  {
    key: 'web3',
    icon: Code,
    skills: [
      { name: 'Solidity', tier: 'learning' },
      { name: 'Foundry', tier: 'learning' },
      { name: 'ERC-20 / ERC-721', tier: 'learning' },
      { name: 'Solana / Anchor', tier: 'learning' },
      { name: 'Rust', tier: 'learning' },
      { name: 'Chainlink CRE / CCIP', tier: 'learning' },
      { name: 'Base / Scroll', tier: 'learning' },
    ],
  },
];

export const EXPERIENCE_DATA = [
  {
    key: 'dfl',
    company: 'DevFellowship',
    current: true,
    stack: ['React', 'TypeScript', 'Module Federation', 'Hono', 'Bun', 'Supabase', 'PostgreSQL', 'Edge Functions', 'MCP', 'Claude API', 'GitHub Actions', 'Docker', 'Playwright'],
    logo: '/DevFelloShip.png',
    icon: Briefcase,
    website: 'https://devfellowship.com',
  },
  {
    key: 'revera',
    company: 'Revera',
    current: true,
    stack: ['React', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL', 'TailwindCSS', 'Claude API', 'AI agents', 'MCP'],
    logo: '/Revera.png',
    icon: Sparkles,
    website: 'https://revera.dev/',
  },
  {
    key: 'itera',
    company: 'Itera',
    current: true,
    stack: ['Live classes', 'JavaScript', 'Programming logic', 'Mentoring'],
    logo: '/Itera.svg',
    icon: GraduationCap,
    website: 'https://iterahq.dev/',
  },
  {
    key: 'educar',
    company: 'Instituto Educar+',
    current: true,
    stack: ['Teaching', 'JavaScript', 'HTML', 'CSS', 'Git & GitHub', 'Vercel', 'Mentoring'],
    logo: '/EducarMais.webp',
    icon: GraduationCap,
    website: 'https://institutoeducarmais.org/',
  },
  {
    key: 'mm',
    company: 'M&M Informática',
    current: false,
    stack: ['ERP support', 'Incident triage', 'Customer support'],
    logo: '/MMIcon.png',
    icon: Laptop,
    website: 'https://mminfo.me',
  },
  {
    key: 'prefeitura',
    company: 'Prefeitura de Marialva',
    current: false,
    stack: ['IT support', 'Hardware maintenance', 'Operating systems'],
    logo: '/prefeitura.png',
    icon: Building2,
    website: 'https://www.marialva.pr.gov.br',
  },
];

export const EVENTS_DATA = [
  { name: 'Web3 Expertz Brazil', type: 'conference', date: 'Jun 2026', location: 'São Paulo, BR', ecosystems: ['Avalanche', 'Klever'], url: '' },
  { name: 'Hackanation', type: 'hackathon', date: 'May 2026', location: 'São Paulo, BR', ecosystems: ['Binance', 'Chainlink', 'Solana'], url: '' },
  { name: 'DevConnect ETH 2025', type: 'hackathon', date: 'Nov 2025', location: 'Buenos Aires, AR', ecosystems: ['Scroll', 'Ethereum'], url: '' },
  { name: 'ETH Latam 2025', type: 'hackathon', date: 'Aug 2025', location: 'São Paulo, BR', ecosystems: ['Base', 'Ethereum'], url: '' },
];
