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
    src: 'https://via.placeholder.com/400x300',
    alt: 'Loading image',
    className: 'rounded-lg',
  },
};

export const WithDimensions: Story = {
  args: {
    src: 'https://via.placeholder.com/800x600',
    alt: 'Large image',
    className: 'w-96 h-64 object-cover rounded-lg',
  },
};

export const Small: Story = {
  args: {
    src: 'https://via.placeholder.com/200x200',
    alt: 'Small image',
    className: 'w-32 h-32 object-cover rounded-full',
  },
};

export const ProjectThumbnail: Story = {
  args: {
    src: 'https://via.placeholder.com/600x400/4F46E5/ffffff?text=Project+Preview',
    alt: 'Project thumbnail',
    className: 'w-full h-64 object-cover rounded-xl',
  },
};




