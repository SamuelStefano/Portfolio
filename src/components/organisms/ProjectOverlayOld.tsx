import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  Monitor,
  Smartphone,
  Database,
  Code,
  Palette,
  Rocket,
  Users,
  Calendar,
  ArrowRight,
  ChevronRight,
  Star,
  Zap,
  BarChart3,
  DollarSign,
  Settings,
  Shield,
  Globe,
  Smartphone as Mobile,
  Laptop,
  Server,
  Info,
  Image,
  Folder
} from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/atoms/tabs';
import { ImageCarousel } from '@/components/molecules/ImageCarousel';
import { Project, ProjectSection } from '@/types/project';
import { getIconComponent } from '@/utils/iconResolver';
import { organizeImagesByFolders, generateSectionsFromFolders, getFolderIcon } from '@/lib/organizeImagesByFolders';

interface ProjectOverlayProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const sectionIconMap: Record<string, React.ComponentType<any>> = {
  'overview': Monitor,
  'dashboard': BarChart3,
  'create': Code,
  'financeiro': DollarSign,
  'gestão': Settings,
  'segurança': Shield,
  'web': Globe,
  'mobile': Mobile,
  'desktop': Laptop,
  'backend': Server,
  'frontend': Palette,
  'database': Database,
  'others': Rocket,
  'default': Code
};

