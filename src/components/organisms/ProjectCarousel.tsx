import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Users, Code, X } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/atoms/dialog';
import { Badge } from '@/components/atoms/badge';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { ProjectOverlay } from './ProjectOverlay';
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
          <Text variant="small" className="text-muted-foreground mt-2">
            Dica: ative VITE_INCLUDE_AUTO_DISCOVERED=true no .env para mostrar projetos do Storage.
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

        {/* Project Overlay */}
        <ProjectOverlay 
          project={selectedProject} 
          isOpen={!!selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </div>
    </section>
  );
};

export default ProjectCarousel;
