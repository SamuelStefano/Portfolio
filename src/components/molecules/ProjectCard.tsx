import { ExternalLink, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';

interface Project {
  id: number;
  title: string;
  role: string;
  shortDescription: string;
  collaborators: { name: string; role: string }[];
  stack: string[];
  icon: React.ComponentType<any>;
  links: { label: string; url: string }[];
  category: string;
}

interface ProjectCardProps {
  project: Project;
  onProjectClick: (project: Project) => void;
  isHovered?: boolean;
}

export const ProjectCard = ({ project, onProjectClick, isHovered = false }: ProjectCardProps) => {
  return (
    <Card
      className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover-glow cursor-pointer overflow-hidden"
      onClick={() => onProjectClick(project)}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
          <Icon icon={project.icon} className="w-16 h-16 text-primary" />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Content */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="secondary" size="sm" className="hover-glow">
            <Icon icon={ExternalLink} className="mr-2" />
            Ver Detalhes
          </Button>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
            {project.category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="border-primary/30 text-primary">
            {project.role}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon icon={Users} size="sm" />
            {project.collaborators.length}
          </div>
        </div>

        <Heading level={3} className="mb-2 group-hover:gradient-text transition-all duration-300">
          {project.title}
        </Heading>
        
        <Text className="mb-4 line-clamp-2">
          {project.shortDescription}
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
          {project.links.slice(0, 1).map((link, index) => (
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
