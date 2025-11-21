import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
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
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContent: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">Portfolio Content</h1>
          <p className="text-muted-foreground">Scroll down to see the footer</p>
        </div>
      </div>
      <Footer />
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




