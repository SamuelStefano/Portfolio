import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './Navigation';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Molecules/Navigation',
  component: Navigation,
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
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-screen">
      <Navigation />
      <div className="pt-20 px-4">
        <section id="inicio" className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">Início</h1>
        </section>
        <section id="projetos" className="min-h-screen flex items-center justify-center bg-muted">
          <h1 className="text-4xl font-bold">Projetos</h1>
        </section>
        <section id="habilidades" className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">Habilidades</h1>
        </section>
        <section id="sobre" className="min-h-screen flex items-center justify-center bg-muted">
          <h1 className="text-4xl font-bold">Sobre</h1>
        </section>
        <section id="contato" className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">Contato</h1>
        </section>
      </div>
    </div>
  ),
};

export const Scrolled: Story = {
  render: () => (
    <div className="h-screen">
      <div className="h-[200px]" />
      <Navigation />
      <div className="px-4 space-y-32">
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">Content after scroll</h1>
        </div>
      </div>
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div className="h-screen">
      <Navigation />
      <div className="pt-20 px-4">
        <section className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold text-center">Mobile Navigation</h1>
        </section>
      </div>
    </div>
  ),
};

