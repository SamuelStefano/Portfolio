import { Project } from '../types/project';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Skill Evals',
    role: 'Creator',
    description: 'Plataforma de desafios para desenvolvedores, challenges onde os devs devem se desafiar referente aos cursos ligados na plataforma de cursos DevfellowshipAcademy.',
    long_description: 'Plataforma de desafios para desenvolvedores, challenges onde os devs devem se desafiar referente aos cursos ligados na plataforma de cursos DevfellowshipAcademy. Com telas para Mentoria, Administradores, tudo bem organizado. Utiliza-se Judge0 como API de compilação.',
    stack: ['React', 'TypeScript', 'Node.js', 'Supabase', 'Judge0 API', 'TailwindCSS'],
    thumbnail_url: 'https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/devsharper-thumbnail.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9kZXZzaGFycGVyLXRodW1ibmFpbC5qcGciLCJpYXQiOjE3NTgzMTAwNDIsImV4cCI6MTc4OTg0NjA0Mn0.example',
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
        avatar_url: 'https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/Tainan%20Fidelis.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9UYWluYW4gRmlkZWxpcy5qcGVnIiwiaWF0IjoxNzU5MjYxOTc5LCJleHAiOjE3OTA3OTc5Nzl9.5S1vw8Z_RthbiR9J427HPDzm_Cq8P2qlDwxtaE-utAQ',
        created_at: '2024-01-15T00:00:00Z'
      }
    ],
    project_links: [
      {
        id: '1',
        label: 'GitHub Repository',
        title: 'GitHub Repository',
        url: 'https://github.com/SamuelStefano/DevSharper',
        type: 'github',
        created_at: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        label: 'Live Demo',
        title: 'Live Demo',
        url: 'https://devsharper.com',
        type: 'website',
        created_at: '2024-01-15T00:00:00Z'
      }
    ],
    project_sections: [
      {
        id: '1',
        folder_name: 'dashboard',
        display_name: 'mainDashboard',
        description: 'Interface principal com estatísticas e desafios em destaque',
        order_index: 1,
        project_images: [
          {
            id: '1',
            image_url: 'https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/devsharper-dashboard.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9kZXZzaGFycGVyLWRhc2hib2FyZC5qcGciLCJpYXQiOjE3NTgzMTAwNDIsImV4cCI6MTc4OTg0NjA0Mn0.example',
            order_index: 1
          }
        ]
      },
      {
        id: '2',
        folder_name: 'challenges',
        display_name: 'challengeSystem',
        description: 'Interface para criação e resolução de desafios de programação',
        order_index: 2,
        project_images: [
          {
            id: '2',
            image_url: 'https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/devsharper-challenges.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9kZXZzaGFycGVyLWNoYWxsZW5nZXMuanBnIiwiaWF0IjoxNzU4MzEwMDQyLCJleHAiOjE3ODk4NDYwNDJ9.example',
            order_index: 1
          }
        ]
      }
    ],
    image_categories: {
      'dashboard': ['https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/devsharper-dashboard.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9kZXZzaGFycGVyLWRhc2hib2FyZC5qcGciLCJpYXQiOjE3NTgzMTAwNDIsImV4cCI6MTc4OTg0NjA0Mn0.example'],
      'challenges': ['https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/devsharper-challenges.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9kZXZzaGFycGVyLWNoYWxsZW5nZXMuanBnIiwiaWF0IjoxNzU4MzEwMDQyLCJleHAiOjE3ODk4NDYwNDJ9.example']
    }
  },
  {
    id: '2',
    title: 'DevFellowship',
    role: 'Collaborator',
    description: 'Site da devfellowship em que colaborei, minha task era trabalhar apenas no hero.',
    long_description: 'Site da devfellowship em que colaborei, minha task era trabalhar apenas no hero. Projeto focado no desenvolvimento do hero da página principal da comunidade DevFellowship.',
    stack: ['React', 'TypeScript', 'Node.js', 'Supabase', 'TailwindCSS', 'Discord API'],
    thumbnail_url: 'https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/devfellowship-thumbnail.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9kZXZlbGxvd3NoaXAtdGh1bWJuYWlsLmpwZyIsImlhdCI6MTc1ODMxMDA0MiwiZXhwIjoxNzg5ODQ2MDQyfQ.example',
    icon_name: 'users',
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z',
    project_collaborators: [
      {
        id: '3',
        name: 'Tainan Fidelis',
        role: 'Creator',
        avatar_url: 'https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/Tainan%20Fidelis.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9UYWluYW4gRmlkZWxpcy5qcGVnIiwiaWF0IjoxNzU5MjYxOTc5LCJleHAiOjE3OTA3OTc5Nzl9.5S1vw8Z_RthbiR9J427HPDzm_Cq8P2qlDwxtaE-utAQ',
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
        id: '3',
        folder_name: 'community',
        display_name: 'community',
        description: 'Interface principal da comunidade com fóruns e eventos',
        order_index: 1,
        project_images: [
          {
            id: '3',
            image_url: 'https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/devfellowship-community.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9kZXZlbGxvd3NoaXAtY29tbXVuaXR5LmpwZyIsImlhdCI6MTc1ODMxMDA0MiwiZXhwIjoxNzg5ODQ2MDQyfQ.example',
            order_index: 1
          }
        ]
      }
    ],
    image_categories: {
      'community': ['https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/devfellowship-community.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9kZXZlbGxvd3NoaXAtY29tbXVuaXR5LmpwZyIsImlhdCI6MTc1ODMxMDA0MiwiZXhwIjoxNzg5ODQ2MDQyfQ.example']
    }
  },
  {
    id: '3',
    title: 'CodeLibrary',
    role: 'Collaborator',
    description: 'Uma landing page de uma plataforma de cursos chamada CodeLibrary que será o proximo lançamento da Devfellowship',
    long_description: 'Uma landing page de uma plataforma de cursos chamada CodeLibrary que será o proximo lançamento da Devfellowship. Projeto focado no desenvolvimento da página inicial da nova plataforma de cursos da comunidade.',
    stack: ['React', 'TypeScript', 'Next.js', 'Supabase', 'TailwindCSS', 'Prisma'],
    thumbnail_url: 'https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/codelibrary-thumbnail.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9jb2RlbGlicmFyeS10aHVtYm5haWwuanBnIiwiaWF0IjoxNzU4MzEwMDQyLCJleHAiOjE3ODk4NDYwNDJ9.example',
    icon_name: 'library',
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z',
    project_collaborators: [
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Collaborator',
        avatar_url: '/Samuel.jpg',
        created_at: '2024-06-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Tainan Fidelis',
        role: 'Creator',
        avatar_url: 'https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/Tainan%20Fidelis.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9UYWluYW4gRmlkZWxpcy5qcGVnIiwiaWF0IjoxNzU5MjYxOTc5LCJleHAiOjE3OTA3OTc5Nzl9.5S1vw8Z_RthbiR9J427HPDzm_Cq8P2qlDwxtaE-utAQ',
        created_at: '2024-06-01T00:00:00Z'
      }
    ],
    project_links: [
      {
        id: '5',
        label: 'GitHub Repository',
        title: 'GitHub Repository',
        url: 'https://github.com/SamuelStefano/CodeLibrary',
        type: 'github',
        created_at: '2024-06-01T00:00:00Z'
      },
      {
        id: '6',
        label: 'Live Demo',
        title: 'Live Demo',
        url: 'https://codelibrary.dev',
        type: 'website',
        created_at: '2024-06-01T00:00:00Z'
      }
    ],
    project_sections: [
      {
        id: '4',
        folder_name: 'landing',
        display_name: 'landing',
        description: 'Página inicial com apresentação da plataforma',
        order_index: 1,
        project_images: [
          {
            id: '4',
            image_url: 'https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/codelibrary-landing.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9jb2RlbGlicmFyeS1sYW5kaW5nLmpwZyIsImlhdCI6MTc1ODMxMDA0MiwiZXhwIjoxNzg5ODQ2MDQyfQ.example',
            order_index: 1
          }
        ]
      },
      {
        id: '5',
        folder_name: 'library',
        display_name: 'library',
        description: 'Interface principal com busca e categorização de exemplos',
        order_index: 2,
        project_images: [
          {
            id: '5',
            image_url: 'https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/codelibrary-library.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9jb2RlbGlicmFyeS1saWJyYXJ5LmpwZyIsImlhdCI6MTc1ODMxMDA0MiwiZXhwIjoxNzg5ODQ2MDQyfQ.example',
            order_index: 1
          }
        ]
      }
    ],
    image_categories: {
      'landing': ['https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/codelibrary-landing.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9jb2RlbGlicmFyeS1sYW5kaW5nLmpwZyIsImlhdCI6MTc1ODMxMDA0MiwiZXhwIjoxNzg5ODQ2MDQyfQ.example'],
      'library': ['https://kushljlnnwmqxubeeete.supabase.co/storage/v1/object/sign/Portfolio-bucket/images/codelibrary-library.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmE1ZjE0Ny0zOTI3LTQwMmQtOTllMS00OTJiZjVhYzk5YTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQb3J0Zm9saW8tYnVja2V0L2ltYWdlcy9jb2RlbGlicmFyeS1saWJyYXJ5LmpwZyIsImlhdCI6MTc1ODMxMDA0MiwiZXhwIjoxNzg5ODQ2MDQyfQ.example']
    }
  }
];

