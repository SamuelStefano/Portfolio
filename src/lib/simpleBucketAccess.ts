import { supabase } from './supabaseclient';
import { normalizeSectionKey } from './sectionMetadata';

export const getProjectImagesFromBucket = async (
  projectTitle: string
): Promise<Record<string, string[]>> => {
  if (!supabase) return {};

  try {
    const knownBuckets = [
      'challenge-images',
      'Codelibrary-website', 'codelibrary-website',
      'Devfellowship', 'devfellowship',
      'Portfolio-bucket'
    ];

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

export const discoverProjectsFromBuckets = async (): Promise<Array<{
  bucket: string;
  storage_path: string;
  title: string;
  image_categories: Record<string, string[]>;
  thumbnail_url?: string;
}>> => {
  if (!supabase) return [];

  const config: Record<string, { mode: 'multi' | 'single'; roots?: string[]; projectPaths?: string[] }> = {
    'challenge-images': { mode: 'multi', roots: ['challenges'] },
    'Codelibrary-website': { mode: 'single', projectPaths: ['codelibrary', 'Codelibrary', 'codelibrary images', 'Codelibrary images'] },
    'Devfellowship': { mode: 'single', projectPaths: ['Devfellowship', 'devfellowship', 'DevFellowship', 'Devfellowship/Devfellowship'] }
  };

  const results: Array<{ bucket: string; storage_path: string; title: string; image_categories: Record<string, string[]>; thumbnail_url?: string; }> = [];

  const preferredTitles: Record<string, string> = {
    'Codelibrary-website': 'CodeLibrary',
    'Devfellowship': 'DevFellowship'
  };

  for (const [bucketName, cfg] of Object.entries(config)) {
    if (cfg.mode === 'single') {
      for (const projectPath of cfg.projectPaths || []) {
        let title = preferredTitles[bucketName] || (projectPath.split('/').pop() || projectPath);

        const { data: sections, error } = await supabase.storage
          .from(bucketName)
          .list(projectPath, { limit: 200 });

        if (error || !sections) {
          continue;
        }

        const imageCategories: Record<string, string[]> = {};
        for (const section of sections) {
          if (section.name.includes('.')) continue;
          const sectionPath = `${projectPath}/${section.name}`;
          const { data: files, error: filesError } = await supabase.storage
            .from(bucketName)
            .list(sectionPath, { limit: 500 });

          if (filesError || !files) {
            continue;
          }

          const imgs = files.filter(f => ['jpg','jpeg','png','gif','webp','svg'].includes((f.name.split('.').pop() || '').toLowerCase()));
          if (imgs.length === 0) {
            continue;
          }
          const key = normalizeSectionKey(section.name);
          const imageUrls = imgs.map(f => {
            const url = supabase.storage.from(bucketName).getPublicUrl(`${sectionPath}/${f.name}`).data.publicUrl;
            return url;
          });
          imageCategories[key] = imageUrls;
        }

        let thumbnail_url: string | undefined;
        const thumb = imageCategories['thumb'] || imageCategories['thumbnail'];
        if (thumb?.length) thumbnail_url = thumb[0];
        else {
          const first = Object.values(imageCategories)[0];
          if (first?.length) thumbnail_url = first[0];
        }

        if (Object.keys(imageCategories).length > 0) {
          results.push({ bucket: bucketName, storage_path: projectPath, title, image_categories: imageCategories, thumbnail_url });
          break;
        }
      }
    } else {
      for (const root of cfg.roots || []) {
        const { data: projectFolders } = await supabase.storage
          .from(bucketName)
          .list(root, { limit: 200 });
        if (!projectFolders) {
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

