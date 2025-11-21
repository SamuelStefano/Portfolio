import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { Heart, Star, Code, Github, Linkedin, Mail, ChevronRight } from 'lucide-react';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    icon: Heart,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    icon: Star,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    icon: Code,
    size: 'lg',
  },
};

export const CustomColor: Story = {
  args: {
    icon: Heart,
    className: 'text-red-500',
  },
};

export const SocialIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Icon icon={Github} className="text-gray-700 dark:text-gray-300" />
      <Icon icon={Linkedin} className="text-blue-600" />
      <Icon icon={Mail} className="text-green-600" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Star} size="sm" />
        <span className="text-xs">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Star} size="md" />
        <span className="text-xs">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Star} size="lg" />
        <span className="text-xs">Large</span>
      </div>
    </div>
  ),
};




