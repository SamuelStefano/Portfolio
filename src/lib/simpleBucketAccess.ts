import { supabase } from './supabaseclient';
import { normalizeSectionKey } from './sectionMetadata';

// Busca categorias de imagens para um projeto específico (por título conhecido)
export const getProjectImagesFromBucket = async (
  projectTitle: string
): Promise<Record<string, string[]>> => {
  if (!supabase) return {};

  try {
    // Buckets candidatos (aceitar variações de case)
    const knownBuckets = [
      'challenge-images',
      'Codelibrary-website', 'codelibrary-website',
      'Devfellowship', 'devfellowship',
      'Portfolio-bucket'
    ];

    // Mapear caminhos prováveis por projeto
    // - challenge-images: projetos em challenges/<Projeto>
    // - codelibrary-website: projeto único em "codelibrary images"
    // - devfellowship: projeto único em "Devfellowship"
    const candidatePathsByBucket: Record<string, string[]> = {
      'challenge-images': [
        `challenges/${projectTitle}`,
        `${projectTitle}`,
      ],
      'Codelibrary-website': ['codelibrary images'],
      'codelibrary-website': ['codelibrary images'],
      'Devfellowship': ['Devfellowship'],
      'devfellowship': ['Devfellowship'],
      'Portfolio-bucket': []
    };

    for (const bucketName of knownBuckets) {
      const candidatePaths = candidatePathsByBucket[bucketName] || [];
      for (const basePath of candidatePaths) {
        // Listar subpastas (seções) dentro do caminho base
        const { data: sectionFolders, error } = await supabase.storage
          .from(bucketName)
          .list(basePath, { limit: 200 });
        if (error || !sectionFolders || sectionFolders.length === 0) continue;

        const imageCategories: Record<string, string[]> = {};

        for (const section of sectionFolders) {
          if (section.name.includes('.')) continue;
          const sectionPath = `${basePath}/${section.name}`;
          const { data: files } = await supabase.storage
            .from(bucketName)
            .list(sectionPath, { limit: 500 });
          if (!files) continue;

          const imageFiles = files.filter(f => {
            const ext = f.name.toLowerCase().split('.').pop();
            return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '');
          });
          if (imageFiles.length === 0) continue;

          const urls = imageFiles.map(f => supabase.storage
            .from(bucketName)
            .getPublicUrl(`${sectionPath}/${f.name}`).data.publicUrl);

          imageCategories[section.name.toLowerCase()] = urls;
        }

        if (Object.keys(imageCategories).length > 0) {
          return imageCategories;
        }
      }
    }

    return {};
  } catch (e) {
    console.error('❌ Erro ao acessar storage:', e);
    return {};
  }
};

