import { ProjectImageFolder } from '@/types/project';

const folderConfigMap: Record<string, {
  display_name: string;
  description: string;
  icon_name: string;
  order_index: number;
}> = {
  'admin': {
    display_name: 'Painel Administrativo',
    description: 'Interface de administração e controle do sistema',
    icon_name: 'Settings',
    order_index: 1
  },
  'dashboard': {
    display_name: 'Dashboard',
    description: 'Interface principal com métricas e visualizações',
    icon_name: 'BarChart3',
    order_index: 2
  },
  'create': {
    display_name: 'Criação',
    description: 'Processo de desenvolvimento e criação',
    icon_name: 'Code',
    order_index: 3
  },
  'login': {
    display_name: 'Autenticação',
    description: 'Sistema de login e autenticação',
    icon_name: 'Shield',
    order_index: 4
  },
  'mobile': {
    display_name: 'Versão Mobile',
    description: 'Interface otimizada para dispositivos móveis',
    icon_name: 'Smartphone',
    order_index: 5
  },
  'desktop': {
    display_name: 'Versão Desktop',
    description: 'Interface para computadores desktop',
    icon_name: 'Laptop',
    order_index: 6
  },
  'web': {
    display_name: 'Versão Web',
    description: 'Interface web responsiva',
    icon_name: 'Globe',
    order_index: 7
  },
  'backend': {
    display_name: 'Backend',
    description: 'Arquitetura e serviços do backend',
    icon_name: 'Server',
    order_index: 8
  },
  'database': {
    display_name: 'Banco de Dados',
    description: 'Estrutura e gestão de dados',
    icon_name: 'Database',
    order_index: 9
  },
  'api': {
    display_name: 'API',
    description: 'Documentação e endpoints da API',
    icon_name: 'Zap',
    order_index: 10
  },
  'deploy': {
    display_name: 'Deploy',
    description: 'Processo de deploy e infraestrutura',
    icon_name: 'Rocket',
    order_index: 11
  },
  'testing': {
    display_name: 'Testes',
    description: 'Estratégias e implementação de testes',
    icon_name: 'CheckCircle',
    order_index: 12
  },
  'security': {
    display_name: 'Segurança',
    description: 'Medidas de segurança e proteção',
    icon_name: 'Shield',
    order_index: 13
  },
  'performance': {
    display_name: 'Performance',
    description: 'Otimizações e métricas de performance',
    icon_name: 'Zap',
    order_index: 14
  },
  'ui': {
    display_name: 'Interface',
    description: 'Design e experiência do usuário',
    icon_name: 'Palette',
    order_index: 15
  },
  'ux': {
    display_name: 'Experiência',
    description: 'Fluxos e jornada do usuário',
    icon_name: 'Users',
    order_index: 16
  },
  'others': {
    display_name: 'Outros',
    description: 'Informações adicionais e detalhes',
    icon_name: 'Rocket',
    order_index: 99
  }
};

export function organizeImagesByFolders(
  projectImages: any[],
  bucketPath: string
): ProjectImageFolder[] {
  const folders: Record<string, ProjectImageFolder> = {};

  projectImages.forEach((image, index) => {
    const imageUrl = image.image_url || image.url;
    if (!imageUrl) return;

    const urlParts = imageUrl.split('/');
    const bucketIndex = urlParts.findIndex(part => part === bucketPath.split('/')[0]);

    if (bucketIndex === -1) return;

    const projectPathParts = bucketPath.split('/');
    let folderName = 'others';

    for (let i = bucketIndex + 1; i < urlParts.length - 1; i++) {
      const part = urlParts[i];
      if (projectPathParts.includes(part)) {
        continue;
      }
      folderName = part.toLowerCase().replace(/[^a-z0-9]/g, '');
      break;
    }

    const config = folderConfigMap[folderName] || {
      display_name: folderName.charAt(0).toUpperCase() + folderName.slice(1),
      description: `Imagens da seção ${folderName}`,
      icon_name: 'Code',
      order_index: 50
    };

    if (!folders[folderName]) {
      folders[folderName] = {
        folder_name: folderName,
        display_name: config.display_name,
        description: config.description,
        icon_name: config.icon_name,
        images: [],
        order_index: config.order_index
      };
    }

    folders[folderName].images.push({
      id: image.id || `img-${index}`,
      image_url: imageUrl,
      order_index: index,
      created_at: image.created_at || new Date().toISOString()
    });
  });

  return Object.values(folders).sort((a, b) => a.order_index - b.order_index);
}

export function generateSectionsFromFolders(imageFolders: ProjectImageFolder[]) {
  return imageFolders.map(folder => ({
    id: folder.folder_name,
    name: folder.display_name,
    description: folder.description,
    icon_name: folder.icon_name,
    content: [
      {
        type: 'images' as const,
        data: folder.images.map(img => img.image_url)
      }
    ],
    order_index: folder.order_index
  }));
}

export function getFolderIcon(folderName: string): string {
  const config = folderConfigMap[folderName.toLowerCase()];
  return config?.icon_name || 'Code';
}

export function getFolderDisplayName(folderName: string): string {
  const config = folderConfigMap[folderName.toLowerCase()];
  return config?.display_name || folderName.charAt(0).toUpperCase() + folderName.slice(1);
}
