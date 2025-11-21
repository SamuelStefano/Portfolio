import type { Meta, StoryObj } from '@storybook/react';
import { StatsCounter } from './StatsCounter';
import { Code2, Users, Star, GitBranch } from 'lucide-react';

const meta = {
  title: 'Molecules/StatsCounter',
  component: StatsCounter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatsCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LinesOfCode: Story = {
  args: {
    label: 'Linhas de Código',
    value: '50K+',
    icon: Code2,
  },
};

export const Projects: Story = {
  args: {
    label: 'Projetos',
    value: '15+',
    icon: GitBranch,
  },
};

export const Experience: Story = {
  args: {
    label: 'Anos de Experiência',
    value: '2+',
    icon: Users,
  },
};

export const Technologies: Story = {
  args: {
    label: 'Tecnologias',
    value: '20+',
    icon: Star,
  },
};

export const StatsGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-card rounded-xl border border-border">
      <StatsCounter label="Experiência" value="2+ anos" icon={Users} />
      <StatsCounter label="Repositórios" value="15+" icon={GitBranch} />
      <StatsCounter label="Tecnologias" value="20+" icon={Star} />
      <StatsCounter label="Linhas de Código" value="50K+" icon={Code2} />
    </div>
  ),
};