export const ProjectOverlay: React.FC<ProjectOverlayProps> = ({
  project,
  isOpen,
  onClose
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  const IconComponent = getIconComponent(project.icon_name);

  const generateSections = () => {
    const sections = [
      {
        id: 'overview',
        name: 'Visão Geral',
        icon_name: 'Monitor',
        description: 'Informações gerais do projeto'
      }
    ];

    if (project.project_sections && project.project_sections.length > 0) {
      project.project_sections
        .sort((a, b) => a.order_index - b.order_index)
        .forEach(section => {
          sections.push({
            id: section.id,
            name: section.name,
            icon_name: section.icon_name,
            description: section.description
          });
        });
    }
    else if (project.image_folders && project.image_folders.length > 0) {
      const folderSections = generateSectionsFromFolders(project.image_folders);
      sections.push(...folderSections);
    }
    else if (project.image_categories && Object.keys(project.image_categories).length > 0) {
      Object.entries(project.image_categories).forEach(([category, images], index) => {
        sections.push({
          id: category.toLowerCase(),
          name: category === 'thumb' ? 'Thumbnail' : category,
          icon_name: getFolderIcon(category) as any,
          description: `Imagens da seção ${category}`
        });
      });
    }
    else {
      const defaultSections = [
        { id: 'dashboard', name: 'Dashboard', icon_name: 'BarChart3', description: 'Interface e visualizações' },
        { id: 'create', name: 'Desenvolvimento', icon_name: 'Code', description: 'Processo de criação' },
        { id: 'others', name: 'Detalhes', icon_name: 'Rocket', description: 'Informações adicionais' }
      ];
      sections.push(...defaultSections);
    }

    return sections;
  };

  const sections = generateSections();

  const renderOverview = () => (
    <div className="space-y-8">
      {}
      <div className="relative">
        {project.thumbnail_url ? (
          <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <IconComponent className="w-24 h-24 text-primary/80" />
            </div>
          </div>
        ) : (
          <div className="h-64 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-6">
            <IconComponent className="w-32 h-32 text-primary" />
          </div>
        )}

        <div className="text-center">
          <Heading level={1} className="text-4xl font-bold gradient-text mb-4">
            {project.title}
          </Heading>
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-lg px-4 py-2">
            {project.role}
          </Badge>
        </div>
      </div>

      {}
      <div className="text-center max-w-3xl mx-auto">
        <Text variant="large" className="text-muted-foreground leading-relaxed">
          {project.long_description || project.description}
        </Text>
      </div>

      {}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 rounded-xl bg-card border border-border">
          <Code className="w-8 h-8 text-primary mx-auto mb-2" />
          <Text variant="small" className="font-semibold">{project.stack.length} {t('projectStats.technologies')}</Text>
        </div>
        <div className="text-center p-4 rounded-xl bg-card border border-border">
          <Users className="w-8 h-8 text-primary mx-auto mb-2" />
          <Text variant="small" className="font-semibold">{project.project_collaborators.length} {t('projectStats.collaborators')}</Text>
        </div>
        <div className="text-center p-4 rounded-xl bg-card border border-border">
          <ExternalLink className="w-8 h-8 text-primary mx-auto mb-2" />
          <Text variant="small" className="font-semibold">{project.project_links.length} {t('projectStats.links')}</Text>
        </div>
        <div className="text-center p-4 rounded-xl bg-card border border-border">
          <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
          <Text variant="small" className="font-semibold">
            {new Date(project.created_at).toLocaleDateString('pt-BR')}
          </Text>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <BarChart3 className="w-8 h-8 text-primary" />
        </div>
        <Heading level={2} className="text-3xl font-bold gradient-text mb-2">
          Dashboard & Analytics
        </Heading>
        <Text variant="large" className="text-muted-foreground">
          Interface de controle e visualização de dados
        </Text>
      </div>

      {}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center mb-4">
            <Monitor className="w-6 h-6 text-primary mr-3" />
            <Heading level={3} className="text-xl">Interface Principal</Heading>
          </div>
          <Text className="text-muted-foreground mb-4">
            Dashboard responsivo com visualizações interativas e métricas em tempo real.
          </Text>
          <div className="flex flex-wrap gap-2">
            {project.stack.filter(tech =>
              ['React', 'TypeScript', 'Chart.js', 'D3.js', 'Tailwind CSS'].includes(tech)
            ).map(tech => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center mb-4">
            <Database className="w-6 h-6 text-primary mr-3" />
            <Heading level={3} className="text-xl">Gestão de Dados</Heading>
          </div>
          <Text className="text-muted-foreground mb-4">
            Sistema robusto para coleta, processamento e armazenamento de informações.
          </Text>
          <div className="flex flex-wrap gap-2">
            {project.stack.filter(tech =>
              ['PostgreSQL', 'Supabase', 'Prisma', 'Redis', 'MongoDB'].includes(tech)
            ).map(tech => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
        <Heading level={3} className="text-xl font-semibold mb-4 flex items-center">
          <Zap className="w-5 h-5 text-primary mr-2" />
          Stack Tecnológica - Dashboard
        </Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {project.stack.map(tech => (
            <div key={tech} className="flex items-center p-3 rounded-lg bg-background/50 border border-border/50">
              <div className="w-2 h-2 rounded-full bg-primary mr-3" />
              <Text variant="small" className="font-medium">{tech}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCreate = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Code className="w-8 h-8 text-primary" />
        </div>
        <Heading level={2} className="text-3xl font-bold gradient-text mb-2">
          Criação & Desenvolvimento
        </Heading>
        <Text variant="large" className="text-muted-foreground">
          Processo de desenvolvimento e ferramentas utilizadas
        </Text>
      </div>

      {}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-card border border-border text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-primary font-bold text-lg">1</span>
          </div>
          <Heading level={3} className="text-lg mb-2">Planejamento</Heading>
          <Text className="text-muted-foreground text-sm">
            Análise de requisitos e arquitetura do sistema
          </Text>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-primary font-bold text-lg">2</span>
          </div>
          <Heading level={3} className="text-lg mb-2">Desenvolvimento</Heading>
          <Text className="text-muted-foreground text-sm">
            Implementação usando as melhores práticas
          </Text>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-primary font-bold text-lg">3</span>
          </div>
          <Heading level={3} className="text-lg mb-2">Deploy</Heading>
          <Text className="text-muted-foreground text-sm">
            Testes, otimização e publicação
          </Text>
        </div>
      </div>

      {}
      <div className="space-y-6">
        <Heading level={3} className="text-2xl font-semibold text-center">
          Ferramentas & Tecnologias
        </Heading>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-card border border-border">
            <Heading level={4} className="text-lg font-semibold mb-4 flex items-center">
              <Palette className="w-5 h-5 text-primary mr-2" />
              Frontend
            </Heading>
            <div className="space-y-2">
              {project.stack.filter(tech =>
                ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vite', 'Framer Motion'].includes(tech)
              ).map(tech => (
                <div key={tech} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                  <Text variant="small">{tech}</Text>
                  <Star className="w-4 h-4 text-yellow-500" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <Heading level={4} className="text-lg font-semibold mb-4 flex items-center">
              <Database className="w-5 h-5 text-primary mr-2" />
              Backend
            </Heading>
            <div className="space-y-2">
              {project.stack.filter(tech =>
                ['Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Prisma', 'Redis'].includes(tech)
              ).map(tech => (
                <div key={tech} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                  <Text variant="small">{tech}</Text>
                  <Star className="w-4 h-4 text-yellow-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOthers = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Rocket className="w-8 h-8 text-primary" />
        </div>
        <Heading level={2} className="text-3xl font-bold gradient-text mb-2">
          Outros Detalhes
        </Heading>
        <Text variant="large" className="text-muted-foreground">
          Informações adicionais e características especiais
        </Text>
      </div>

      {}
      {project.project_collaborators.length > 0 && (
        <div className="p-6 rounded-xl bg-card border border-border">
          <Heading level={3} className="text-xl font-semibold mb-4 flex items-center">
            <Users className="w-5 h-5 text-primary mr-2" />
            Colaboradores
          </Heading>
          <div className="grid md:grid-cols-2 gap-4">
            {project.project_collaborators.map(collaborator => (
              <div key={collaborator.id} className="flex items-center p-3 rounded-lg bg-background/50 border border-border/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <Text variant="small" className="font-semibold">{collaborator.name}</Text>
                  <Text variant="small" className="text-muted-foreground">{collaborator.role}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {}
      {project.project_links.length > 0 && (
        <div className="p-6 rounded-xl bg-card border border-border">
          <Heading level={3} className="text-xl font-semibold mb-4 flex items-center">
            <ExternalLink className="w-5 h-5 text-primary mr-2" />
            Links do Projeto
          </Heading>
          <div className="grid md:grid-cols-2 gap-4">
            {project.project_links.map(link => (
              <Button
                key={link.id}
                asChild
                variant="outline"
                className="justify-start hover-glow"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {link.label}
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      )}

      {}
      {project.project_images.length > 0 && (
        <div className="p-6 rounded-xl bg-card border border-border">
          <Heading level={3} className="text-xl font-semibold mb-4 flex items-center">
            <Smartphone className="w-5 h-5 text-primary mr-2" />
            Galeria de Imagens
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.project_images.map(image => (
              <div key={image.id} className="relative group cursor-pointer">
                <img
                  src={image.image_url}
                  alt={`${project.title} - Imagem ${image.order_index}`}
                  className="w-full h-32 object-cover rounded-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderSectionContent = (sectionId: string) => {
    if (sectionId === 'overview') {
      return renderOverview();
    }

    const currentSection = sections.find(section => section.id === sectionId);
    if (!currentSection) {
      return renderOverview();
    }

    if (project.project_sections && project.project_sections.length > 0) {
      const projectSection = project.project_sections.find(s => s.id === sectionId);
      if (projectSection) {
        return renderDynamicSection(projectSection);
      }
    }

    if (project.image_folders && project.image_folders.length > 0) {
      const imageFolder = project.image_folders.find(f => f.folder_name === sectionId);
      if (imageFolder) {
        return renderImageFolderSection(imageFolder);
      }
    }

    if (project.image_categories && Object.keys(project.image_categories).length > 0) {
      const categoryImages = project.image_categories[sectionId];
      if (categoryImages) {
        return renderImageCategorySection(sectionId, categoryImages);
      }
    }

    switch (sectionId) {
      case 'dashboard':
        return renderDashboard();
      case 'create':
        return renderCreate();
      case 'others':
        return renderOthers();
      default:
        return renderOverview();
    }
  };

  const renderDynamicSection = (section: ProjectSection) => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          {React.createElement(sectionIconMap[section.icon_name] || sectionIconMap.default, {
            className: "w-8 h-8 text-primary"
          })}
        </div>
        <Heading level={2} className="text-3xl font-bold gradient-text mb-2">
          {section.name}
        </Heading>
        <Text variant="large" className="text-muted-foreground">
          {section.description}
        </Text>
      </div>

      <div className="space-y-6">
        {section.content.map((content, index) => (
          <div key={index} className="p-6 rounded-xl bg-card border border-border">
            {content.type === 'text' && (
              <div>
                <Text className="text-muted-foreground leading-relaxed">
                  {content.data}
                </Text>
              </div>
            )}

            {content.type === 'images' && (
              <div className="space-y-4">
                <Heading level={3} className="text-xl font-semibold mb-4">
                  Galeria de Imagens
                </Heading>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {content.data.map((image: string, imgIndex: number) => (
                    <div key={imgIndex} className="relative group cursor-pointer">
                      <img
                        src={image}
                        alt={`${section.name} - Imagem ${imgIndex + 1}`}
                        className="w-full h-32 object-cover rounded-lg transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <ExternalLink className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.type === 'tech_stack' && (
              <div className="space-y-4">
                <Heading level={3} className="text-xl font-semibold mb-4">
                  Stack Tecnológica
                </Heading>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {content.data.map((tech: string, techIndex: number) => (
                    <div key={techIndex} className="flex items-center p-3 rounded-lg bg-background/50 border border-border/50">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3" />
                      <Text variant="small" className="font-medium">{tech}</Text>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.type === 'links' && (
              <div className="space-y-4">
                <Heading level={3} className="text-xl font-semibold mb-4">
                  Links Relacionados
                </Heading>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.data.map((link: any, linkIndex: number) => (
                    <Button
                      key={linkIndex}
                      asChild
                      variant="outline"
                      className="justify-start hover-glow"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {link.label}
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {content.type === 'collaborators' && (
              <div className="space-y-4">
                <Heading level={3} className="text-xl font-semibold mb-4">
                  Colaboradores
                </Heading>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.data.map((collaborator: any, collabIndex: number) => (
                    <div key={collabIndex} className="flex items-center p-3 rounded-lg bg-background/50 border border-border/50">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <Text variant="small" className="font-semibold">{collaborator.name}</Text>
                        <Text variant="small" className="text-muted-foreground">{collaborator.role}</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderImageFolderSection = (folder: any) => {
    const imageUrls = folder.images?.map((img: any) => img.image_url) || [];

    const sectionDescriptions: Record<string, string> = t('projects.sectionDescriptions', { returnObjects: true });

    const customDescription = sectionDescriptions[folder.folder_name] || folder.description;

    return (
      <div className="space-y-8">
        {}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            {React.createElement(sectionIconMap[folder.icon_name] || sectionIconMap.default, {
              className: "w-8 h-8 text-primary"
            })}
          </div>
          <Heading level={2} className="text-3xl font-bold gradient-text mb-2">
            {folder.display_name}
          </Heading>
          <Text variant="large" className="text-muted-foreground">
            {customDescription}
          </Text>
        </div>

        {}
        {imageUrls.length > 0 && (
          <div className="space-y-6">
            <Heading level={3} className="text-2xl font-semibold text-center">
              Galeria de Imagens
            </Heading>
            <ImageCarousel
              images={imageUrls}
              title={folder.display_name}
              className="max-w-4xl mx-auto"
            />
          </div>
        )}

        {}
        <div className="p-6 rounded-xl bg-card border border-border">
          <Heading level={3} className="text-xl font-semibold mb-4 flex items-center">
            <Info className="w-5 h-5 text-primary mr-2" />
            Detalhes da Seção
          </Heading>
          <Text className="text-muted-foreground leading-relaxed mb-4">
            {customDescription}
          </Text>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Image className="w-4 h-4" />
              {imageUrls.length} imagens
            </div>
            <div className="flex items-center gap-1">
              <Folder className="w-4 h-4" />
              Pasta: {folder.folder_name}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderImageCategorySection = (category: string, images: string[]) => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          {React.createElement(sectionIconMap[getFolderIcon(category)] || sectionIconMap.default, {
            className: "w-8 h-8 text-primary"
          })}
        </div>
        <Heading level={2} className="text-3xl font-bold gradient-text mb-2">
          {category === 'thumb' ? 'Thumbnail' : category}
        </Heading>
        <Text variant="large" className="text-muted-foreground">
          Imagens da seção {category}
        </Text>
      </div>

      {}
      {images.length > 0 && (
        <div className="space-y-6">
          <Heading level={3} className="text-2xl font-semibold text-center">
            Galeria de Imagens
          </Heading>
          <ImageCarousel
            images={images}
            title={category === 'thumb' ? 'Thumbnail' : category}
            className="max-w-4xl mx-auto"
          />
        </div>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
            className="fixed inset-4 z-50 bg-background rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
          >
            {}
            <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <Heading level={1} className="text-2xl font-bold gradient-text">
                      {project.title}
                    </Heading>
                    <Text variant="small" className="text-muted-foreground">
                      {project.role}
                    </Text>
                  </div>
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

            </div>

            {}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  <Tabs defaultValue={sections[0]?.id} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mb-8">
                      {sections.map((section) => {
                        const Icon = sectionIconMap[section.icon_name] || sectionIconMap.default;
                        return (
                          <TabsTrigger
                            key={section.id}
                            value={section.id}
                            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                          >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{section.name}</span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>

                    {sections.map((section) => (
                      <TabsContent key={section.id} value={section.id} className="mt-0">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            {renderSectionContent(section.id)}
                          </motion.div>
                        </AnimatePresence>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
