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

  useEffect(() => {
    if (projects.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentProject, projects.length]);

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

  if (projects.length === 0) {
    return (
      <div className="py-20">
        <div className="text-center">
          <Text variant="large" className="text-muted-foreground">
            Nenhum projeto encontrado
          </Text>
          <Text variant="small" className="text-muted-foreground mt-2">
            VITE_INCLUDE_AUTO_DISCOVERED=true .
          </Text>
        </div>
      </div>
    );
  }

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
    <section id="projetos" className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <Heading level={2} className="mb-3 sm:mb-4 md:mb-6 gradient-text text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Projetos
          </Heading>
          <Text variant="large" className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Uma seleção dos meus trabalhos mais recentes e impactantes
          </Text>
        </div>

        {}
        <div className="relative">
          {}
          <Button
            variant="outline"
            size="icon"
            className="hidden xl:flex absolute -left-16 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 shadow-lg"
            onClick={prevProject}
          >
            <Icon icon={ChevronLeft} size="sm" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="hidden xl:flex absolute -right-16 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 shadow-lg"
            onClick={nextProject}
          >
            <Icon icon={ChevronRight} size="sm" />
          </Button>

          <div
            ref={carouselRef}
            className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 overflow-hidden"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            {}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`prev-${projects[(currentProject - 1 + projects.length) % projects.length].id}`}
                className="hidden lg:block w-48 xl:w-64 2xl:w-80 h-36 xl:h-48 2xl:h-60 rounded-xl overflow-hidden cursor-pointer hover:opacity-70 transition-all duration-500 transform hover:scale-105 bg-card border border-border group relative flex-shrink-0"
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

                      {}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />

                      {}
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

            {}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.id}
                className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] rounded-xl lg:rounded-2xl overflow-hidden group cursor-pointer hover-glow flex-shrink-0 transform transition-all duration-500 lg:hover:scale-105 bg-card border border-border mx-auto"
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

                {}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent transition-all duration-500 group-hover:from-background/90" />

                {}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 transform transition-all duration-500 md:group-hover:translate-y-[-4px]">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm text-xs sm:text-sm w-fit">
                      {project.role}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                      <Icon icon={Users} size="sm" />
                      {project.project_collaborators.length} colaborador{project.project_collaborators.length > 1 ? 'es' : ''}
                    </div>
                  </div>
                  <Heading level={3} className="mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300 text-lg sm:text-xl md:text-2xl">
                    {project.title}
                  </Heading>
                  <Text variant="small" className="max-w-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300 text-xs sm:text-sm line-clamp-2 sm:line-clamp-none">
                    {project.description}
                  </Text>
                </div>

                {}
                <div className="hidden md:block absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 border border-primary/30">
                    <Text variant="small" className="text-primary font-medium">Clique para ver mais</Text>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`next-${projects[(currentProject + 1) % projects.length].id}`}
                className="hidden lg:block w-48 xl:w-64 2xl:w-80 h-36 xl:h-48 2xl:h-60 rounded-xl overflow-hidden cursor-pointer hover:opacity-70 transition-all duration-500 transform hover:scale-105 bg-card border border-border group relative flex-shrink-0"
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

                      {}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />

                      {}
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

          {}
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 touch-manipulation ${
                  index === currentProject
                    ? 'bg-primary scale-125 shadow-lg'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 active:bg-muted-foreground/70 hover:scale-110'
                }`}
                onClick={() => goToProject(index)}
              />
            ))}
          </div>

          {}
          <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 xl:hidden">
            <Button
              variant="outline"
              size="sm"
              className="bg-background/90 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md px-4 sm:px-6"
              onClick={prevProject}
            >
              <Icon icon={ChevronLeft} size="sm" className="mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Anterior</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-background/90 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 shadow-md px-4 sm:px-6"
              onClick={nextProject}
            >
              <span className="text-xs sm:text-sm">Próximo</span>
              <Icon icon={ChevronRight} size="sm" className="ml-1 sm:ml-2" />
            </Button>
          </div>
        </div>

        {}
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
