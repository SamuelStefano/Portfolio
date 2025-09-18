import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Users, Code, X } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/atoms/dialog';
import { Badge } from '@/components/atoms/badge';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { useProjects } from '@/hooks/useProjects';
import { getIconComponent } from '@/utils/iconResolver';
import { Project } from '@/types/project';


export const ProjectCarousel = () => {
  const { projects, loading, error } = useProjects();
  const [currentProject, setCurrentProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  };

  // Side card variants
  const sideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 0.3,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.9
    })
  };

  // Auto-advance carousel always
  useEffect(() => {
    if (projects.length === 0) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentProject, projects.length]); // Reset timer quando currentProject muda

  const nextProject = () => {
    setDirection(1);
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    if (index === currentProject || projects.length === 0) return;
    setDirection(index > currentProject ? 1 : -1);
    setCurrentProject(index);
  };

  // Loading state
  if (loading) {
    return (
      <div className="py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <Text variant="large" className="text-muted-foreground">
            Carregando projetos...
          </Text>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-20">
        <div className="text-center">
          <Text variant="large" className="text-destructive mb-4">
            Erro ao carregar projetos
          </Text>
          <Text variant="small" className="text-muted-foreground">
            {error}
          </Text>
        </div>
      </div>
    );
  }

  // Empty state
  if (projects.length === 0) {
    return (
      <div className="py-20">
        <div className="text-center">
          <Text variant="large" className="text-muted-foreground">
            Nenhum projeto encontrado
          </Text>
        </div>
      </div>
    );
  }

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (dragStart === null) return;
    const deltaX = e.clientX - dragStart;
    setDragOffset(deltaX);
  };

  const handleDragEnd = () => {
    if (dragStart === null) return;
    
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        prevProject();
      } else {
        nextProject();
      }
    }
    
    setDragStart(null);
    setDragOffset(0);
  };

  const project = projects[currentProject];
  const IconComponent = getIconComponent(project.icon_name as any);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 gradient-text">
            Projetos em Destaque
          </Heading>
          <Text variant="large" className="max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes e impactantes
          </Text>
        </div>

        {/* Main Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows - Left */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
            onClick={prevProject}
          >
            <Icon icon={ChevronLeft} size="sm" />
          </Button>

          {/* Navigation Arrows - Right */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
            onClick={nextProject}
          >
            <Icon icon={ChevronRight} size="sm" />
          </Button>

          <div 
            ref={carouselRef}
            className="flex items-center justify-center gap-10 px-16"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            {/* Previous Project (Left) */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`prev-${projects[(currentProject - 1 + projects.length) % projects.length].id}`}
                className="w-80 h-60 rounded-xl overflow-hidden cursor-pointer hover:opacity-50 transition-all duration-500 transform hover:scale-105 bg-card border border-border group relative"
                custom={direction}
                variants={sideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.3,
                  ease: "easeOut"
                }}
                onClick={() => goToProject((currentProject - 1 + projects.length) % projects.length)}
              >
                {(() => {
                  const prevProject = projects[(currentProject - 1 + projects.length) % projects.length];
                  const PrevIconComponent = getIconComponent(prevProject.icon_name as any);
                  return (
                    <>
                      {prevProject.thumbnail_url ? (
                        <div className="w-full h-full relative">
                          <img 
                            src={prevProject.thumbnail_url} 
                            alt={prevProject.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <PrevIconComponent className="w-12 h-12 text-muted-foreground/80" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                          <PrevIconComponent className="w-16 h-16 text-muted-foreground" />
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                      
                      {/* Project Info - Container fixo */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 max-h-[60%] overflow-hidden">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm text-xs px-2 py-1">
                            {prevProject.role}
                          </Badge>
                        </div>
                        <Heading level={4} className="text-sm mb-1 group-hover:text-primary transition-colors duration-300 truncate">
                          {prevProject.title}
                        </Heading>
                        <Text variant="small" className="text-xs opacity-90 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 leading-tight">
                          {prevProject.description}
                        </Text>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            {/* Main Project */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.id}
                className="relative w-[580px] h-[380px] rounded-2xl overflow-hidden group cursor-pointer hover-glow flex-shrink-0 transform transition-all duration-500 hover:scale-105 bg-card border border-border"
                style={{
                  transform: `translateX(${dragOffset * 0.1}px)`,
                  transition: 'all 0.3s ease-out'
                }}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.8, 0.25, 1]
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => setSelectedProject(project)}
              >
                {project.thumbnail_url ? (
                  <div className="w-full h-full relative">
                    <img 
                      src={project.thumbnail_url} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="w-16 h-16 text-primary/80" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
                    <IconComponent className="w-32 h-32 text-primary" />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent transition-all duration-500 group-hover:from-background/90" />
                
                {/* Project Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500 group-hover:translate-y-[-4px]">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                      {project.role}
                    </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Icon icon={Users} size="sm" />
                  {project.project_collaborators.length} colaborador{project.project_collaborators.length > 1 ? 'es' : ''}
                </div>
                  </div>
                  <Heading level={3} className="mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </Heading>
                  <Text variant="small" className="max-w-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                  </Text>
                </div>

                {/* Hover Indicator */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 border border-primary/30">
                    <Text variant="small" className="text-primary font-medium">Clique para ver mais</Text>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next Project (Right) */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`next-${projects[(currentProject + 1) % projects.length].id}`}
                className="w-80 h-60 rounded-xl overflow-hidden cursor-pointer hover:opacity-50 transition-all duration-500 transform hover:scale-105 bg-card border border-border group relative"
                custom={direction}
                variants={sideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.3,
                  ease: "easeOut"
                }}
                onClick={() => goToProject((currentProject + 1) % projects.length)}
              >
                {(() => {
                  const nextProject = projects[(currentProject + 1) % projects.length];
                  const NextIconComponent = getIconComponent(nextProject.icon_name as any);
                  return (
                    <>
                      {nextProject.thumbnail_url ? (
                        <div className="w-full h-full relative">
                          <img 
                            src={nextProject.thumbnail_url} 
                            alt={nextProject.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <NextIconComponent className="w-12 h-12 text-muted-foreground/80" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                          <NextIconComponent className="w-16 h-16 text-muted-foreground" />
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                      
                      {/* Project Info - Container fixo */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 max-h-[60%] overflow-hidden">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm text-xs px-2 py-1">
                            {nextProject.role}
                          </Badge>
                        </div>
                        <Heading level={4} className="text-sm mb-1 group-hover:text-primary transition-colors duration-300 truncate">
                          {nextProject.title}
                        </Heading>
                        <Text variant="small" className="text-xs opacity-90 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 leading-tight">
                          {nextProject.description}
                        </Text>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>


          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentProject 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                onClick={() => goToProject(index)}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-7xl max-h-[95vh] w-[95vw] p-0 overflow-hidden">
            {selectedProject && (
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                        {(() => {
                          const ModalIconComponent = getIconComponent(selectedProject.icon_name as any);
                          return <ModalIconComponent className="w-8 h-8 text-primary" />;
                        })()}
                      </div>
                      <div>
                        <DialogTitle className="text-3xl font-bold mb-2">
                          {selectedProject.title}
                        </DialogTitle>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                            {selectedProject.role}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Icon icon={Users} size="sm" />
                            {selectedProject.project_collaborators.length} colaborador{selectedProject.project_collaborators.length > 1 ? 'es' : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProject(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Icon icon={X} size="sm" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Description */}
                      <div>
                        <Heading level={4} className="mb-3 text-xl">Sobre o Projeto</Heading>
                        <Text className="text-muted-foreground leading-relaxed">
                          {selectedProject.long_description || selectedProject.description}
                        </Text>
                      </div>

                      {/* Image Gallery */}
                      {selectedProject.image_categories && Object.keys(selectedProject.image_categories).length > 0 && (
                        <div className="space-y-6">
                          <Heading level={4} className="text-xl">Galeria de Imagens</Heading>
                          {Object.entries(selectedProject.image_categories).map(([category, images]) => (
                            <div key={category} className="space-y-3">
                              <Heading level={5} className="text-lg font-semibold capitalize text-primary">
                                {category === 'thumb' ? 'Thumbnail' : category}
                              </Heading>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {images.map((imageUrl, index) => (
                                  <div
                                    key={index}
                                    className="relative group cursor-pointer rounded-lg overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
                                    onClick={() => {
                                      const modal = document.createElement('div');
                                      modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
                                      modal.innerHTML = `
                                        <div class="relative max-w-4xl max-h-[90vh] w-full">
                                          <img src="${imageUrl}" alt="${selectedProject.title} - ${category} ${index + 1}" class="w-full h-full object-contain rounded-lg" />
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
                                      alt={`${selectedProject.title} - ${category} ${index + 1}`}
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
                          ))}
                        </div>
                      )}

                      {/* Fallback para thumbnail se não houver categorias */}
                      {(!selectedProject.image_categories || Object.keys(selectedProject.image_categories).length === 0) && selectedProject.thumbnail_url && (
                        <div className="space-y-3">
                          <Heading level={4} className="text-xl">Imagem do Projeto</Heading>
                          <div className="relative group cursor-pointer rounded-lg overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
                               onClick={() => {
                                 const modal = document.createElement('div');
                                 modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
                                 modal.innerHTML = `
                                   <div class="relative max-w-4xl max-h-[90vh] w-full">
                                     <img src="${selectedProject.thumbnail_url}" alt="${selectedProject.title}" class="w-full h-full object-contain rounded-lg" />
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
                               }}>
                            <img
                              src={selectedProject.thumbnail_url}
                              alt={selectedProject.title}
                              className="w-full h-64 object-cover"
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
                        </div>
                      )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Technologies */}
                      <div>
                        <Heading level={4} className="mb-3 text-lg">Tecnologias</Heading>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.stack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 transition-colors">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Collaborators */}
                      {selectedProject.project_collaborators.length > 0 && (
                        <div>
                          <Heading level={4} className="mb-3 text-lg">Colaboradores</Heading>
                          <div className="space-y-2">
                            {selectedProject.project_collaborators.map((collaborator) => (
                              <div key={collaborator.id} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Icon icon={Users} size="sm" className="text-primary" />
                                </div>
                                <div>
                                  <Text className="font-medium">{collaborator.name}</Text>
                                  <Text className="text-sm text-muted-foreground">{collaborator.role}</Text>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      {selectedProject.project_links.length > 0 && (
                        <div>
                          <Heading level={4} className="mb-3 text-lg">Links</Heading>
                          <div className="space-y-2">
                            {selectedProject.project_links.map((link) => (
                              <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                              >
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                                  <Icon icon={ExternalLink} size="sm" className="text-primary" />
                                </div>
                                <Text className="font-medium group-hover:text-primary transition-colors">{link.label}</Text>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectCarousel;
