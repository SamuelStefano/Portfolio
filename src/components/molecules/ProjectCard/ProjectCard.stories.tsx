import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/types/project';

const mockProject: Project = {
  id: '1',
  title: 'Skill Evals',
  role: 'Creator',
  description: 'Plataforma de desafios para desenvolvedores com execução de código e avaliação automática.',
  long_description: 'Plataforma completa de desafios para desenvolvedores, com sistema de execução de código usando Judge0, painéis administrativos e sistema de mentoria.',
  stack: ['React', 'TypeScript', 'Next.js', 'NestJS', 'Judge0', 'Supabase'],
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
      title: 'View Project',
      url: 'https://skillevals.devfellowship.com/',
      type: 'website',
      created_at: '2024-01-01T00:00:00Z'
    }
  ],
  project_sections: [],
  image_categories: {}
};

const meta = {
  title: 'Molecules/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: mockProject,
    onProjectClick: () => console.log('Project clicked'),
  },
};

export const WithImage: Story = {
  args: {
    project: {
      ...mockProject,
      thumbnail_url: '/projects/Skill Evals/Dashboard principal.png',
    },
    onProjectClick: () => console.log('Project clicked'),
  },
};

export const Web3Project: Story = {
  args: {
    project: {
      ...mockProject,
      id: '4',
      title: 'GreenLoop',
      description: 'Plataforma Web3 que transforma entregas de materiais recicláveis em tokens on-chain.',
      stack: ['TypeScript', 'Next.js', 'Solidity', 'ERC-20', 'Base', 'Web3'],
      thumbnail_url: '/projects/greenloop/GreenLoop - Dashboard.png',
      project_links: [
        {
          id: '1',
          label: 'Website',
          title: 'View Project',
          url: 'https://greenloop-zeta.vercel.app/',
          type: 'website',
          created_at: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          label: 'GitHub',
          title: 'GitHub Repository',
          url: 'https://github.com/RaulAl3n/GreenLoop',
          type: 'github',
          created_at: '2024-01-01T00:00:00Z'
        }
      ],
    },
    onProjectClick: () => console.log('Project clicked'),
  },
};

export const CollaboratorRole: Story = {
  args: {
    project: {
      ...mockProject,
      role: 'Collaborator',
      title: 'Review Requests',
      description: 'Sistema interno de revisões de tarefas similar a Pull Requests.',
      stack: ['Next.js', 'Supabase', 'PostgreSQL', 'RLS'],
    },
    onProjectClick: () => console.log('Project clicked'),
  },
};

export const MultipleProjects: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <ProjectCard
        project={mockProject}
        onProjectClick={() => console.log('Skill Evals clicked')}
      />
      <ProjectCard
        project={{
          ...mockProject,
          id: '2',
          title: 'DevFellowship',
          description: 'Plataforma principal da comunidade de desenvolvedores.',
          stack: ['React', 'Next.js', 'TailwindCSS'],
          thumbnail_url: '/projects/Devfellowship/Thumb devfellowship.png',
        }}
        onProjectClick={() => console.log('DevFellowship clicked')}
      />
      <ProjectCard
        project={{
          ...mockProject,
          id: '5',
          title: 'TalentDAO',
          role: 'Collaborator',
          description: 'Marketplace Web3 de jobs com NFTs como credenciais.',
          stack: ['Solidity', 'ERC-721', 'WETH', 'Next.js'],
          thumbnail_url: '/projects/mintwork/Dashboard - mintwork.png',
        }}
        onProjectClick={() => console.log('TalentDAO clicked')}
      />
    </div>
  ),
};



