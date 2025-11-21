import type { Meta, StoryObj } from '@storybook/react';
import { ExperienceItem } from './ExperienceItem';
import { Briefcase } from 'lucide-react';

const meta = {
  title: 'Molecules/ExperienceItem',
  component: ExperienceItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExperienceItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    company: 'DevFellowship',
    role: 'Desenvolvedor Full-Stack & Mentor',
    period: 'Julho 2024 - Presente',
    description:
      'Desenvolvimento de projetos educacionais, plataformas de desafios e sistemas Web3. Atuação como mentor, realizando revisões de código e orientando novos fellows.',
    stack: ['React', 'TypeScript', 'Node.js', 'NestJS', 'Supabase', 'Web3'],
    icon: Briefcase,
  },
};

export const CurrentJob: Story = {
  args: {
    company: 'M&M Informática',
    role: 'Suporte Técnico & Desenvolvedor',
    period: 'Dezembro 2024 - atualmente',
    description: 'Suporte técnico especializado em diversos softwares que a empresa desenvolve.',
    stack: ['Firebird', 'Delphi', 'APIs', 'JavaScript', 'TypeScript', 'NestJS'],
    icon: Briefcase,
  },
};

export const FirstJob: Story = {
  args: {
    company: 'Prefeitura de Marialva',
    role: 'Suporte Técnico',
    period: 'Fevereiro 2023 - Dezembro 2024',
    description: 'Suporte Técnico, atendendo órgãos públicos do município em relação a informática.',
    stack: ['Suporte Técnico', 'Redes', 'Hardware'],
    icon: Briefcase,
  },
};

export const Timeline: Story = {
  render: () => (
    <div className="max-w-3xl space-y-8">
      <div className="relative flex items-start gap-6">
        <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0 mt-6 relative z-10" />
        <div className="flex-1 bg-card border border-border rounded-lg p-6">
          <ExperienceItem
            company="DevFellowship"
            role="Desenvolvedor Full-Stack & Mentor"
            period="Julho 2024 - Presente"
            description="Desenvolvimento de projetos educacionais e Web3. Mentoria e revisões de código."
            stack={['React', 'TypeScript', 'Node.js', 'NestJS', 'Web3']}
            icon={Briefcase}
          />
        </div>
      </div>

      <div className="relative flex items-start gap-6">
        <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0 mt-6 relative z-10" />
        <div className="flex-1 bg-card border border-border rounded-lg p-6">
          <ExperienceItem
            company="M&M Informática"
            role="Desenvolvedor"
            period="Dezembro 2024 - atualmente"
            description="Desenvolvimento e suporte de sistemas fiscais."
            stack={['Delphi', 'APIs', 'JavaScript', 'TypeScript']}
            icon={Briefcase}
          />
        </div>
      </div>

      <div className="relative flex items-start gap-6">
        <div className="w-4 h-4 bg-muted-foreground rounded-full flex-shrink-0 mt-6 relative z-10" />
        <div className="flex-1 bg-card border border-border rounded-lg p-6 opacity-70">
          <ExperienceItem
            company="Prefeitura de Marialva"
            role="Suporte Técnico"
            period="Fevereiro 2023 - Dezembro 2024"
            description="Suporte técnico para órgãos públicos."
            stack={['Suporte Técnico', 'Redes']}
            icon={Briefcase}
          />
        </div>
      </div>
    </div>
  ),
};

