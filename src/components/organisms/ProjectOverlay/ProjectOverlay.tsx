import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
  Database,
  Github,
  Link2
} from 'lucide-react';
import { Button } from '@/components/atoms/button/button';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/atoms/tabs/tabs';
import { Project } from '@/types/project';
import { getSectionMetadata } from '@/lib/sectionMetadata';
import { getIconComponent } from '@/utils/iconResolver';
import { ImageCarousel } from '@/components/molecules/ImageCarousel/ImageCarousel';

interface ProjectOverlayProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

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

const getSectionIcon = (name: string) => {
  const Icon = sectionIconMap[name.toLowerCase()] || sectionIconMap.default;
  return <Icon className="w-8 h-8 text-primary" />;
};

export const ProjectOverlay: React.FC<ProjectOverlayProps> = React.memo(({ project, isOpen, onClose }) => {
  const { t } = useTranslation();
  const [imageModalOpen, setImageModalOpen] = React.useState(false);
  const [modalImageUrl, setModalImageUrl] = React.useState('');

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.touchAction = "none";

      const preventScroll = (e: Event) => {
        const target = e.target as Element;
        const overlayContent = document.querySelector('[data-overlay-content]');

        if (overlayContent && overlayContent.contains(target)) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        return false;
      };

      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });

      return () => {
        document.body.style.overflow = "unset";
        document.body.style.position = "unset";
        document.body.style.top = "unset";
        document.body.style.width = "unset";
        document.body.style.touchAction = "unset";
        document.removeEventListener('wheel', preventScroll);
        document.removeEventListener('touchmove', preventScroll);
        
        window.scrollTo(0, scrollY);
      };
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.top = "unset";
      document.body.style.width = "unset";
      document.body.style.touchAction = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        if (imageModalOpen) {
          setImageModalOpen(false);
        } else {
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

  const generateSections = () => {
    const sections = [
      {
        id: 'overview',
        name: t('projects.overview'),
        icon_name: 'overview',
        description: t('projects.overview')
      }
    ];

    if (project.image_categories && Object.keys(project.image_categories).length > 0) {
      const filteredCategories = Object.keys(project.image_categories)
        .filter(category => !['hero'].includes(category.toLowerCase()));

      if (filteredCategories.length <= 1) {
        return sections;
      }

      filteredCategories.forEach(category => {
        const displayNames: Record<string, string> = {
          'admin': t('projectSections.admin'),
          'challenge': t('projectSections.challenge'),
          'create': t('projectSections.create'),
          'dashboard': t('projectSections.dashboard'),
          'login': t('projectSections.login'),
          'others': t('projectSections.others'),
          'community': t('projectSections.community'),
          'landing': t('projectSections.landing'),
          'library': t('projectSections.library'),
          'maindashboard': t('projectSections.mainDashboard'),
          'challengesystem': t('projectSections.challengeSystem')
        };

        const displayName = displayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);

        const sectionDescription = t(`projectSections.descriptions.${category}`) || `${t('projectSections.sectionImages')} ${displayName}`;
        
        sections.push({
          id: category,
          name: displayName,
          icon_name: category,
          description: sectionDescription
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
        transition={{ duration: 0.05 }}
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-background rounded-lg sm:rounded-xl md:rounded-2xl border border-border shadow-2xl w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] h-[95%] sm:h-[90%] md:h-[85%] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {}
          <div className="sticky top-0 z-50 flex-shrink-0 p-3 sm:p-4 md:p-6 border-b border-border bg-background shadow-sm ">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center pr-8 sm:pr-10">
                <Heading level={2} className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold gradient-text leading-tight">
                  {t('projectStats.project')}: {project.title}
                </Heading>
                <Text variant="small" className="text-muted-foreground text-xs sm:text-sm md:text-base mt-1">
                  {project.role}
                </Text>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="hover:bg-destructive/10 hover:text-destructive absolute right-3 sm:right-4 md:right-6 p-1 sm:p-2"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto" data-overlay-content>
            <div className="p-3 sm:p-4 md:p-6">
            <Tabs defaultValue={sections[0]?.id || "overview"} className="w-full">
              <TabsList className="sticky top-0 z-40 2xl:overflow-y-hidden xl:overflow-y-hidden bg-background/95 border-b border-border pb-2 sm:pb-3 md:pb-4 mb-4 sm:mb-5 md:mb-6 w-full justify-start overflow-x-auto scrollbar-none"
                style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.25rem' }}>
                {sections.map((section) => (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 sm:py-2 whitespace-nowrap flex-shrink-0"
                  >
                    {section.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  {(() => {
                    const filteredCategories = project.image_categories ?
                      Object.keys(project.image_categories).filter(category =>
                        !['hero'].includes(category.toLowerCase())
                      ) : [];

                    if (filteredCategories.length === 1) {
                      const categoryImages = project.image_categories![filteredCategories[0]];
                      return (
                        <div className="w-full">
                          <ImageCarousel
                            images={categoryImages}
                            title={project.title}
                            onImageClick={(imageUrl) => {
                              setModalImageUrl(imageUrl);
                              setImageModalOpen(true);
                            }}
                          />
                        </div>
                      );
                    }

                    return project.thumbnail_url && (
                      <div className="w-full">
                        <div
                          className="relative rounded-lg sm:rounded-xl overflow-hidden bg-card border border-border cursor-pointer hover:border-primary/50 transition-colors duration-200 group"
                          onClick={() => {
                            setModalImageUrl(project.thumbnail_url!);
                            setImageModalOpen(true);
                          }}
                        >
                          <img
                            src={project.thumbnail_url}
                            alt={project.title}
                            className="w-full h-40 sm:h-48 md:h-64 lg:h-80 xl:h-96 object-contain"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <Heading level={3} className="text-base sm:text-lg md:text-xl">Descrição</Heading>
                  <Text className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {project.long_description || project.description}
                  </Text>

                  {project.project_collaborators && project.project_collaborators.length > 0 && (
                    <div className="space-y-4">
                      <Heading level={3} className="text-base sm:text-lg md:text-xl">{t('projects.collaboratorsSection')}</Heading>
                      <div className="space-y-3">
                        {project.project_collaborators.map((collaborator, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                            <div className="relative">
                              {collaborator.avatar_url ? (
                                <img
                                  src={collaborator.avatar_url}
                                  alt={collaborator.name}
                                  className="w-10 h-10 rounded-full border-2 border-primary/30 object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full border-2 border-primary/30 bg-primary/20 flex items-center justify-center">
                                  <Users className="w-5 h-5 text-primary" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <Text className="font-medium">{collaborator.name}</Text>
                              <Text variant="small" className="text-muted-foreground">
                                {collaborator.role === 'Creator' ? t('projects.creator') : t('projects.collaborator')} {collaborator.name}
                              </Text>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.stack && project.stack.length > 0 && (
                    <div className="space-y-4">
                      <Heading level={3} className="text-base sm:text-lg md:text-xl">{t('projects.techStack')}</Heading>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.project_links && project.project_links.length > 0 && (
                    <div className="space-y-4">
                      <Heading level={3} className="text-base sm:text-lg md:text-xl flex items-center gap-2">
                        <Link2 className="w-5 h-5 text-primary" />
                        Links do Projeto
                      </Heading>
                      <div className="flex flex-wrap gap-3">
                        {project.project_links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm font-medium group"
                          >
                            {link.label.toLowerCase().includes('github') ? (
                              <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            ) : (
                              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            )}
                            <span>{link.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-4 border-t border-border text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <Text variant="small">{new Date(project.created_at).toLocaleDateString()}</Text>
                    </div>
                    {project.project_collaborators && project.project_collaborators.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <Text variant="small">{project.project_collaborators.length} {project.project_collaborators.length === 1 ? t('projects.collaborator') : t('projects.collaborators_plural')}</Text>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

        {project.image_categories && Object.entries(project.image_categories)
          .filter(([category]) => !['thumb', 'thumbnail'].includes(category.toLowerCase()))
          .map(([category, images]) => {
          const meta = getSectionMetadata(category);
          const displayName = meta.displayName;

          return (
            <TabsContent key={category} value={category}>
              <div className="space-y-6">
                <div className="text-center mb-8 px-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 overflow-y-hidden">
                    {getSectionIcon(category)}
                  </div>
                  <Heading level={2} className="text-3xl font-bold gradient-text mb-2">
                    {displayName}
                  </Heading>
                  <Text variant="large" className="text-muted-foreground">
                    {meta.description}
                  </Text>
                </div>

                {images && images.length > 0 && (
                  <div className="space-y-6">
                    <ImageCarousel
                      images={images}
                      title={displayName}
                      onImageClick={(imageUrl) => {
                        setModalImageUrl(imageUrl);
                        setImageModalOpen(true);
                      }}
                    />
                  </div>
                )}

                <div className="p-4 sm:p-5 md:p-6 rounded-xl bg-card border border-border">
                  <Heading level={3} className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
                    <Info className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2" />
                    {t('projectSections.sectionDetails')}
                  </Heading>
                  <Text className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                    {meta.description}
                  </Text>
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Image className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span>{images.length} {images.length === 1 ? t('projectSections.image') : t('projectSections.images')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Folder className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span>{displayName}</span>
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
        </div>

        {}
        <AnimatePresence>
          {imageModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08 }}
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
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white transition-colors duration-150"
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
});


