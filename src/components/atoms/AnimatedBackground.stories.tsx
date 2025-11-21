import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedBackground } from './AnimatedBackground';

const meta = {
  title: 'Atoms/AnimatedBackground',
  component: AnimatedBackground,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnimatedBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="relative h-screen w-full">
      <AnimatedBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Animated Background
          </h1>
          <p className="text-muted-foreground">
            Beautiful gradient animation for hero sections
          </p>
        </div>
      </div>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="relative h-screen w-full">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 px-4">
        <h1 className="text-5xl font-bold gradient-text text-center">
          Samuel Stefano
        </h1>
        <p className="text-xl text-center max-w-2xl">
          Full-Stack Developer specializing in React, TypeScript, Node.js, and Web3
        </p>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
          View Projects
        </button>
      </div>
    </div>
  ),
};

