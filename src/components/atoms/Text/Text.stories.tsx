import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'large', 'small', 'muted'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is default text with normal styling.',
  },
};

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'This is large text for important content.',
  },
};

export const Small: Story = {
  args: {
    variant: 'small',
    children: 'This is small text for less important details.',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'This is muted text for secondary information.',
  },
};

export const LongText: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <Text variant="large">Large text variant for emphasis</Text>
      <Text variant="default">Default text variant for normal content</Text>
      <Text variant="small">Small text variant for less important details</Text>
      <Text variant="muted">Muted text variant for secondary information</Text>
    </div>
  ),
};




