import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span className="mr-1">🚀</span>
        New Feature
      </>
    ),
  },
};

export const TechnologyStack: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="secondary">React</Badge>
      <Badge variant="secondary">TypeScript</Badge>
      <Badge variant="secondary">Next.js</Badge>
      <Badge variant="secondary">TailwindCSS</Badge>
    </div>
  ),
};




