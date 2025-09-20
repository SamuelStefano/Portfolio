import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

// 🔑 Configuração do Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // precisa ser service role!

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Variáveis de ambiente não encontradas!");
  console.error("Certifique-se de ter VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ⚙️ Configuração do projeto
const bucketName = "Portfolio";
const projectId = "e2e3e06c-db90-46a3-bd4c-7390cbd3d1e6"; // ID do projeto Skill Evals
const basePath = "challenges/Skill Evals"; // pasta base no bucket

// 📝 Descrições personalizadas para cada seção
const sectionDescriptions: Record<string, string> = {
  'admin': 'Interface administrativa completa com controle total do sistema, gerenciamento de usuários, configurações avançadas e monitoramento em tempo real.',
  'dashboard': 'Dashboard principal com métricas em tempo real, gráficos interativos, KPIs importantes e visualizações de dados para tomada de decisão.',
  'create': 'Processo de criação e desenvolvimento, mostrando as ferramentas utilizadas, metodologias aplicadas e fluxo de trabalho implementado.',
  'login': 'Sistema de autenticação seguro com múltiplos métodos de login, recuperação de senha e controle de acesso baseado em permissões.',
  'mobile': 'Versão mobile otimizada com design responsivo, gestos intuitivos e experiência adaptada para dispositivos móveis.',
  'desktop': 'Interface desktop com funcionalidades avançadas, atalhos de teclado e layout otimizado para produtividade em telas grandes.',
  'web': 'Versão web responsiva com compatibilidade cross-browser, performance otimizada e recursos web modernos.',
  'backend': 'Arquitetura backend robusta com APIs RESTful, microserviços, banco de dados e infraestrutura escalável.',
  'database': 'Estrutura de banco de dados otimizada com relacionamentos, índices, queries eficientes e backup automático.',
  'others': 'Funcionalidades adicionais, integrações especiais e recursos complementares que enriquecem a experiência do usuário.'
};

// 🎨 Nomes de exibição personalizados
const displayNames: Record<string, string> = {
  'admin': 'Painel Administrativo',
  'dashboard': 'Dashboard',
  'create': 'Desenvolvimento',
  'login': 'Autenticação',
  'mobile': 'Versão Mobile',
  'desktop': 'Versão Desktop',
  'web': 'Versão Web',
  'backend': 'Backend',
  'database': 'Banco de Dados',
  'others': 'Outros'
};

async function syncProject() {
  console.log("🚀 Iniciando sincronização do projeto...");
  console.log(`📁 Bucket: ${bucketName}`);
  console.log(`📂 Caminho: ${basePath}`);
  console.log(`🆔 Projeto ID: ${projectId}`);

  try {
    // 1. Verificar se o projeto existe
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id, title")
      .eq("id", projectId)
      .single();

    if (projectError || !project) {
      console.error("❌ Projeto não encontrado:", projectError);
      return;
    }

    console.log(`✅ Projeto encontrado: ${project.title}`);

    // 2. Listar pastas do projeto no bucket
    const { data: folders, error: listError } = await supabase.storage
      .from(bucketName)
      .list(basePath, { limit: 100 });

    if (listError) {
      console.error("❌ Erro ao listar pastas:", listError);
      return;
    }

    if (!folders || folders.length === 0) {
      console.log("⚠️ Nenhuma pasta encontrada no bucket.");
      return;
    }

    // Ordenar pastas alfabeticamente para ordem previsível
    const sortedFolders = [...folders].sort((a, b) => a.name.localeCompare(b.name));

    console.log(`📂 Encontradas ${sortedFolders.length} pastas:`);
    sortedFolders.forEach(folder => console.log(`  - ${folder.name}`));

    // 3. Processar cada pasta
    for (let index = 0; index < sortedFolders.length; index++) {
      const folder = sortedFolders[index];
      if (!folder.name) continue;

      const folderName = folder.name.toLowerCase();
      const displayName = displayNames[folderName] || folder.name;
      const description = sectionDescriptions[folderName] || `Seção ${displayName} do projeto`;

      console.log(`\n📂 Processando pasta: ${folder.name}`);

      // 4. Criar/atualizar seção no banco
      const { data: section, error: sectionError } = await supabase
        .from("project_sections")
        .upsert(
          {
            project_id: projectId,
            folder_name: folderName,
            display_name: displayName,
            description: description,
            order_index: index,
          },
          { 
            onConflict: "project_id,folder_name",
            ignoreDuplicates: false 
          }
        )
        .select()
        .single();

      if (sectionError) {
        console.error("❌ Erro ao criar/atualizar seção:", sectionError);
        continue;
      }

      console.log(`✅ Seção registrada: ${section.display_name}`);

      // 5. Limpar imagens antigas da seção
      const { error: deleteError } = await supabase
        .from("project_images")
        .delete()
        .eq("section_id", section.id);

      if (deleteError) {
        console.error("❌ Erro ao limpar imagens antigas:", deleteError);
        continue;
      }

      // 6. Listar imagens dentro da pasta
      const { data: files, error: fileError } = await supabase.storage
        .from(bucketName)
        .list(`${basePath}/${folder.name}`, { limit: 100 });

      if (fileError) {
        console.error("❌ Erro ao listar imagens:", fileError);
        continue;
      }

      if (!files || files.length === 0) {
        console.log("⚠️ Nenhuma imagem encontrada nessa pasta.");
        continue;
      }

      console.log(`🖼️ Encontradas ${files.length} imagens`);

      // 7. Inserir imagens vinculadas à seção
      const imageInserts = files.map((file, fileIndex) => {
        const publicUrl = supabase.storage
          .from(bucketName)
          .getPublicUrl(`${basePath}/${folder.name}/${file.name}`).data.publicUrl;

        return {
          project_id: projectId,
          section_id: section.id,
          image_url: publicUrl,
          order_index: fileIndex,
        };
      });

      const { error: imgError } = await supabase
        .from("project_images")
        .insert(imageInserts);

      if (imgError) {
        console.error("❌ Erro ao salvar imagens:", imgError);
        continue;
      }

      console.log(`✅ ${files.length} imagens salvas na seção ${section.display_name}`);
    }

    console.log("\n🎉 Sincronização concluída com sucesso!");
    console.log(`📊 Total de seções processadas: ${folders.length}`);

  } catch (error) {
    console.error("💥 Erro geral na sincronização:", error);
  }
}

// Executar sincronização
syncProject().catch((err) => {
  console.error("💥 Erro fatal:", err);
  process.exit(1);
});
