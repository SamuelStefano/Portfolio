import type { Meta, StoryObj } from '@storybook/react';
import { ProgressiveLoader } from './ProgressiveLoader';

const meta = {
  title: 'Atoms/ProgressiveLoader',
  component: ProgressiveLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressiveLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    src: '/projects/Skill Evals/Thumb.png',
    alt: 'Loading image',
    className: 'rounded-lg',
  },
};

export const WithDimensions: Story = {
  args: {
    src: '/projects/Skill Evals/Dashboard principal.png',
    alt: 'Large image',
    className: 'w-96 h-64 object-cover rounded-lg',
  },
};

export const Small: Story = {
  args: {
    src: '/projects/Skill Evals/Thumb.png',
    alt: 'Small image',
    className: 'w-32 h-32 object-cover rounded-full',
  },
};

export const ProjectThumbnail: Story = {
  args: {
    src: '/projects/greenloop/GreenLoop - Dashboard.png',
    alt: 'Project thumbnail',
    className: 'w-full h-64 object-cover rounded-xl',
  },
};




