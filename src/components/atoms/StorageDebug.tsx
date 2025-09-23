import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseclient';
import { discoverProjectsFromBuckets } from '@/lib/simpleBucketAccess';

interface DiscoveredProject {
  bucket: string;
  storage_path: string;
  title: string;
  image_categories: Record<string, string[]>;
  thumbnail_url?: string;
}

export const StorageDebug: React.FC = () => {
  const [buckets, setBuckets] = useState<string[]>([]);
  const [projects, setProjects] = useState<DiscoveredProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🧪 StorageDebug: iniciando testes de descoberta...');

      const known = ['challenge-images', 'codelibrary-website', 'devfellowship'];
      setBuckets(known);
      console.log('🪣 Buckets conhecidos:', known);

      const discovered = await discoverProjectsFromBuckets();
      setProjects(discovered);
      console.log('🧭 Projetos descobertos:', discovered);

      for (const p of discovered) {
        const sectionNames = Object.keys(p.image_categories || {});
        console.log(`📂 Projeto ${p.title} (${p.bucket}) → ${sectionNames.length} seções:`, sectionNames);
        for (const [section, imgs] of Object.entries(p.image_categories || {})) {
          console.log(`   └─ 🖼️ ${section}: ${imgs.length} imagens`);
        }
      }
    } catch (e: any) {
      console.error('❌ StorageDebug erro:', e);
      setError(e?.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <div className="p-4 border border-border rounded-lg bg-card text-sm">
      <div className="flex items-center justify-between mb-2">
        <strong>Storage Debug</strong>
        <button onClick={run} className="px-2 py-1 text-xs rounded bg-primary text-primary-foreground">Recarregar</button>
      </div>
      {loading && <div>Carregando…</div>}
      {error && <div className="text-destructive">Erro: {error}</div>}

      <div className="mt-2">
        <div className="font-semibold">Buckets:</div>
        <div>{buckets.join(', ')}</div>
      </div>

      <div className="mt-3">
        <div className="font-semibold">Projetos descobertos ({projects.length}):</div>
        <ul className="list-disc pl-5">
          {projects.map((p, i) => (
            <li key={i}>
              <div className="font-medium">{p.title} <span className="opacity-60">({p.bucket})</span></div>
              <div className="opacity-70">{p.storage_path}</div>
              <div>Seções: {Object.keys(p.image_categories || {}).join(', ') || '—'}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

