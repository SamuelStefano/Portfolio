import { ExternalLink, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { Project } from '@/types/project';
import { getIconComponent } from '@/utils/iconResolver';

interface ProjectCardProps {
  project: Project;
  onProjectClick: (project: Project) => void;
  isHovered?: boolean;
}

export const ProjectCard = ({ project, onProjectClick, isHovered = false }: ProjectCardProps) => {
  const IconComponent = getIconComponent(project.icon_name);

  return (
    <Card
      className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover-glow cursor-pointer overflow-hidden"
      onClick={() => onProjectClick(project)}
    >
      <div className="relative h-48 overflow-hidden">
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
            <IconComponent className="w-16 h-16 text-primary" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Content */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="secondary" size="sm" className="hover-glow">
            <Icon icon={ExternalLink} className="mr-2" />
            Ver Detalhes
          </Button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
            {project.role}
          </Badge>
          {project.auto_discovered && (
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
              Auto-descoberto
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="border-primary/30 text-primary">
            {project.role}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon icon={Users} size="sm" />
            {project.project_collaborators.length}
          </div>
        </div>

        <Heading level={3} className="mb-2 group-hover:gradient-text transition-all duration-300">
          {project.title}
        </Heading>
        
        <Text className="mb-4 line-clamp-2">
          {project.description}
        </Text>

        {/* Tech Stack Preview */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.stack.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.stack.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.stack.length - 3}
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          {project.project_links.slice(0, 1).map((link, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              asChild
              className="flex-1 hover:bg-primary hover:text-primary-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <Icon icon={ExternalLink} size="sm" className="mr-1" />
                {link.label}
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;