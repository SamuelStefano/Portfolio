import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSelector } from './LanguageSelector';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

const meta = {
  title: 'Molecules/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InNavigation: Story = {
  render: () => (
    <div className="bg-background p-4 rounded-lg border border-border">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Language:</span>
        <LanguageSelector />
      </div>
    </div>
  ),
};

export const InHeader: Story = {
  render: () => (
    <div className="bg-gradient-primary p-6 rounded-lg">
      <div className="flex items-center justify-between text-white">
        <h2 className="text-2xl font-bold">Samuel Stefano</h2>
        <LanguageSelector />
      </div>
    </div>
  ),
};




