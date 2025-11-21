import type { Meta, StoryObj } from '@storybook/react';
import { ProjectOverlay } from './ProjectOverlay';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { Button } from '@/components/atoms/button/button';
import { useState } from 'react';
import type { Project } from '@/types/project';

const mockProject: Project = {
  id: '1',
  title: 'Skill Evals',
  role: 'Creator',
  description: 'Plataforma de desafios para desenvolvedores com execução de código e avaliação automática.',
  long_description: 'Plataforma completa de desafios para desenvolvedores, desenvolvida com React, TypeScript, Next.js no frontend e NestJS no backend. Utiliza Judge0 API para compilação e execução de código em múltiplas linguagens. Possui painéis administrativos completos, sistema de mentoria, gestão de desafios e acompanhamento de progresso. A plataforma permite que mentores criem desafios customizados, definam casos de teste e avaliem automaticamente as submissões dos desenvolvedores.',
  stack: ['React', 'TypeScript', 'Next.js', 'NestJS', 'Judge0', 'Supabase', 'PostgreSQL', 'Docker', 'TailwindCSS'],
  thumbnail_url: '/projects/Skill Evals/Thumb.png',
  icon_name: 'Code',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  auto_discovered: false,
  project_collaborators: [
    {
      id: '1',
      name: 'Samuel Stefano',
      role: 'Creator',
      avatar_url: '/Samuel.jpg',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Tainan Fidelis',
      role: 'Collaborator',
      avatar_url: '/Tainan Fidelis.jpeg',
      created_at: '2024-01-01T00:00:00Z'
    }
  ],
  project_links: [
    {
      id: '1',
      label: 'Website',
      title: 'View Live Project',
      url: 'https://skillevals.devfellowship.com/',
      type: 'website',
      created_at: '2024-01-01T00:00:00Z'
    }
  ],
  project_sections: [],
  image_categories: {
    'dashboard': [
      '/projects/Skill Evals/Dashboard principal.png',
      '/projects/Skill Evals/Dashboard de admin.png',
    ],
    'admin': [
      '/projects/Skill Evals/Dashboard de admin.png',
      '/projects/Skill Evals/Challenge arquivada.png',
    ],
    'challenge': [
      '/projects/Skill Evals/Challenge tela.png',
      '/projects/Skill Evals/Code.png',
    ],
  }
};

const OverlayStory = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <Button onClick={() => setIsOpen(true)}>Open Project Overlay</Button>
      <ProjectOverlay
        project={mockProject}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

const meta = {
  title: 'Organisms/ProjectOverlay',
  component: ProjectOverlay,
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
} satisfies Meta<typeof ProjectOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <OverlayStory />,
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => <OverlayStory />,
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  render: () => <OverlayStory />,
};




