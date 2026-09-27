import type { Project, ProjectSeed } from '../types/project';

const seeds: ProjectSeed[] = [
  {
    id: '11',
    title: 'ITERA',
    role: 'Creator',
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Supabase Realtime', 'PostgreSQL', 'RLS', 'Zod', 'TanStack Query', 'Fastify', 'MCP', 'Express', 'Stripe', 'Astro', 'Monaco Editor', 'Turborepo', 'Vitest', 'Playwright', 'Storybook', 'OpenTelemetry', 'TailwindCSS'],
    thumbnail_url: '/projects/itera/aula-ao-vivo.png',
    icon_name: 'GraduationCap',
    created_at: '2026-06-19T00:00:00Z',
    updated_at: '2026-07-27T00:00:00Z',
    project_collaborators: [
      {
        id: '11-c1',
        name: 'Samuel Stefano',
        role: 'Creator',
        avatar_url: '/avatar-lg.webp',
        created_at: '2026-06-19T00:00:00Z'
      },
      {
        id: '11-c2',
        name: 'Tainan Fidelis',
        website: 'https://tainanfidelis.com/linktree',
        role: 'Collaborator',
        avatar_url: '/Tainan Fidelis-avatar.webp',
        created_at: '2026-06-19T00:00:00Z'
      }
    ],
    project_links: [
      { id: '11-l1', label: 'Website', title: 'App', url: 'https://app.iterahq.dev', type: 'website', created_at: '2026-06-19T00:00:00Z' },
      { id: '11-l2', label: 'Website', title: 'Landing', url: 'https://iterahq.dev', type: 'website', created_at: '2026-06-19T00:00:00Z' },
      { id: '11-l3', label: 'Website', title: 'Docs', url: 'https://docs.iterahq.dev', type: 'website', created_at: '2026-06-19T00:00:00Z' }
    ],
    project_sections: [
      {
        id: '11-s1',
        folder_name: 'live',
        display_name: 'Aula ao vivo',
        order_index: 1,
        project_images: [{ id: '11-s1-i1', image_url: '/projects/itera/aula-ao-vivo.png', order_index: 1 }]
      },
      {
        id: '11-s6',
        folder_name: 'sandbox',
        display_name: 'Sandbox de código',
        order_index: 2,
        project_images: [
          { id: '11-s6-i1', image_url: '/projects/itera/sandbox-codigo.png', order_index: 1 },
          { id: '11-s6-i2', image_url: '/projects/itera/code-guiado.png', order_index: 2 }
        ]
      },
      {
        id: '11-s7',
        folder_name: 'git',
        display_name: 'Aula de Git no terminal',
        order_index: 3,
        project_images: [
          { id: '11-s7-i1', image_url: '/projects/itera/git-terminal.png', order_index: 1 },
          { id: '11-s7-i2', image_url: '/projects/itera/git-terminal-opcoes.png', order_index: 2 }
        ]
      },
      {
        id: '11-s8',
        folder_name: 'canvas',
        display_name: 'Canvas de atividades',
        order_index: 4,
        project_images: [
          { id: '11-s8-i1', image_url: '/projects/itera/canvas-conceito.png', order_index: 1 },
          { id: '11-s8-i2', image_url: '/projects/itera/canvas-associacao.png', order_index: 2 },
          { id: '11-s8-i3', image_url: '/projects/itera/canvas-ordenacao.png', order_index: 3 },
          { id: '11-s8-i4', image_url: '/projects/itera/canvas-diagrama.png', order_index: 4 }
        ]
      },
      {
        id: '11-s9',
        folder_name: 'trilha',
        display_name: 'Trilhas',
        order_index: 5,
        project_images: [
          { id: '11-s9-i1', image_url: '/projects/itera/trilha.png', order_index: 1 },
          { id: '11-s9-i2', image_url: '/projects/itera/catalogo.png', order_index: 2 }
        ]
      },
      {
        id: '11-s2',
        folder_name: 'hero',
        display_name: 'Recepção da sala',
        order_index: 6,
        project_images: [{ id: '11-s2-i1', image_url: '/projects/itera/recepcao.png', order_index: 1 }]
      },
      {
        id: '11-s3',
        folder_name: 'landing',
        display_name: 'Landing',
        order_index: 7,
        project_images: [{ id: '11-s3-i1', image_url: '/projects/itera/landing.png', order_index: 1 }]
      },
      {
        id: '11-s4',
        folder_name: 'docs',
        display_name: 'Documentação',
        order_index: 8,
        project_images: [{ id: '11-s4-i1', image_url: '/projects/itera/docs.png', order_index: 1 }]
      },
      {
        id: '11-s5',
        folder_name: 'login',
        display_name: 'Acesso ao app',
        order_index: 9,
        project_images: [{ id: '11-s5-i1', image_url: '/projects/itera/login.png', order_index: 1 }]
      }
    ],
    image_categories: {
      'live': ['/projects/itera/aula-ao-vivo.png'],
      'sandbox': ['/projects/itera/sandbox-codigo.png', '/projects/itera/code-guiado.png'],
      'git': ['/projects/itera/git-terminal.png', '/projects/itera/git-terminal-opcoes.png'],
      'canvas': [
        '/projects/itera/canvas-conceito.png',
        '/projects/itera/canvas-associacao.png',
        '/projects/itera/canvas-ordenacao.png',
        '/projects/itera/canvas-diagrama.png'
      ],
      'trilha': ['/projects/itera/trilha.png', '/projects/itera/catalogo.png'],
      'hero': ['/projects/itera/recepcao.png'],
      'landing': ['/projects/itera/landing.png'],
      'docs': ['/projects/itera/docs.png'],
      'login': ['/projects/itera/login.png']
    }
  },
  {
    id: '14',
    title: 'Lesson Studio',
    role: 'Lead Developer',
    stack: ['React', 'TypeScript', 'Vite', 'Zustand', 'Immer', 'TanStack Query', 'RecordRTC', 'Dexie (IndexedDB)', 'Supabase', 'Edge Functions', 'S3', 'dnd-kit', 'MCP', 'OpenTelemetry', 'Playwright', 'TailwindCSS'],
    thumbnail_url: '/projects/lesson-studio/editor.png',
    icon_name: 'Video',
    created_at: '2026-06-30T00:00:00Z',
    updated_at: '2026-09-25T00:00:00Z',
    project_collaborators: [
      { id: '14-c1', name: 'Samuel Stefano', role: 'Lead Developer', avatar_url: '/avatar-lg.webp', created_at: '2026-06-30T00:00:00Z' },
      { id: '14-c2', name: 'Tainan Fidelis', website: 'https://tainanfidelis.com/linktree', role: 'Collaborator', avatar_url: '/Tainan Fidelis-avatar.webp', created_at: '2026-06-30T00:00:00Z' }
    ],
    project_links: [
      { id: '14-l1', label: 'Website', title: 'App', url: 'https://lesson-studio.devfellowship.com', type: 'website', created_at: '2026-06-30T00:00:00Z' }
    ],
    project_sections: [
      {
        id: '14-s1',
        folder_name: 'editor',
        display_name: 'Editor de slides',
        order_index: 1,
        project_images: [{ id: '14-s1-i1', image_url: '/projects/lesson-studio/editor.png', order_index: 1 }]
      },
      {
        id: '14-s2',
        folder_name: 'projetos',
        display_name: 'Projetos',
        order_index: 2,
        project_images: [{ id: '14-s2-i1', image_url: '/projects/lesson-studio/projetos.png', order_index: 1 }]
      },
      {
        id: '14-s3',
        folder_name: 'templates',
        display_name: 'Biblioteca de templates',
        order_index: 3,
        project_images: [{ id: '14-s3-i1', image_url: '/projects/lesson-studio/templates.png', order_index: 1 }]
      },
      {
        id: '14-s4',
        folder_name: 'canvas',
        display_name: 'Visão de canvas',
        order_index: 4,
        project_images: [{ id: '14-s4-i1', image_url: '/projects/lesson-studio/canvas.png', order_index: 1 }]
      },
      {
        id: '14-s5',
        folder_name: 'exports',
        display_name: 'Exports',
        order_index: 5,
        project_images: [{ id: '14-s5-i1', image_url: '/projects/lesson-studio/exports.png', order_index: 1 }]
      }
    ],
    image_categories: {
      'editor': ['/projects/lesson-studio/editor.png'],
      'projetos': ['/projects/lesson-studio/projetos.png'],
      'templates': ['/projects/lesson-studio/templates.png'],
      'canvas': ['/projects/lesson-studio/canvas.png'],
      'exports': ['/projects/lesson-studio/exports.png']
    }
  },
  {
    id: '15',
    title: 'TradeView',
    role: 'Creator',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'TailwindCSS v4', 'Supabase', 'PostgreSQL', 'CCXT', 'decimal.js', 'Anthropic SDK', 'Vercel'],
    thumbnail_url: '/projects/tradeview/ativo.png',
    icon_name: 'TrendingUp',
    created_at: '2026-08-25T00:00:00Z',
    updated_at: '2026-08-26T00:00:00Z',
    project_collaborators: [
      { id: '15-c1', name: 'Samuel Stefano', role: 'Creator', avatar_url: '/avatar-lg.webp', created_at: '2026-08-25T00:00:00Z' }
    ],
    project_links: [
      { id: '15-l1', label: 'Website', title: 'App', url: 'https://tradeview-six.vercel.app', type: 'website', created_at: '2026-08-25T00:00:00Z' }
    ],
    project_sections: [
      {
        id: '15-s1',
        folder_name: 'ativo',
        display_name: 'Detalhe do ativo',
        order_index: 1,
        project_images: [{ id: '15-s1-i1', image_url: '/projects/tradeview/ativo.png', order_index: 1 }]
      },
      {
        id: '15-s2',
        folder_name: 'overview',
        display_name: 'Patrimônio e watchlist',
        order_index: 2,
        project_images: [{ id: '15-s2-i1', image_url: '/projects/tradeview/overview.png', order_index: 1 }]
      },
      {
        id: '15-s3',
        folder_name: 'mercados',
        display_name: 'Mercados conectados',
        order_index: 3,
        project_images: [{ id: '15-s3-i1', image_url: '/projects/tradeview/mercados.png', order_index: 1 }]
      }
    ],
    image_categories: {
      'ativo': ['/projects/tradeview/ativo.png'],
      'overview': ['/projects/tradeview/overview.png'],
      'mercados': ['/projects/tradeview/mercados.png']
    }
  },
  {
    id: '16',
    title: 'Campaigns',
    role: 'Lead Developer',
    stack: ['React 19', 'TypeScript', 'Vite', 'TailwindCSS v4', 'Hono', 'Node 22', 'Supabase', 'PostgreSQL', 'ClickHouse', 'TipTap', 'Zod', 'MCP', 'Claude API', 'Zernio API', 'Playwright', 'Docker', 'Dokploy'],
    thumbnail_url: '/projects/campaigns/calendario.png',
    icon_name: 'Calendar',
    created_at: '2026-08-06T00:00:00Z',
    updated_at: '2026-09-25T00:00:00Z',
    project_collaborators: [
      { id: '16-c1', name: 'Samuel Stefano', role: 'Lead Developer', avatar_url: '/avatar-lg.webp', created_at: '2026-08-06T00:00:00Z' },
      { id: '16-c2', name: 'Tainan Fidelis', website: 'https://tainanfidelis.com/linktree', role: 'Collaborator', avatar_url: '/Tainan Fidelis-avatar.webp', created_at: '2026-08-06T00:00:00Z' },
      { id: '16-c3', name: 'William Nunes', role: 'Collaborator', created_at: '2026-08-06T00:00:00Z' }
    ],
    project_links: [
      { id: '16-l1', label: 'Website', title: 'App', url: 'https://campaigns.devfellowship.com', type: 'website', created_at: '2026-08-06T00:00:00Z' }
    ],
    project_sections: [
      {
        id: '16-s1',
        folder_name: 'calendario',
        display_name: 'Calendário de posts',
        order_index: 1,
        project_images: [{ id: '16-s1-i1', image_url: '/projects/campaigns/calendario.png', order_index: 1 }]
      },
      {
        id: '16-s2',
        folder_name: 'revisao',
        display_name: 'Fila de revisão',
        order_index: 2,
        project_images: [{ id: '16-s2-i1', image_url: '/projects/campaigns/revisao.png', order_index: 1 }]
      },
      {
        id: '16-s5',
        folder_name: 'post',
        display_name: 'Post publicado',
        order_index: 3,
        project_images: [{ id: '16-s5-i1', image_url: '/projects/campaigns/post.png', order_index: 1 }]
      },
      {
        id: '16-s6',
        folder_name: 'novo-post',
        display_name: 'Novo post',
        order_index: 4,
        project_images: [{ id: '16-s6-i1', image_url: '/projects/campaigns/novo-post.png', order_index: 1 }]
      },
      {
        id: '16-s3',
        folder_name: 'analytics',
        display_name: 'Analytics',
        order_index: 5,
        project_images: [{ id: '16-s3-i1', image_url: '/projects/campaigns/analytics.png', order_index: 1 }]
      },
      {
        id: '16-s4',
        folder_name: 'perfis',
        display_name: 'Perfis e contas',
        order_index: 6,
        project_images: [{ id: '16-s4-i1', image_url: '/projects/campaigns/perfis.png', order_index: 1 }]
      }
    ],
    image_categories: {
      'calendario': ['/projects/campaigns/calendario.png'],
      'revisao': ['/projects/campaigns/revisao.png'],
      'post': ['/projects/campaigns/post.png'],
      'novo-post': ['/projects/campaigns/novo-post.png'],
      'analytics': ['/projects/campaigns/analytics.png'],
      'perfis': ['/projects/campaigns/perfis.png']
    }
  },
  {
    id: '0',
    title: 'Deck',
    role: 'Creator',
    stack: ['React', 'TypeScript', 'Vite', 'Node.js', 'WebSocket', 'Claude API', 'Anthropic', 'MCP', 'tmux', 'PTY', 'Supabase', 'Infisical', 'tree-sitter', 'Vitest', 'Docker', 'Hetzner VPS', 'TailwindCSS', 'Vercel'],
    thumbnail_url: '/projects/Deck/Sessoes.png',
    icon_name: 'Monitor',
    created_at: '2026-06-05T00:00:00Z',
    updated_at: '2026-07-27T00:00:00Z',
    project_collaborators: [
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Creator',
        avatar_url: '/avatar-lg.webp',
        created_at: '2026-06-05T00:00:00Z'
      }
    ],
    project_links: [],
    project_sections: [
      {
        id: '0-1',
        folder_name: 'sessoes',
        display_name: 'Sessões',
        order_index: 1,
        project_images: [
          { id: '0-1-1', image_url: '/projects/Deck/Sessoes.png', order_index: 1 },
          { id: '0-1-2', image_url: '/projects/Deck/Composer.png', order_index: 2 }
        ]
      },
      {
        id: '0-2',
        folder_name: 'memoria',
        display_name: 'Contatos & Memória',
        order_index: 2,
        project_images: [
          { id: '0-2-1', image_url: '/projects/Deck/Contatos.png', order_index: 1 },
          { id: '0-2-2', image_url: '/projects/Deck/Memoria.png', order_index: 2 }
        ]
      },
      {
        id: '0-3',
        folder_name: 'skills',
        display_name: 'Skills',
        order_index: 3,
        project_images: [
          { id: '0-3-1', image_url: '/projects/Deck/Skills.png', order_index: 1 }
        ]
      },
      {
        id: '0-4',
        folder_name: 'documentos',
        display_name: 'Documentos',
        order_index: 4,
        project_images: [
          { id: '0-4-1', image_url: '/projects/Deck/Documentos.png', order_index: 1 }
        ]
      },
      {
        id: '0-5',
        folder_name: 'custos',
        display_name: 'Custos & Tokens',
        order_index: 5,
        project_images: [
          { id: '0-5-1', image_url: '/projects/Deck/Custos.png', order_index: 1 }
        ]
      },
      {
        id: '0-6',
        folder_name: 'admin',
        display_name: 'Admin & Host',
        order_index: 6,
        project_images: [
          { id: '0-6-1', image_url: '/projects/Deck/Admin.png', order_index: 1 }
        ]
      },
      {
        id: '0-7',
        folder_name: 'docs',
        display_name: 'Documentação',
        order_index: 7,
        project_images: [
          { id: '0-7-1', image_url: '/projects/Deck/Documentacao.png', order_index: 1 }
        ]
      },
      {
        id: '0-8',
        folder_name: 'canvas',
        display_name: 'Canvas',
        order_index: 1.1,
        project_images: [
          { id: '0-8-1', image_url: '/projects/Deck/canvas.png', order_index: 1 }
        ]
      },
      {
        id: '0-9',
        folder_name: 'kanban',
        display_name: 'Kanban',
        order_index: 1.2,
        project_images: [
          { id: '0-9-1', image_url: '/projects/Deck/kanban.png', order_index: 1 }
        ]
      },
      {
        id: '0-10',
        folder_name: 'graph',
        display_name: 'Graph',
        order_index: 1.3,
        project_images: [
          { id: '0-10-1', image_url: '/projects/Deck/graph.png', order_index: 1 }
        ]
      },
      {
        id: '0-11',
        folder_name: 'crons',
        display_name: 'Crons',
        order_index: 5.5,
        project_images: [
          { id: '0-11-1', image_url: '/projects/Deck/crons.png', order_index: 1 }
        ]
      },
      {
        id: '0-12',
        folder_name: 'playground',
        display_name: 'Playground',
        order_index: 7.5,
        project_images: [
          { id: '0-12-1', image_url: '/projects/Deck/playground.png', order_index: 1 }
        ]
      }
    ],
    image_categories: {
      'sessoes': ['/projects/Deck/Sessoes.png', '/projects/Deck/Composer.png'],
      'memoria': ['/projects/Deck/Contatos.png', '/projects/Deck/Memoria.png'],
      'skills': ['/projects/Deck/Skills.png'],
      'documentos': ['/projects/Deck/Documentos.png'],
      'custos': ['/projects/Deck/Custos.png'],
      'admin': ['/projects/Deck/Admin.png'],
      'docs': ['/projects/Deck/Documentacao.png'],
      'canvas': ['/projects/Deck/canvas.png'],
      'kanban': ['/projects/Deck/kanban.png'],
      'graph': ['/projects/Deck/graph.png'],
      'crons': ['/projects/Deck/crons.png'],
      'playground': ['/projects/Deck/playground.png']
    }
  },
  {
    id: '12',
    title: 'Valdez',
    role: 'Creator',
    stack: ['TypeScript', 'Node.js', 'discord.js', '@discordjs/voice', 'Opus', 'SQLite', 'better-sqlite3', 'ffmpeg', 'yt-dlp', 'Spotify Web API', 'Docker', 'Docker Compose', 'Hetzner VPS'],
    thumbnail_url: '/projects/valdez/landing.png',
    icon_name: 'Headphones',
    created_at: '2026-05-14T00:00:00Z',
    updated_at: '2026-07-23T00:00:00Z',
    project_collaborators: [
      {
        id: '12-c1',
        name: 'Samuel Stefano',
        role: 'Creator',
        avatar_url: '/avatar-lg.webp',
        created_at: '2026-05-14T00:00:00Z'
      }
    ],
    project_links: [
      {
        id: '12-l1',
        label: 'GitHub Repository',
        title: 'GitHub Repository',
        url: 'https://github.com/SamuelStefano/valdez-bot',
        type: 'github',
        created_at: '2026-05-14T00:00:00Z'
      }
    ],
    project_sections: [
      {
        id: '12-s1',
        folder_name: 'landing',
        display_name: 'Landing',
        order_index: 1,
        project_images: [{ id: '12-s1-i1', image_url: '/projects/valdez/landing.png', order_index: 1 }]
      },
      {
        id: '12-s2',
        folder_name: 'sala',
        display_name: 'Vídeo da sala',
        order_index: 2,
        project_images: [{ id: '12-s2-i1', image_url: '/projects/valdez/sala.png', order_index: 1 }]
      }
    ],
    image_categories: {
      'landing': ['/projects/valdez/landing.png'],
      'sala': ['/projects/valdez/sala.png']
    }
  },
  {
    id: '1',
    title: 'Skill Evals',
    role: 'Creator',
    stack: ['React', 'TypeScript', 'Node.js', 'Supabase', 'Judge0 API', 'Module Federation', 'TailwindCSS'],
    thumbnail_url: '/projects/Skill Evals/Thumb.png',
    icon_name: 'Code',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-12-01T00:00:00Z',
    project_collaborators: [
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Creator',
        avatar_url: '/avatar-lg.webp',
        created_at: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        name: 'Tainan Fidelis',
        website: 'https://tainanfidelis.com/linktree',
        role: 'Collaborator',
        avatar_url: '/Tainan Fidelis-avatar.webp',
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
        order_index: 4,
        project_images: [
          { id: '1-4-1', image_url: '/projects/Skill Evals/Dashboard principal.png', order_index: 1 }
        ]
      },
      {
        id: '1-5',
        folder_name: 'login',
        display_name: 'Login',
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
    id: '4',
    title: 'GreenLoop',
    role: 'Collaborator',
    stack: ['Node.js', 'Solidity', 'Base', 'Smart Contracts', 'TypeScript', 'Web3', 'ERC-20', 'TailwindCSS'],
    thumbnail_url: '/projects/greenloop/GreenLoop - Dashboard.png',
    icon_name: 'Leaf',
    created_at: '2025-01-15T00:00:00Z',
    updated_at: '2025-01-20T00:00:00Z',
    project_collaborators: [
      {
        id: '5',
        name: 'Raul Alencar',
        role: 'Creator',
        avatar_url: '/placeholder.svg',
        created_at: '2025-01-15T00:00:00Z'
      },
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Collaborator',
        avatar_url: '/avatar-lg.webp',
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
    stack: ['Solidity', 'ERC-721', 'USDC', 'Scroll', 'Next.js', 'React', 'TypeScript', 'Wagmi', 'Viem', 'Smart Contracts', 'TailwindCSS'],
    thumbnail_url: '/projects/mintwork/Dashboard - mintwork.png',
    icon_name: 'Briefcase',
    created_at: '2024-11-01T00:00:00Z',
    updated_at: '2025-01-10T00:00:00Z',
    project_collaborators: [
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Collaborator',
        avatar_url: '/avatar-lg.webp',
        created_at: '2024-11-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Tainan Fidelis',
        website: 'https://tainanfidelis.com/linktree',
        role: 'Creator',
        avatar_url: '/Tainan Fidelis-avatar.webp',
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
    role: 'Collaborator',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'SQL', 'Module Federation', 'TailwindCSS'],
    thumbnail_url: '/projects/reviewrequests/Reviews  - dashboard.png',
    icon_name: 'FileText',
    created_at: '2024-09-01T00:00:00Z',
    updated_at: '2024-12-15T00:00:00Z',
    project_collaborators: [
      {
        id: '2',
        name: 'Tainan Fidelis',
        website: 'https://tainanfidelis.com/linktree',
        role: 'Creator',
        avatar_url: '/Tainan Fidelis-avatar.webp',
        created_at: '2024-09-01T00:00:00Z'
      },
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Collaborator',
        avatar_url: '/avatar-lg.webp',
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
        order_index: 2,
        project_images: [
          {
            id: '6-2-1',
            image_url: '/projects/reviewrequests/reviews - create.png',
            order_index: 1
          }
        ]
      },
      {
        id: '6-3',
        folder_name: 'view',
        display_name: 'Visualizar Review',
        order_index: 3,
        project_images: [
          {
            id: '6-3-1',
            image_url: '/projects/reviewrequests/Reviews - View.png',
            order_index: 1
          }
        ]
      },
      {
        id: '6-4',
        folder_name: 'autoavaliacao',
        display_name: 'Autoavaliação',
        order_index: 4,
        project_images: [
          {
            id: '6-4-1',
            image_url: '/projects/reviewrequests/Reviews - autoavaliação.png',
            order_index: 1
          }
        ]
      },
      {
        id: '6-5',
        folder_name: 'avaliacaoMentor',
        display_name: 'Avaliação do Mentor',
        order_index: 5,
        project_images: [
          {
            id: '6-5-1',
            image_url: '/projects/reviewrequests/Reviews - avaliação do mentor.png',
            order_index: 1
          }
        ]
      },
      {
        id: '6-6',
        folder_name: 'reviewMentor',
        display_name: 'Review do Mentor',
        order_index: 6,
        project_images: [
          {
            id: '6-6-1',
            image_url: '/projects/reviewrequests/Reviews - review do mentor.png',
            order_index: 1
          }
        ]
      },
      {
        id: '6-7',
        folder_name: 'reprovacaoReview',
        display_name: 'Reprovação da Review',
        order_index: 7,
        project_images: [
          {
            id: '6-7-1',
            image_url: '/projects/reviewrequests/Reviews - reprovação da review.png',
            order_index: 1
          }
        ]
      },
      {
        id: '6-8',
        folder_name: 'comments',
        display_name: 'Comentários',
        order_index: 8,
        project_images: [
          {
            id: '6-8-1',
            image_url: '/projects/reviewrequests/Reviews - comments.png',
            order_index: 1
          }
        ]
      },
      {
        id: '6-9',
        folder_name: 'templates',
        display_name: 'Templates',
        order_index: 9,
        project_images: [
          {
            id: '6-9-1',
            image_url: '/projects/reviewrequests/Reviews - templates.png',
            order_index: 1
          }
        ]
      }
    ],
    image_categories: {
      'dashboard': ['/projects/reviewrequests/Reviews  - dashboard.png'],
      'create': ['/projects/reviewrequests/reviews - create.png'],
      'view': ['/projects/reviewrequests/Reviews - View.png'],
      'autoavaliacao': ['/projects/reviewrequests/Reviews - autoavaliação.png'],
      'avaliacaoMentor': ['/projects/reviewrequests/Reviews - avaliação do mentor.png'],
      'reviewMentor': ['/projects/reviewrequests/Reviews - review do mentor.png'],
      'reprovacaoReview': ['/projects/reviewrequests/Reviews - reprovação da review.png'],
      'comments': ['/projects/reviewrequests/Reviews - comments.png'],
      'templates': ['/projects/reviewrequests/Reviews - templates.png']
    }
  },
  {
    id: '7',
    title: 'DFL Learn',
    role: 'Collaborator',
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'TanStack Query', 'Module Federation', 'TailwindCSS', 'Stripe', 'n8n', 'PostgreSQL', 'Claude API', 'Framer Motion', 'Playwright'],
    thumbnail_url: '/projects/dfllearn/dashboard.png',
    icon_name: 'Layout',
    created_at: '2024-07-01T00:00:00Z',
    updated_at: '2026-09-25T00:00:00Z',
    project_collaborators: [
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Collaborator',
        avatar_url: '/avatar-lg.webp',
        created_at: '2024-07-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Tainan Fidelis',
        website: 'https://tainanfidelis.com/linktree',
        role: 'Creator',
        avatar_url: '/Tainan Fidelis-avatar.webp',
        created_at: '2024-07-01T00:00:00Z'
      },
      {
        id: '4',
        name: 'Fellows',
        role: 'Collaborator',
        avatar_url: '/placeholder.svg',
        created_at: '2024-07-01T00:00:00Z'
      }
    ],
    project_links: [
      {
        id: '10',
        label: 'Website',
        title: 'Website',
        url: 'https://devfellowship.com',
        type: 'website',
        created_at: '2024-07-01T00:00:00Z'
      }
    ],
    project_sections: [
      {
        id: '7-s1',
        folder_name: 'dashboard',
        display_name: 'Meu dashboard',
        order_index: 1,
        project_images: [
          { id: '7-s1-1', image_url: '/projects/dfllearn/dashboard.png', order_index: 1 }
        ]
      },
      {
        id: '7-s2',
        folder_name: 'miniapp',
        display_name: 'Mini-app dentro do host',
        order_index: 2,
        project_images: [
          { id: '7-s2-1', image_url: '/projects/dfllearn/mini-app-reviews.png', order_index: 1 }
        ]
      },
      {
        id: '7-s3',
        folder_name: 'deliveries',
        display_name: 'Entregas',
        order_index: 3,
        project_images: [
          { id: '7-s3-1', image_url: '/projects/dfllearn/deliveries.png', order_index: 1 }
        ]
      },
      {
        id: '7-s4',
        folder_name: 'meetings',
        display_name: 'Grafo de reuniões',
        order_index: 4,
        project_images: [
          { id: '7-s4-1', image_url: '/projects/dfllearn/meetings-graph.png', order_index: 1 }
        ]
      },
      {
        id: '7-s5',
        folder_name: 'courses',
        display_name: 'Cursos',
        order_index: 5,
        project_images: [
          { id: '7-s5-1', image_url: '/projects/dfllearn/courses.png', order_index: 1 }
        ]
      }
    ]
  },
  {
    id: '8',
    title: 'DFL Payments',
    role: 'Creator',
    stack: ['React', 'TypeScript', 'Vite', 'Module Federation', 'TailwindCSS', 'Supabase', 'Supabase Edge Functions', 'PostgreSQL', 'RLS', 'Autentique', 'Woovi', 'Pix', 'Spedy', 'NFS-e', 'Webhooks', 'HMAC', 'Cron', 'Vitest'],
    thumbnail_url: '/projects/payments/revenue.png',
    icon_name: 'CreditCard',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2026-07-24T00:00:00Z',
    project_collaborators: [
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Creator',
        avatar_url: '/avatar-lg.webp',
        created_at: '2025-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Tainan Fidelis',
        website: 'https://tainanfidelis.com/linktree',
        role: 'Collaborator',
        avatar_url: '/Tainan Fidelis-avatar.webp',
        created_at: '2025-01-01T00:00:00Z'
      }
    ],
    project_links: [
      {
        id: '11',
        label: 'Website',
        title: 'Website',
        url: 'https://payments.devfellowship.com/invoices',
        type: 'website',
        created_at: '2025-01-01T00:00:00Z'
      }
    ],
    project_sections: [
      {
        id: '8-s1',
        folder_name: 'revenue',
        display_name: 'Receita B2B',
        order_index: 1,
        project_images: [
          { id: '8-s1-1', image_url: '/projects/payments/revenue.png', order_index: 1 }
        ]
      },
      {
        id: '8-s2',
        folder_name: 'contracts',
        display_name: 'Contratos',
        order_index: 2,
        project_images: [
          { id: '8-s2-1', image_url: '/projects/payments/contracts.png', order_index: 1 }
        ]
      },
      {
        id: '8-s3',
        folder_name: 'create',
        display_name: 'Novo contrato',
        order_index: 3,
        project_images: [
          { id: '8-s3-1', image_url: '/projects/payments/contract-new.png', order_index: 1 }
        ]
      },
      {
        id: '8-s4',
        folder_name: 'board',
        display_name: 'Invoices dos fellows',
        order_index: 4,
        project_images: [
          { id: '8-s4-1', image_url: '/projects/payments/board.png', order_index: 1 }
        ]
      },
      {
        id: '8-s5',
        folder_name: 'invoice',
        display_name: 'Nova invoice',
        order_index: 5,
        project_images: [
          { id: '8-s5-1', image_url: '/projects/payments/new-invoice.png', order_index: 1 }
        ]
      },
      {
        id: '8-s6',
        folder_name: 'invoice-detail',
        display_name: 'Detalhe da invoice',
        order_index: 6,
        project_images: [
          { id: '8-s6-1', image_url: '/projects/payments/invoice-detail.png', order_index: 1 }
        ]
      }
    ]
  },
  {
    id: '9',
    title: 'DFL-Bot Reviewer',
    role: 'Creator',
    stack: ['GitHub Actions', 'Claude API', 'Anthropic', 'Node.js', 'TypeScript', 'Vitest', 'ESLint', 'CI/CD', 'Composite Actions'],
    thumbnail_url: '/projects/cibot/GitHub Actions CI.png',
    icon_name: 'Bot',
    created_at: '2025-02-01T00:00:00Z',
    updated_at: '2026-04-01T00:00:00Z',
    project_collaborators: [
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Creator',
        avatar_url: '/avatar-lg.webp',
        created_at: '2025-02-01T00:00:00Z'
      }
    ],
    project_links: [],
    project_sections: [
      {
        id: '9-1',
        folder_name: 'pipeline',
        display_name: 'CI Pipeline',
        order_index: 1,
        project_images: [
          { id: '9-1-1', image_url: '/projects/cibot/GitHub Actions CI.png', order_index: 1 }
        ]
      }
    ],
    image_categories: {
      'pipeline': ['/projects/cibot/GitHub Actions CI.png']
    }
  },
  {
    id: '10',
    title: 'AltPay',
    role: 'Creator',
    stack: ['React', 'TypeScript', 'Vite', 'Solana', 'Anchor', 'Rust', 'Chainlink CRE', 'CCIP', 'Solidity', 'Foundry', 'Supabase Edge Functions', 'Woovi', 'Pix', 'Web3', 'TailwindCSS'],
    thumbnail_url: '/projects/altpay/Landing.png',
    icon_name: 'CreditCard',
    created_at: '2026-05-29T00:00:00Z',
    updated_at: '2026-05-31T00:00:00Z',
    project_collaborators: [
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Creator',
        avatar_url: '/avatar-lg.webp',
        created_at: '2026-05-29T00:00:00Z'
      }
    ],
    project_links: [
      {
        id: '12',
        label: 'GitHub Repository',
        title: 'GitHub Repository',
        url: 'https://github.com/SamuelStefano/AltPay',
        type: 'github',
        created_at: '2026-05-29T00:00:00Z'
      }
    ],
    project_sections: [
      {
        id: '10-1',
        folder_name: 'landing',
        display_name: 'Landing',
        order_index: 1,
        project_images: [
          { id: '10-1-1', image_url: '/projects/altpay/Landing.png', order_index: 1 }
        ]
      },
      {
        id: '10-2',
        folder_name: 'dashboard',
        display_name: 'Dashboard',
        order_index: 2,
        project_images: [
          { id: '10-2-1', image_url: '/projects/altpay/Dashboard.png', order_index: 1 }
        ]
      },
      {
        id: '10-3',
        folder_name: 'score',
        display_name: 'Score Onboarding',
        order_index: 3,
        project_images: [
          { id: '10-3-1', image_url: '/projects/altpay/Onboarding Score.png', order_index: 1 }
        ]
      },
      {
        id: '10-4',
        folder_name: 'cobrancas',
        display_name: 'Cobranças Pix',
        order_index: 4,
        project_images: [
          { id: '10-4-1', image_url: '/projects/altpay/Cobrancas Pix.png', order_index: 1 }
        ]
      }
    ],
    image_categories: {
      'landing': ['/projects/altpay/Landing.png'],
      'dashboard': ['/projects/altpay/Dashboard.png'],
      'score': ['/projects/altpay/Onboarding Score.png'],
      'cobrancas': ['/projects/altpay/Cobrancas Pix.png']
    }
  },
  {
    id: '13',
    title: 'CodeLibrary',
    role: 'Creator',
    stack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Vercel', 'Figma'],
    thumbnail_url: '/projects/Codelibrary/Hero.png',
    icon_name: 'Library',
    created_at: '2025-11-21T00:00:00Z',
    updated_at: '2025-11-21T00:00:00Z',
    project_collaborators: [
      {
        id: '1',
        name: 'Samuel Stefano',
        role: 'Creator',
        avatar_url: '/avatar-lg.webp',
        created_at: '2025-11-21T00:00:00Z'
      }
    ],
    project_links: [
      {
        id: '13-l1',
        label: 'GitHub Repository',
        title: 'GitHub Repository',
        url: 'https://github.com/SamuelStefano/codelibrary-website',
        type: 'github',
        created_at: '2025-11-21T00:00:00Z'
      }
    ],
    project_sections: [
      {
        id: '13-1',
        folder_name: 'hero',
        display_name: 'Hero',
        order_index: 1,
        project_images: [
          { id: '13-1-1', image_url: '/projects/Codelibrary/Hero.png', order_index: 1 }
        ]
      },
      {
        id: '13-2',
        folder_name: 'cursos',
        display_name: 'Cursos',
        order_index: 2,
        project_images: [
          { id: '13-2-1', image_url: '/projects/Codelibrary/Courses.png', order_index: 1 },
          { id: '13-2-2', image_url: '/projects/Codelibrary/table.png', order_index: 2 }
        ]
      },
      {
        id: '13-3',
        folder_name: 'metodologia',
        display_name: 'Metodologia',
        order_index: 3,
        project_images: [
          { id: '13-3-1', image_url: '/projects/Codelibrary/Methodologies.png', order_index: 1 }
        ]
      },
      {
        id: '13-4',
        folder_name: 'planos',
        display_name: 'Planos',
        order_index: 4,
        project_images: [
          { id: '13-4-1', image_url: '/projects/Codelibrary/Plan and Prices.png', order_index: 1 }
        ]
      },
      {
        id: '13-5',
        folder_name: 'comunidade',
        display_name: 'Comunidade',
        order_index: 5,
        project_images: [
          { id: '13-5-1', image_url: '/projects/Codelibrary/Community.png', order_index: 1 },
          { id: '13-5-2', image_url: '/projects/Codelibrary/AboutUs.png', order_index: 2 },
          { id: '13-5-3', image_url: '/projects/Codelibrary/Footer.png', order_index: 3 }
        ]
      }
    ],
    image_categories: {
      'hero': ['/projects/Codelibrary/Hero.png'],
      'cursos': ['/projects/Codelibrary/Courses.png', '/projects/Codelibrary/table.png'],
      'metodologia': ['/projects/Codelibrary/Methodologies.png'],
      'planos': ['/projects/Codelibrary/Plan and Prices.png'],
      'comunidade': ['/projects/Codelibrary/Community.png', '/projects/Codelibrary/AboutUs.png', '/projects/Codelibrary/Footer.png']
    }
  }
];

