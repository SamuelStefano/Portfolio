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
import { ImageCarousel } from '@/components/molecules/ImageCarousel';

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
  const [imageModalOpen, setImageModalOpen] = React.useState(false);
  const [modalImageUrl, setModalImageUrl] = React.useState('');

  // Bloqueia scroll da página principal
  useEffect(() => {
    if (isOpen) {
      // Bloqueia scroll do body
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      
      // Previne scroll apenas fora do overlay
      const preventScroll = (e: Event) => {
        const target = e.target as Element;
        const overlayContent = document.querySelector('[data-overlay-content]');
        
        // Permite scroll se estiver dentro do overlay
        if (overlayContent && overlayContent.contains(target)) {
          return;
        }
        
        // Previne scroll fora do overlay
        e.preventDefault();
        e.stopPropagation();
        return false;
      };
      
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
      
      return () => {
        document.body.style.overflow = "unset";
        document.body.style.position = "unset";
        document.body.style.width = "unset";
        document.removeEventListener('wheel', preventScroll);
        document.removeEventListener('touchmove', preventScroll);
      };
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
    }
  }, [isOpen]);

  // Fecha overlay com ESC (mas prioriza fechar modal de imagem se estiver aberto)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        // Se modal de imagem estiver aberto, fecha apenas ele
        if (imageModalOpen) {
          setImageModalOpen(false);
        } else {
          // Senão, fecha o overlay
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, imageModalOpen, onClose]);

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

    // Adicionar seções baseadas nas image_categories (filtrar thumbnail)
    if (project.image_categories && Object.keys(project.image_categories).length > 0) {
      Object.keys(project.image_categories)
        .filter(category => !['thumb', 'thumbnail'].includes(category.toLowerCase())) // Filtrar thumbnails
        .forEach(category => {
        // Mapear nomes das pastas para nomes mais bonitos
        const displayNames: Record<string, string> = {
          'admin': 'Painel Administrativo',
          'challenge': 'Desafios',
          'create': 'Criação',
          'dashboard': 'Dashboard',
          'login': 'Autenticação',
          'others': 'Outros'
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
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-background rounded-2xl border border-border shadow-2xl w-full max-w-[90%] h-[95%] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Fixo */}
          <div className="sticky top-0 z-50 flex-shrink-0 p-6 border-b border-border bg-background shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center">
                <Heading level={2} className="text-2xl font-bold gradient-text">
                  Projeto: {project.title}
                </Heading>
                <Text variant="small" className="text-muted-foreground">
                  {project.role}
                </Text>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="hover:bg-destructive/10 hover:text-destructive absolute right-6"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Conteúdo scrollável */}
          <div className="flex-1 overflow-y-auto" data-overlay-content>
            <div className="p-6">
            {/* Tabs = Seções */}
            <Tabs defaultValue={sections[0]?.id || "overview"} className="w-full">
              <TabsList className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border pb-4 mb-6 flex flex-wrap gap-2">
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
                    <div className="w-full">
                      <div 
                        className="relative rounded-xl overflow-hidden bg-card border border-border cursor-pointer hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] group"
                        onClick={() => {
                          setModalImageUrl(project.thumbnail_url!);
                          setImageModalOpen(true);
                        }}
                      >
                        <img 
                          src={project.thumbnail_url} 
                          alt={project.title}
                          className="w-full object-contain"
                          // 🖼️ TAMANHO IMAGEM VISÃO GERAL: w-full h-[50vh] (100% width, 50% viewport height)
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Heading level={3} className="text-xl">Descrição</Heading>
                  <Text className="text-muted-foreground">
                    {project.long_description || project.description}
                  </Text>

                  {/* Tecnologias mantidas apenas na Visão Geral (já está aqui) */}
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
        {project.image_categories && Object.entries(project.image_categories)
          .filter(([category]) => !['thumb', 'thumbnail'].includes(category.toLowerCase())) // Filtrar thumbnails
          .map(([category, images]) => {
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
                <div className="text-center mb-8 px-3">
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

                {/* Carrossel por seção (maior, com autoplay) */}
                {images && images.length > 0 && (
                  <div className="space-y-6">
                    <ImageCarousel 
                      images={images} 
                      title={displayName}
                      onImageClick={(imageUrl) => {
                        console.log('📸 Callback recebido no ProjectOverlay:', imageUrl);
                        setModalImageUrl(imageUrl);
                        setImageModalOpen(true);
                      }}
                    />
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
          </div>
        </motion.div>

        {/* Modal de Imagem */}
        <AnimatePresence>
          {imageModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
              onClick={() => setImageModalOpen(false)}
            >
              <div
                className="relative max-w-[90%] max-h-[95%] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={modalImageUrl}
                  alt={project?.title || 'Imagem'}
                  className="w-full h-full object-contain rounded-lg"
                  loading="lazy"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setImageModalOpen(false)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};