// Descobre projetos automaticamente em múltiplos buckets e monta imagem/thumbnail
export const discoverProjectsFromBuckets = async (): Promise<Array<{
  bucket: string;
  storage_path: string;
  title: string;
  image_categories: Record<string, string[]>;
  thumbnail_url?: string;
}>> => {
  if (!supabase) return [];

  // Configuração por bucket (paths limpos e consistentes)
  const config: Record<string, { mode: 'multi' | 'single'; roots?: string[]; projectPaths?: string[] }> = {
    'challenge-images': { mode: 'multi', roots: ['challenges'] },
    // IDs exatos conforme painel: Codelibrary-website, Devfellowship
    'Codelibrary-website': { mode: 'single', projectPaths: ['codelibrary', 'Codelibrary', 'codelibrary images', 'Codelibrary images'] },
    'Devfellowship': { mode: 'single', projectPaths: ['devfellowship', 'DevFellowship', 'Devfellowship'] }
  };

  const results: Array<{ bucket: string; storage_path: string; title: string; image_categories: Record<string, string[]>; thumbnail_url?: string; }> = [];

  // Títulos preferidos quando o bucket é "single"
  const preferredTitles: Record<string, string> = {
    'Codelibrary-website': 'CodeLibrary',
    'Devfellowship': 'DevFellowship'
  };

  for (const [bucketName, cfg] of Object.entries(config)) {
    if (cfg.mode === 'single') {
      for (const projectPath of cfg.projectPaths || []) {
        // O título do projeto será o último segmento do caminho
        let title = preferredTitles[bucketName] || (projectPath.split('/').pop() || projectPath);

        // Listar seções
        const { data: sections } = await supabase.storage
          .from(bucketName)
          .list(projectPath, { limit: 200 });
        if (!sections) {
          console.log(`⚠️ Nenhuma seção em ${bucketName}/${projectPath}`);
          continue;
        }

        const imageCategories: Record<string, string[]> = {};
        for (const section of sections) {
          if (section.name.includes('.')) continue;
          const sectionPath = `${projectPath}/${section.name}`;
          const { data: files } = await supabase.storage
            .from(bucketName)
            .list(sectionPath, { limit: 500 });
          if (!files) {
            console.log(`⚠️ Sem arquivos em seção ${bucketName}/${sectionPath}`);
            continue;
          }
          const imgs = files.filter(f => ['jpg','jpeg','png','gif','webp','svg'].includes((f.name.split('.').pop() || '').toLowerCase()));
          if (imgs.length === 0) continue;
          const key = normalizeSectionKey(section.name);
          imageCategories[key] = imgs.map(f => supabase.storage.from(bucketName).getPublicUrl(`${sectionPath}/${f.name}`).data.publicUrl);
        }

        // Thumbnail
        let thumbnail_url: string | undefined;
        const thumb = imageCategories['thumb'] || imageCategories['thumbnail'];
        if (thumb?.length) thumbnail_url = thumb[0];
        else {
          const first = Object.values(imageCategories)[0];
          if (first?.length) thumbnail_url = first[0];
        }

        // Só considerar o primeiro caminho que realmente possui imagens
        if (Object.keys(imageCategories).length > 0) {
          results.push({ bucket: bucketName, storage_path: projectPath, title, image_categories: imageCategories, thumbnail_url });
          break; // parar após o primeiro válido para este bucket
        }
      }
    } else {
      // multi: cada pasta dentro do root é um projeto
      for (const root of cfg.roots || []) {
        const { data: projectFolders } = await supabase.storage
          .from(bucketName)
          .list(root, { limit: 200 });
        if (!projectFolders) {
          console.log(`⚠️ Nenhuma pasta de projeto em ${bucketName}/${root}`);
          continue;
        }

        for (const folder of projectFolders) {
          if (folder.name.includes('.')) continue;
          const projectPath = `${root}/${folder.name}`;
          const title = folder.name;

          const { data: sections } = await supabase.storage
            .from(bucketName)
            .list(projectPath, { limit: 200 });
          if (!sections) {
            console.log(`⚠️ Nenhuma seção em ${bucketName}/${projectPath}`);
            continue;
          }

          const imageCategories: Record<string, string[]> = {};
          for (const section of sections) {
            if (section.name.includes('.')) continue;
            const sectionPath = `${projectPath}/${section.name}`;
            const { data: files } = await supabase.storage
              .from(bucketName)
              .list(sectionPath, { limit: 500 });
            if (!files) {
              console.log(`⚠️ Sem arquivos em seção ${bucketName}/${sectionPath}`);
              continue;
            }
            const imgs = files.filter(f => ['jpg','jpeg','png','gif','webp','svg'].includes((f.name.split('.').pop() || '').toLowerCase()));
            if (imgs.length === 0) continue;
            const key = normalizeSectionKey(section.name);
            imageCategories[key] = imgs.map(f => supabase.storage.from(bucketName).getPublicUrl(`${sectionPath}/${f.name}`).data.publicUrl);
          }

          let thumbnail_url: string | undefined;
          const thumb = imageCategories['thumb'] || imageCategories['thumbnail'];
          if (thumb?.length) thumbnail_url = thumb[0];
          else {
            const first = Object.values(imageCategories)[0];
            if (first?.length) thumbnail_url = first[0];
          }

          results.push({ bucket: bucketName, storage_path: projectPath, title, image_categories: imageCategories, thumbnail_url });
        }
      }
    }
  }

  return results;
};

