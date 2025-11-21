import { supabase } from './supabaseclient';
import { ProjectImageFolder } from '@/types/project';
import { organizeImagesByFolders } from './organizeImagesByFolders';

export async function listFilesFromBucket(
  bucket: string,
  folderPath: string
): Promise<any[]> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folderPath, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      console.error("? Erro ao listar arquivos:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("? Erro ao acessar storage:", error);
    throw error;
  }
}

export async function listProjectFolders(
  bucket: string,
  projectPath: string
): Promise<string[]> {
  try {

    const { data, error } = await supabase.storage
      .from(bucket)
      .list(projectPath, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      console.error("? Erro ao listar pastas:", error);
      console.error("? Detalhes do erro:", error.message, error.statusCode);

      const { data: rootData, error: rootError } = await supabase.storage
        .from(bucket)
        .list('', { limit: 100 });

      if (rootError) {
        console.error("? Erro ao acessar raiz do bucket:", rootError);
        throw new Error(`Bucket '${bucket}' não acessível: ${rootError.message}`);
      }

      throw new Error(`Caminho '${projectPath}' não encontrado no bucket '${bucket}'`);
    }

    const folders = data?.filter(item => !item.name.includes('.')) || [];

    return folders.map(folder => folder.name);
  } catch (error) {
    console.error("? Erro ao acessar storage:", error);
    throw error;
  }
}

export async function getImagesFromFolder(
  bucket: string,
  folderPath: string
): Promise<string[]> {
  try {
    const files = await listFilesFromBucket(bucket, folderPath);

    const imageFiles = files.filter(file => {
      const extension = file.name.toLowerCase().split('.').pop();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '');
    });

    const imageUrls = imageFiles.map(file => {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(`${folderPath}/${file.name}`);
      return data.publicUrl;
    });

    return imageUrls;
  } catch (error) {
    console.error("? Erro ao buscar imagens:", error);
    return [];
  }
}

export async function organizeProjectImagesFromStorage(
  bucket: string,
  projectPath: string
): Promise<ProjectImageFolder[]> {
  try {
    const folders = await listProjectFolders(bucket, projectPath);

    const imageFolders: ProjectImageFolder[] = [];

    for (const folderName of folders) {
      const folderPath = `${projectPath}/${folderName}`;
      const imageUrls = await getImagesFromFolder(bucket, folderPath);

      if (imageUrls.length > 0) {
        const images = imageUrls.map((url, index) => ({
          id: `${folderName}-${index}`,
          image_url: url,
          order_index: index,
          created_at: new Date().toISOString()
        }));

        const folderConfig = getFolderConfig(folderName);

        imageFolders.push({
          folder_name: folderName.toLowerCase(),
          display_name: folderConfig.display_name,
          description: folderConfig.description,
          icon_name: folderConfig.icon_name,
          images: images,
          order_index: folderConfig.order_index
        });
      }
    }

    return imageFolders.sort((a, b) => a.order_index - b.order_index);
  } catch (error) {
    console.error("? Erro ao organizar imagens:", error);
    return [];
  }
}

function getFolderConfig(folderName: string) {
  const configs: Record<string, any> = {
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
    'others': {
      display_name: 'Outros',
      description: 'Informações adicionais e detalhes',
      icon_name: 'Rocket',
      order_index: 99
    }
  };

  const key = folderName.toLowerCase();
  return configs[key] || {
    display_name: folderName.charAt(0).toUpperCase() + folderName.slice(1),
    description: `Imagens da seção ${folderName}`,
    icon_name: 'Code',
    order_index: 50
  };
}



