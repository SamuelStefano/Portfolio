import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { Button } from '@/components/atoms/button/button';
import { Info, HelpCircle, AlertCircle } from 'lucide-react';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="ghost">
          <Info className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Additional information</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const HelpIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="ghost">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Click for help documentation</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const LongText: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Project Info</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>
          This project was built using React, TypeScript, and TailwindCSS. It features a modern
          design system with reusable components.
        </p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Information</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Help</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline">
            <AlertCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Warning</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};