/** Display order; the first block is the featured showcase. */
const PROJECT_META: Array<[title: string, meta: Pick<Project, 'status' | 'featured'>]> = [
  ['ITERA', { status: 'production', featured: true }],
  ['Lesson Studio', { status: 'production', featured: true }],
  ['Campaigns', { status: 'production', featured: true }],
  ['Deck', { status: 'personal', featured: true }],
  ['DFL Payments', { status: 'production', featured: true }],
  ['AltPay', { status: 'hackathon', featured: true }],
  ['GreenLoop', { status: 'hackathon' }],
  ['TalentDAO', { status: 'hackathon' }],
  ['Valdez', { status: 'personal' }],
  ['DFL Learn', { status: 'production' }],
  ['Review Requests', { status: 'production' }],
  ['Skill Evals', { status: 'production' }],
  ['DFL-Bot Reviewer', { status: 'production' }],
  ['TradeView', { status: 'personal' }],
  ['CodeLibrary', { status: 'prototype' }],
];

const rank = (title: string) => {
  const i = PROJECT_META.findIndex(([t]) => t === title);
  return i === -1 ? PROJECT_META.length : i;
};

const metaFor = (title: string) => PROJECT_META.find(([t]) => t === title)?.[1] ?? {};

/** Every project in display order, with its status and featured flag. */
export const projectCatalog: ProjectSeed[] = [...seeds]
  .sort((a, b) => rank(a.title) - rank(b.title))
  .map((project) => ({ ...project, ...metaFor(project.title) }));
