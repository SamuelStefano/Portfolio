import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Users, 
  Calendar, 
  Info, 
  Image, 
  Folder,
  Settings,
  BarChart3,
  Code,
  Shield,
  Smartphone,
  Laptop,
  Globe,
  Server,
  Database
} from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/atoms/tabs';
import { Project } from '@/types/project';
import { getSectionMetadata } from '@/lib/sectionMetadata';
import { getIconComponent } from '@/utils/iconResolver';

interface ProjectOverlayProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mapeamento de ícones para seções dinâmicas
const sectionIconMap: Record<string, React.ComponentType<any>> = {
  'overview': Info,
  'admin': Settings,
  'dashboard': BarChart3,
  'create': Code,
  'login': Shield,
  'mobile': Smartphone,
  'desktop': Laptop,
  'web': Globe,
  'backend': Server,
  'database': Database,
  'others': Folder,
  'default': Folder
};

// Função para obter ícone da seção
const getSectionIcon = (name: string) => {
  const Icon = sectionIconMap[name.toLowerCase()] || sectionIconMap.default;
  return <Icon className="w-8 h-8 text-primary" />;
};

export const ProjectOverlay: React.FC<ProjectOverlayProps> = ({ project, isOpen, onClose }) => {
  // Bloqueia scroll da página principal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fecha overlay com ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  // Gerar seções dinâmicas baseadas nas image_categories do bucket
  const generateSections = () => {
    const sections = [
      {
        id: 'overview',
        name: 'Visão Geral',
        icon_name: 'overview',
        description: 'Informações gerais do projeto'
      }
    ];

    // Adicionar seções baseadas nas image_categories
    if (project.image_categories && Object.keys(project.image_categories).length > 0) {
      Object.keys(project.image_categories).forEach(category => {
        // Mapear nomes das pastas para nomes mais bonitos
        const displayNames: Record<string, string> = {
          'admin': 'Painel Administrativo',
          'challenge': 'Desafios',
          'create': 'Criação',
          'dashboard': 'Dashboard',
          'login': 'Autenticação',
          'others': 'Outros',
          'thumb': 'Thumbnail'
        };
        
        const displayName = displayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
        
        sections.push({
          id: category,
          name: displayName,
          icon_name: category,
          description: `Imagens da seção ${displayName}`
        });
      });
    }

    return sections;
  };

  const sections = generateSections();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
          className="bg-background rounded-2xl border border-border shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-background/95 backdrop-blur-sm">
            <div>
              <Heading level={2} className="text-2xl font-bold gradient-text">
                {project.title}
              </Heading>
              <Text variant="small" className="text-muted-foreground">
                {project.role}
              </Text>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Conteúdo scrollável */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Tabs = Seções */}
            <Tabs defaultValue={sections[0]?.id || "overview"} className="w-full">
              <TabsList className="flex flex-wrap gap-2 mb-6">
                {sections.map((section) => (
                  <TabsTrigger key={section.id} value={section.id}>
                    {section.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Seção Visão Geral */}
              <TabsContent value="overview">
                <div className="space-y-6">
                  {project.thumbnail_url && (
                    <div className="rounded-xl overflow-hidden h-64">
                      <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  <Heading level={3} className="text-xl">Descrição</Heading>
                  <Text className="text-muted-foreground">
                    {project.long_description || project.description}
                  </Text>

                  {/* Stack de Tecnologias */}
                  {project.stack && project.stack.length > 0 && (
                    <div className="space-y-4">
                      <Heading level={3} className="text-xl">Tecnologias</Heading>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Estatísticas rápidas */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="p-4 rounded-lg bg-card border border-border text-center">
                      <Text variant="small" className="font-semibold">
                        {project.stack?.length || 0} Tecnologias
                      </Text>
                    </div>
                    <div className="p-4 rounded-lg bg-card border border-border text-center">
                      <Users className="w-4 h-4 inline mr-1 text-primary" />
                      <Text variant="small">{project.project_collaborators?.length || 0} Colaboradores</Text>
                    </div>
                    <div className="p-4 rounded-lg bg-card border border-border text-center">
                      <ExternalLink className="w-4 h-4 inline mr-1 text-primary" />
                      <Text variant="small">{project.project_links?.length || 0} Links</Text>
                    </div>
                    <div className="p-4 rounded-lg bg-card border border-border text-center">
                      <Calendar className="w-4 h-4 inline mr-1 text-primary" />
                      <Text variant="small">{new Date(project.created_at).toLocaleDateString("pt-BR")}</Text>
                    </div>
                  </div>
                </div>
              </TabsContent>

        {/* Seções dinâmicas (baseadas nas image_categories do bucket) */}
        {project.image_categories && Object.entries(project.image_categories).map(([category, images]) => {
          const displayNames: Record<string, string> = {
            'admin': 'Painel Administrativo',
            'challenge': 'Desafios',
            'create': 'Criação',
            'dashboard': 'Dashboard',
            'login': 'Autenticação',
            'others': 'Outros',
            'thumb': 'Thumbnail'
          };
          
          const meta = getSectionMetadata(category);
          const displayName = meta.displayName;
          
          return (
            <TabsContent key={category} value={category}>
              <div className="space-y-6">
                {/* Header da Seção */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    {getSectionIcon(category)}
                  </div>
                  <Heading level={2} className="text-3xl font-bold gradient-text mb-2">
                    {displayName}
                  </Heading>
                  <Text variant="large" className="text-muted-foreground">
                    {meta.description}
                  </Text>
                </div>

                {/* Grid de Imagens */}
                {images && images.length > 0 && (
                  <div className="space-y-6">
                    <Heading level={3} className="text-2xl font-semibold text-center">
                      Galeria de Imagens ({images.length})
                    </Heading>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {images.map((imageUrl, index) => (
                        <div
                          key={index}
                          className="relative group cursor-pointer rounded-lg overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
                          onClick={() => {
                            const modal = document.createElement('div');
                            modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4';
                            modal.innerHTML = `
                              <div class="relative max-w-4xl max-h-[90vh] w-full">
                                <img src="${imageUrl}" alt="${displayName} ${index + 1}" class="w-full h-full object-contain rounded-lg" />
                                <button onclick="this.parentElement.parentElement.remove()" class="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors">
                                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                  </svg>
                                </button>
                              </div>
                            `;
                            document.body.appendChild(modal);
                            modal.onclick = (e) => {
                              if (e.target === modal) modal.remove();
                            };
                          }}
                        >
                          <img
                            src={imageUrl}
                            alt={`${displayName} ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detalhes da Seção */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <Heading level={3} className="text-xl font-semibold mb-4 flex items-center">
                    <Info className="w-5 h-5 text-primary mr-2" />
                    Detalhes da Seção
                  </Heading>
                  <Text className="text-muted-foreground leading-relaxed mb-4">
                    {meta.description}
                  </Text>
                  {/* Tecnologias */}
                  {meta.technologies && meta.technologies.length > 0 && (
                    <div className="mb-4">
                      <Heading level={4} className="text-lg font-semibold mb-2">Tecnologias</Heading>
                      <div className="flex flex-wrap gap-2">
                        {meta.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Image className="w-4 h-4" />
                      {images.length} imagens
                    </div>
                    <div className="flex items-center gap-1">
                      <Folder className="w-4 h-4" />
                      Pasta: {category}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          );
        })}
            </Tabs>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};