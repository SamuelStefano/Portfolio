import { supabase } from './supabaseclient';
import { ProjectImageFolder } from '@/types/project';
import { organizeImagesByFolders } from './organizeImagesByFolders';

/**
 * Lista arquivos de uma pasta específica no Supabase Storage
 * @param bucket Nome do bucket
 * @param folderPath Caminho da pasta
 * @returns Array de arquivos
 */
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
      console.error("❌ Erro ao listar arquivos:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("❌ Erro ao acessar storage:", error);
    throw error;
  }
}

/**
 * Lista todas as pastas de um projeto no bucket
 * @param bucket Nome do bucket
 * @param projectPath Caminho do projeto (ex: "challenges/Skill Evals")
 * @returns Array de pastas
 */
export async function listProjectFolders(
  bucket: string, 
  projectPath: string
): Promise<string[]> {
  try {
    console.log(`🔍 Tentando listar: ${bucket}/${projectPath}`);
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(projectPath, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      console.error("❌ Erro ao listar pastas:", error);
      console.error("❌ Detalhes do erro:", error.message, error.statusCode);
      
      // Tentar listar a raiz do bucket para verificar se existe
      const { data: rootData, error: rootError } = await supabase.storage
        .from(bucket)
        .list('', { limit: 100 });
        
      if (rootError) {
        console.error("❌ Erro ao acessar raiz do bucket:", rootError);
        throw new Error(`Bucket '${bucket}' não acessível: ${rootError.message}`);
      }
      
      console.log("📁 Conteúdo da raiz do bucket:", rootData?.map(item => item.name));
      throw new Error(`Caminho '${projectPath}' não encontrado no bucket '${bucket}'`);
    }

    console.log("📁 Dados retornados:", data);
    
    // Filtrar apenas pastas (não arquivos)
    const folders = data?.filter(item => !item.name.includes('.')) || [];
    console.log("📁 Pastas filtradas:", folders.map(f => f.name));
    
    return folders.map(folder => folder.name);
  } catch (error) {
    console.error("❌ Erro ao acessar storage:", error);
    throw error;
  }
}

/**
 * Busca imagens de uma pasta específica
 * @param bucket Nome do bucket
 * @param folderPath Caminho da pasta
 * @returns Array de URLs das imagens
 */
export async function getImagesFromFolder(
  bucket: string, 
  folderPath: string
): Promise<string[]> {
  try {
    const files = await listFilesFromBucket(bucket, folderPath);
    
    // Filtrar apenas imagens
    const imageFiles = files.filter(file => {
      const extension = file.name.toLowerCase().split('.').pop();
      return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '');
    });

    // Gerar URLs públicas
    const imageUrls = imageFiles.map(file => {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(`${folderPath}/${file.name}`);
      return data.publicUrl;
    });

    return imageUrls;
  } catch (error) {
    console.error("❌ Erro ao buscar imagens:", error);
    return [];
  }
}

/**
 * Organiza imagens de um projeto por pastas do Supabase Storage
 * @param bucket Nome do bucket
 * @param projectPath Caminho do projeto
 * @returns Array de pastas organizadas
 */
export async function organizeProjectImagesFromStorage(
  bucket: string, 
  projectPath: string
): Promise<ProjectImageFolder[]> {
  try {
    console.log(`🔍 Buscando pastas em: ${bucket}/${projectPath}`);
    
    // Listar todas as pastas do projeto
    const folders = await listProjectFolders(bucket, projectPath);
    console.log(`📁 Pastas encontradas:`, folders);
    
    const imageFolders: ProjectImageFolder[] = [];

    // Para cada pasta, buscar as imagens
    for (const folderName of folders) {
      const folderPath = `${projectPath}/${folderName}`;
      console.log(`🖼️ Buscando imagens em: ${folderPath}`);
      
      const imageUrls = await getImagesFromFolder(bucket, folderPath);
      console.log(`📸 Imagens encontradas em ${folderName}:`, imageUrls.length);
      
      if (imageUrls.length > 0) {
        // Mapear para o formato esperado
        const images = imageUrls.map((url, index) => ({
          id: `${folderName}-${index}`,
          image_url: url,
          order_index: index,
          created_at: new Date().toISOString()
        }));

        // Configuração da pasta baseada no nome
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

    console.log(`✅ Total de pastas com imagens:`, imageFolders.length);
    // Ordenar por order_index
    return imageFolders.sort((a, b) => a.order_index - b.order_index);
  } catch (error) {
    console.error("❌ Erro ao organizar imagens:", error);
    return [];
  }
}

/**
 * Configuração de pastas baseada no nome
 */
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
