import type { Meta, StoryObj } from '@storybook/react';
import { TechStack } from './TechStack';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

const meta = {
  title: 'Organisms/TechStack',
  component: TechStack,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
} satisfies Meta<typeof TechStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContainer: Story = {
  render: () => (
    <div className="bg-gradient-to-br from-background to-muted min-h-screen py-20">
      <TechStack />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};




