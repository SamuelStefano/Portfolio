import { Project } from '../types/project';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Skill Evals',
    role: 'Creator',
    description: 'Plataforma de desafios para desenvolvedores, challenges onde os devs devem se desafiar referente aos cursos ligados na plataforma de cursos DevfellowshipAcademy.',
    long_description: 'Plataforma de desafios para desenvolvedores, challenges onde os devs devem se desafiar referente aos cursos ligados na plataforma de cursos DevfellowshipAcademy. Com telas para Mentoria, Administradores, tudo bem organizado. Utiliza-se Judge0 como API de compilação.',
    stack: ['React', 'TypeScript', 'Node.js', 'Supabase', 'Judge0 API', 'TailwindCSS'],
    thumbnail_url: '/projects/Skill Evals/Thumb.png',
    icon_name: 'code',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z',
    project_collaborators: [
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Creator',
        avatar_url: '/Samuel.jpg',
        created_at: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        name: 'Tainan Fidelis',
        role: 'Collaborator',
        avatar_url: '/Tainan Fidelis.jpeg',
        created_at: '2024-01-15T00:00:00Z'
      }
    ],
    project_links: [
      {
        id: '2',
        label: 'Website',
        title: 'Website',
        url: 'https://skillevals.devfellowship.com/',
        type: 'website',
        created_at: '2024-01-15T00:00:00Z'
      }
    ],
    project_sections: [
      {
        id: '1-1',
        folder_name: 'admin',
        display_name: 'Admin',
        description: 'Painel administrativo',
        order_index: 1,
        project_images: [
          { id: '1-1-1', image_url: '/projects/Skill Evals/Challenge arquivada.png', order_index: 1 },
          { id: '1-1-2', image_url: '/projects/Skill Evals/Dashboard de admin.png', order_index: 2 }
        ]
      },
      {
        id: '1-2',
        folder_name: 'challenges',
        display_name: 'Challenges',
        description: 'Sistema de desafios',
        order_index: 2,
        project_images: [
          { id: '1-2-1', image_url: '/projects/Skill Evals/Challenge tela.png', order_index: 1 },
          { id: '1-2-2', image_url: '/projects/Skill Evals/Challenge test passed.png', order_index: 2 },
          { id: '1-2-3', image_url: '/projects/Skill Evals/Pre Challenge.png', order_index: 3 },
          { id: '1-2-4', image_url: '/projects/Skill Evals/Tela challenge error.png', order_index: 4 }
        ]
      },
      {
        id: '1-3',
        folder_name: 'create',
        display_name: 'Create',
        description: 'Criação de challenges',
        order_index: 3,
        project_images: [
          { id: '1-3-1', image_url: '/projects/Skill Evals/Tela 1 criar challenge.png', order_index: 1 },
          { id: '1-3-2', image_url: '/projects/Skill Evals/Tela 2 criar challenge.png', order_index: 2 }
        ]
      },
      {
        id: '1-4',
        folder_name: 'dashboard',
        display_name: 'Dashboard',
        description: 'Dashboard principal',
        order_index: 4,
        project_images: [
          { id: '1-4-1', image_url: '/projects/Skill Evals/Dashboard principal.png', order_index: 1 }
        ]
      },
      {
        id: '1-5',
        folder_name: 'login',
        display_name: 'Login',
        description: 'Perfil e autenticação',
        order_index: 5,
        project_images: [
          { id: '1-5-1', image_url: '/projects/Skill Evals/Meu perfil alterando.png', order_index: 1 },
          { id: '1-5-2', image_url: '/projects/Skill Evals/Meu Perfil.png', order_index: 2 }
        ]
      },
      {
        id: '1-6',
        folder_name: 'others',
        display_name: 'Others',
        description: 'Outras funcionalidades',
        order_index: 6,
        project_images: [
          { id: '1-6-1', image_url: '/projects/Skill Evals/Code.png', order_index: 1 },
          { id: '1-6-2', image_url: '/projects/Skill Evals/Inpect.png', order_index: 2 },
          { id: '1-6-3', image_url: '/projects/Skill Evals/inspect 2.png', order_index: 3 }
        ]
      }
    ],
    image_categories: {
      'admin': ['/projects/Skill Evals/Challenge arquivada.png', '/projects/Skill Evals/Dashboard de admin.png'],
      'challenges': ['/projects/Skill Evals/Challenge tela.png', '/projects/Skill Evals/Challenge test passed.png', '/projects/Skill Evals/Pre Challenge.png', '/projects/Skill Evals/Tela challenge error.png'],
      'create': ['/projects/Skill Evals/Tela 1 criar challenge.png', '/projects/Skill Evals/Tela 2 criar challenge.png'],
      'dashboard': ['/projects/Skill Evals/Dashboard principal.png'],
      'login': ['/projects/Skill Evals/Meu perfil alterando.png', '/projects/Skill Evals/Meu Perfil.png'],
      'others': ['/projects/Skill Evals/Code.png', '/projects/Skill Evals/Inpect.png', '/projects/Skill Evals/inspect 2.png']
    }
  },
  {
    id: '2',
    title: 'DevFellowship',
    role: 'Collaborator',
    description: 'Site da devfellowship em que colaborei, minha task era trabalhar apenas no hero.',
    long_description: 'Site da devfellowship em que colaborei, minha task era trabalhar apenas no hero. Projeto focado no desenvolvimento do hero da página principal da comunidade DevFellowship.',
    stack: ['React', 'TypeScript', 'Node.js', 'Supabase', 'TailwindCSS', 'Discord API'],
    thumbnail_url: '/projects/Devfellowship/Thumb devfellowship.png',
    icon_name: 'users',
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z',
    project_collaborators: [
      {
        id: '3',
        name: 'Tainan Fidelis',
        role: 'Creator',
        avatar_url: '/Tainan Fidelis.jpeg',
        created_at: '2024-03-01T00:00:00Z'
      },
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Collaborator',
        avatar_url: '/Samuel.jpg',
        created_at: '2024-03-01T00:00:00Z'
      },
      {
        id: '4',
        name: 'Fellows',
        role: 'Collaborator',
        avatar_url: 'https://cesuras.blog/wp-content/uploads/2023/12/cesuras-perfil-vazio.webp',
        created_at: '2024-03-01T00:00:00Z'
      }
    ],
    project_links: [
      {
        id: '3',
        label: 'Website',
        title: 'Website',
        url: 'https://devfellowship.com',
        type: 'website',
        created_at: '2024-03-01T00:00:00Z'
      },
      {
        id: '4',
        label: 'Discord',
        title: 'Discord',
        url: 'https://discord.gg/devfellowship',
        type: 'discord',
        created_at: '2024-03-01T00:00:00Z'
      }
    ],
    project_sections: [
      {
        id: '2-1',
        folder_name: 'hero',
        display_name: 'Hero',
        description: 'Hero section do site',
        order_index: 1,
        project_images: [
          { id: '2-1-1', image_url: '/projects/Devfellowship/Hero devfellowship.png', order_index: 1 }
        ]
      }
    ],
    image_categories: {
      'hero': ['/projects/Devfellowship/Hero devfellowship.png']
    }
  },
  {
    id: '3',
    title: 'CodeLibrary',
    role: 'Collaborator',
    description: 'Uma landing page de uma plataforma de cursos chamada CodeLibrary que será o proximo lançamento da Devfellowship',
    long_description: 'Uma landing page de uma plataforma de cursos chamada CodeLibrary que será o proximo lançamento da Devfellowship. Projeto focado no desenvolvimento da página inicial da nova plataforma de cursos da comunidade.',
    stack: ['React', 'TypeScript', 'Next.js', 'Supabase', 'TailwindCSS', 'Prisma'],
    thumbnail_url: '/projects/Codelibrary/Hero.png',
    icon_name: 'Book',
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z',
    project_collaborators: [
      {
        id: '2',
        name: 'Tainan Fidelis',
        role: 'Creator',
        avatar_url: '/Tainan Fidelis.jpeg',
        created_at: '2024-06-01T00:00:00Z'
      },
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Collaborator',
        avatar_url: '/Samuel.jpg',
        created_at: '2024-06-01T00:00:00Z'
      },
      {
        id: '4',
        name: 'Fellows',
        role: 'Collaborator',
        avatar_url: 'https://cesuras.blog/wp-content/uploads/2023/12/cesuras-perfil-vazio.webp',
        created_at: '2024-06-01T00:00:00Z'
      }
    ],
    project_links: [
      {
        id: '5',
        label: 'GitHub',
        title: 'GitHub Repository',
        url: 'https://github.com/SamuelStefano/codelibrary-website',
        type: 'github',
        created_at: '2024-06-01T00:00:00Z'
      }
    ],
    project_sections: [
      { id: '3-1', folder_name: 'hero', display_name: 'Hero', description: 'Hero section', order_index: 1, project_images: [{ id: '3-1-1', image_url: '/projects/Codelibrary/Hero.png', order_index: 1 }] },
      { id: '3-2', folder_name: 'about', display_name: 'About Us', description: 'Sobre nós', order_index: 2, project_images: [{ id: '3-2-1', image_url: '/projects/Codelibrary/AboutUs.png', order_index: 1 }] },
      { id: '3-3', folder_name: 'courses', display_name: 'Courses', description: 'Card de cursos', order_index: 3, project_images: [{ id: '3-3-1', image_url: '/projects/Codelibrary/Courses.png', order_index: 1 }] },
      { id: '3-4', folder_name: 'community', display_name: 'Community', description: 'Comunidade', order_index: 4, project_images: [{ id: '3-4-1', image_url: '/projects/Codelibrary/Community.png', order_index: 1 }] },
      { id: '3-5', folder_name: 'methodologies', display_name: 'Methodologies', description: 'Metodologias', order_index: 5, project_images: [{ id: '3-5-1', image_url: '/projects/Codelibrary/Methodologies.png', order_index: 1 }] },
      { id: '3-6', folder_name: 'pricing', display_name: 'Plans and Prices', description: 'Planos e preços', order_index: 6, project_images: [{ id: '3-6-1', image_url: '/projects/Codelibrary/Plan and Prices.png', order_index: 1 }] },
      { id: '3-7', folder_name: 'table', display_name: 'Table', description: 'Tabela comparativa', order_index: 7, project_images: [{ id: '3-7-1', image_url: '/projects/Codelibrary/table.png', order_index: 1 }] },
      { id: '3-8', folder_name: 'footer', display_name: 'Footer', description: 'Rodapé', order_index: 8, project_images: [{ id: '3-8-1', image_url: '/projects/Codelibrary/Footer.png', order_index: 1 }] },
      { id: '3-9', folder_name: 'others', display_name: 'Others', description: 'Logos', order_index: 9, project_images: [{ id: '3-9-1', image_url: '/projects/Codelibrary/Logo-codelibrary.png', order_index: 1 }, { id: '3-9-2', image_url: '/projects/Codelibrary/Logo (1).png', order_index: 2 }] }
    ],
    image_categories: {
      'hero': ['/projects/Codelibrary/Hero.png'],
      'about': ['/projects/Codelibrary/AboutUs.png'],
      'courses': ['/projects/Codelibrary/Courses.png'],
      'community': ['/projects/Codelibrary/Community.png'],
      'methodologies': ['/projects/Codelibrary/Methodologies.png'],
      'pricing': ['/projects/Codelibrary/Plan and Prices.png'],
      'table': ['/projects/Codelibrary/table.png'],
      'footer': ['/projects/Codelibrary/Footer.png'],
      'others': ['/projects/Codelibrary/Logo-codelibrary.png', '/projects/Codelibrary/Logo (1).png']
    }
  },
  {
    id: '4',
    title: 'GreenLoop',
    role: 'Creator',
    description: 'Plataforma Web3 que transforma entregas de materiais recicláveis em tokens on-chain, incentivando sustentabilidade através de incentivos econômicos. 4º lugar no ETH Latam 2025.',
    long_description: 'GreenLoop é uma plataforma criada durante o ETH Latam 2025 que registra recicláveis entregues em pontos de coleta e converte essas entregas em tokens on-chain, usando tecnologia da rede Base. O projeto conquistou o 4º lugar no hackathon. Participei da parte de backend com Node.js e integração com contratos inteligentes, garantindo rastreabilidade e transparência no registro das entregas. A solução combina impacto social com tecnologia blockchain para incentivar práticas sustentáveis.',
    stack: ['Node.js', 'Solidity', 'Base', 'Smart Contracts', 'TypeScript', 'Web3', 'ERC-20', 'TailwindCSS'],
    thumbnail_url: '/projects/greenloop/GreenLoop - Dashboard.png',
    icon_name: 'Leaf',
    created_at: '2025-01-15T00:00:00Z',
    updated_at: '2025-01-20T00:00:00Z',
    project_collaborators: [
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Creator',
        avatar_url: '/Samuel.jpg',
        created_at: '2025-01-15T00:00:00Z'
      },
      {
        id: '5',
        name: 'Time GreenLoop',
        role: 'Collaborator',
        avatar_url: 'https://cesuras.blog/wp-content/uploads/2023/12/cesuras-perfil-vazio.webp',
        created_at: '2025-01-15T00:00:00Z'
      }
    ],
    project_links: [
      {
        id: '7',
        label: 'Website',
        title: 'Website',
        url: 'https://greenloop-zeta.vercel.app/',
        type: 'website',
        created_at: '2025-01-15T00:00:00Z'
      },
      {
        id: '7-1',
        label: 'GitHub Repository',
        title: 'GitHub Repository',
        url: 'https://github.com/RaulAl3n/GreenLoop',
        type: 'github',
        created_at: '2025-01-15T00:00:00Z'
      }
    ],
    project_sections: [
      {
        id: '4-1',
        folder_name: 'dashboard',
        display_name: 'Dashboard',
        description: 'Interface principal do GreenLoop',
        order_index: 1,
        project_images: [
          {
            id: '4-1-1',
            image_url: '/projects/greenloop/GreenLoop - Dashboard.png',
            order_index: 1
          }
        ]
      },
      {
        id: '4-2',
        folder_name: 'blockchain',
        display_name: 'Blockchain',
        description: 'Integração com blockchain e tokens',
        order_index: 2,
        project_images: [
          {
            id: '4-2-1',
            image_url: '/projects/greenloop/Comprovante sepolia scan.png',
            order_index: 1
          },
          {
            id: '4-2-2',
            image_url: '/projects/greenloop/Enviando tokens .png',
            order_index: 2
          }
        ]
      }
    ],
    image_categories: {
      'dashboard': ['/projects/greenloop/GreenLoop - Dashboard.png'],
      'blockchain': [
        '/projects/greenloop/Comprovante sepolia scan.png',
        '/projects/greenloop/Enviando tokens .png'
      ],
      'overview': ['/projects/greenloop/greenloop.png']
    }
  },
  {
    id: '5',
    title: 'TalentDAO',
    role: 'Collaborator',
    description: 'Marketplace Web3 onde empresas criam jobs, pagam em USDC e geram NFTs como credenciais de trabalho concluído. Sistema de escrow em smart contracts.',
    long_description: 'TalentDAO (também conhecido como DevConnect/MintWork) é um marketplace Web3 que conecta empresas e talentos de forma descentralizada. Os jobs são armazenados em smart contracts como structs, com um contrato de marketplace que atua como escrow em USDC. Quando o trabalho é aprovado, um contrato ERC-721 emite uma NFT como credencial permanente do job realizado. Participei da arquitetura dos contratos, fluxo de estados (aplicação, execução, revisão, conclusão), e integração do frontend com a blockchain usando Wagmi/Viem.',
    stack: ['Solidity', 'ERC-721', 'USDC', 'Next.js', 'React', 'TypeScript', 'Wagmi', 'Viem', 'Smart Contracts', 'TailwindCSS'],
    thumbnail_url: '/projects/mintwork/Dashboard - mintwork.png',
    icon_name: 'Briefcase',
    created_at: '2024-11-01T00:00:00Z',
    updated_at: '2025-01-10T00:00:00Z',
    project_collaborators: [
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Collaborator',
        avatar_url: '/Samuel.jpg',
        created_at: '2024-11-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Tainan Fidelis',
        role: 'Creator',
        avatar_url: 'https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/Tainan%20Fidelis.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9UYWluYW4gRmlkZWxpcy5qcGVnIiwiaWF0IjoxNzU5MjYxOTc5LCJleHAiOjE3OTA3OTc5Nzl9.5S1vw8Z_RthbiR9J427HPDzm_Cq8P2qlDwxtaE-utAQ',
        created_at: '2024-11-01T00:00:00Z'
      }
    ],
    project_links: [
      {
        id: '8',
        label: 'Website',
        title: 'Website',
        url: 'https://devconnect-talent-dao.vercel.app/',
        type: 'website',
        created_at: '2024-11-01T00:00:00Z'
      },
      {
        id: '8-1',
        label: 'GitHub Repository',
        title: 'GitHub Repository',
        url: 'https://github.com/taigfs/devconnect-talent-dao',
        type: 'github',
        created_at: '2024-11-01T00:00:00Z'
      }
    ],
    project_sections: [
      {
        id: '5-1',
        folder_name: 'dashboard',
        display_name: 'Dashboard',
        description: 'Interface principal e listagem de jobs',
        order_index: 1,
        project_images: [
          {
            id: '5-1-1',
            image_url: '/projects/mintwork/Dashboard - mintwork.png',
            order_index: 1
          },
          {
            id: '5-1-2',
            image_url: '/projects/mintwork/jobs - mintwork.png',
            order_index: 2
          }
        ]
      },
      {
        id: '5-2',
        folder_name: 'jobs',
        display_name: 'Jobs',
        description: 'Criação e gerenciamento de jobs',
        order_index: 2,
        project_images: [
          {
            id: '5-2-1',
            image_url: '/projects/mintwork/Create job.png',
            order_index: 1
          },
          {
            id: '5-2-2',
            image_url: '/projects/mintwork/Job created.png',
            order_index: 2
          },
          {
            id: '5-2-3',
            image_url: '/projects/mintwork/Apply for job.png',
            order_index: 3
          }
        ]
      },
      {
        id: '5-3',
        folder_name: 'nfts',
        display_name: 'NFTs & Credentials',
        description: 'Sistema de NFTs e certificados',
        order_index: 3,
        project_images: [
          {
            id: '5-3-1',
            image_url: '/projects/mintwork/Certificate and NFTs for job.png',
            order_index: 1
          },
          {
            id: '5-3-2',
            image_url: '/projects/mintwork/NFTs for job.png',
            order_index: 2
          },
          {
            id: '5-3-3',
            image_url: '/projects/mintwork/Approve job.png',
            order_index: 3
          },
          {
            id: '5-3-4',
            image_url: '/projects/mintwork/success approve job.png',
            order_index: 4
          }
        ]
      },
      {
        id: '5-4',
        folder_name: 'blockchain',
        display_name: 'Blockchain',
        description: 'Integração com blockchain',
        order_index: 4,
        project_images: [
          {
            id: '5-4-1',
            image_url: '/projects/mintwork/Connect Metadask.png',
            order_index: 1
          },
          {
            id: '5-4-2',
            image_url: '/projects/mintwork/Contract sepolia scroll scan.png',
            order_index: 2
          }
        ]
      }
    ],
    image_categories: {
      'dashboard': [
        '/projects/mintwork/Dashboard - mintwork.png',
        '/projects/mintwork/jobs - mintwork.png'
      ],
      'jobs': [
        '/projects/mintwork/Create job.png',
        '/projects/mintwork/Job created.png',
        '/projects/mintwork/Apply for job.png'
      ],
      'nfts': [
        '/projects/mintwork/Certificate and NFTs for job.png',
        '/projects/mintwork/NFTs for job.png',
        '/projects/mintwork/Approve job.png',
        '/projects/mintwork/success approve job.png'
      ],
      'blockchain': [
        '/projects/mintwork/Connect Metadask.png',
        '/projects/mintwork/Contract sepolia scroll scan.png'
      ]
    }
  },
  {
    id: '6',
    title: 'Review Requests',
    role: 'Creator',
    description: 'Sistema interno de revisões de tarefas da DevFellowship, similar a Pull Requests, com ciclos de revisão, rejeições, reavaliações e histórico completo.',
    long_description: 'Review Requests é um sistema interno desenvolvido para a DevFellowship que permite criar, revisar e avaliar tarefas de forma estruturada. Inspirado no sistema de Pull Requests do GitHub, possui ciclos de revisão completos: submissão, análise, aprovação/rejeição, reavaliação e histórico detalhado. Implementado com Supabase (RLS e RPCs), SQL avançado para queries complexas e frontend em Next.js com foco em UX intuitiva. O sistema permite que mentores revisem trabalhos de fellows de forma organizada, com comentários, notas e feedback estruturado.',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'SQL', 'TailwindCSS'],
    thumbnail_url: '/projects/reviewrequests/Reviews  - dashboard.png',
    icon_name: 'FileText',
    created_at: '2024-09-01T00:00:00Z',
    updated_at: '2024-12-15T00:00:00Z',
    project_collaborators: [
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Creator',
        avatar_url: '/Samuel.jpg',
        created_at: '2024-09-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Tainan Fidelis',
        role: 'Collaborator',
        avatar_url: 'https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/Tainan%20Fidelis.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9UYWluYW4gRmlkZWxpcy5qcGVnIiwiaWF0IjoxNzU5MjYxOTc5LCJleHAiOjE3OTA3OTc5Nzl9.5S1vw8Z_RthbiR9J427HPDzm_Cq8P2qlDwxtaE-utAQ',
        created_at: '2024-09-01T00:00:00Z'
      }
    ],
    project_links: [
      {
        id: '9',
        label: 'Website',
        title: 'Website',
        url: 'https://reviews.devfellowship.com/',
        type: 'website',
        created_at: '2024-09-01T00:00:00Z'
      }
    ],
    project_sections: [
      {
        id: '6-1',
        folder_name: 'dashboard',
        display_name: 'Dashboard',
        description: 'Interface principal de revisões',
        order_index: 1,
        project_images: [
          {
            id: '6-1-1',
            image_url: '/projects/reviewrequests/Reviews  - dashboard.png',
            order_index: 1
          }
        ]
      },
      {
        id: '6-2',
        folder_name: 'create',
        display_name: 'Criar Review',
        description: 'Processo de criação de review request',
        order_index: 2,
        project_images: [
          {
            id: '6-2-1',
            image_url: '/projects/reviewrequests/reviews - create.png',
            order_index: 1
          }
        ]
      }
    ],
    image_categories: {
      'dashboard': ['/projects/reviewrequests/Reviews  - dashboard.png'],
      'create': ['/projects/reviewrequests/reviews - create.png']
    }
  }
];

