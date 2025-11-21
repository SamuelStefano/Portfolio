import type { Meta, StoryObj } from '@storybook/react';
import { SkillBar } from './SkillBar';

const meta = {
  title: 'Molecules/SkillBar',
  component: SkillBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
    },
  },
} satisfies Meta<typeof SkillBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'React',
    level: 80,
  },
};

export const Beginner: Story = {
  args: {
    name: 'Solidity',
    level: 20,
  },
};

export const Intermediate: Story = {
  args: {
    name: 'TypeScript',
    level: 60,
  },
};

export const Advanced: Story = {
  args: {
    name: 'Next.js',
    level: 90,
  },
};

export const Expert: Story = {
  args: {
    name: 'TailwindCSS',
    level: 100,
  },
};

export const TechStack: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <SkillBar name="React" level={100} />
      <SkillBar name="TypeScript" level={100} />
      <SkillBar name="Next.js" level={100} />
      <SkillBar name="Node.js" level={80} />
      <SkillBar name="Solidity" level={20} />
      <SkillBar name="MongoDB" level={70} />
    </div>
  ),
};

