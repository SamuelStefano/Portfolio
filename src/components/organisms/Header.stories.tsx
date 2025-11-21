import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBackground: Story = {
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/20">
      <Header />
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

