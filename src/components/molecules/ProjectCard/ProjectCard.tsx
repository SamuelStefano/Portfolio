import { ExternalLink, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/atoms/card/card';
import { Badge } from '@/components/atoms/badge/badge';
import { Button } from '@/components/atoms/button/button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { Project } from '@/types/project';
import { getIconComponent } from '@/utils/iconResolver';

interface ProjectCardProps {
  project: Project;
  onProjectClick: (project: Project) => void;
  isHovered?: boolean;
}

const ROLE_ACCENT: Record<string, string> = {
  Creator:      'from-neon-blue to-neon-purple',
  Collaborator: 'from-neon-purple/60 to-neon-cyan/60',
};

export const ProjectCard = ({ project, onProjectClick }: ProjectCardProps) => {
  const { t } = useTranslation();
  const IconComponent = getIconComponent(project.icon_name as any);
  const accentGradient = ROLE_ACCENT[project.role] ?? ROLE_ACCENT.Collaborator;

  return (
    <Card
      className="group bg-card border-border hover:border-primary/40 transition-all duration-200 hover-glow cursor-pointer overflow-hidden"
      onClick={() => onProjectClick(project)}
    >
      {/* role accent top bar */}
      <div className={cn('h-0.5 w-full bg-gradient-to-r', accentGradient)} />

      {/* thumbnail */}
      <div className="relative h-44 overflow-hidden">
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
            <IconComponent className="w-14 h-14 text-primary" />
          </div>
        )}

        {/* hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2">
          <Text className="text-white/80 text-xs line-clamp-2">{project.description}</Text>
          <div className="flex flex-wrap gap-1">
            {project.stack.slice(0, 4).map((tech, i) => (
              <span key={i} className="px-2 py-0.5 bg-primary/20 border border-primary/40 rounded text-xs text-primary font-medium font-mono">
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="px-2 py-0.5 bg-primary/20 border border-primary/40 rounded text-xs text-primary font-medium">
                +{project.stack.length - 4}
              </span>
            )}
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-1">
            <Icon icon={ExternalLink} className="mr-2" />
            {t('projects.viewDetails')}
          </Button>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className={cn('border-primary/30 text-primary text-xs', project.role === 'Creator' && 'border-neon-blue/50 text-neon-blue')}>
            {project.role}
          </Badge>
          {project.project_collaborators.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon icon={Users} size="sm" />
              <div className="flex -space-x-1">
                {project.project_collaborators.slice(0, 3).map((c, i) => (
                  c.avatar_url ? (
                    <img key={i} src={c.avatar_url} alt={c.name} title={c.name} className="w-5 h-5 rounded-full border border-background object-cover" />
                  ) : (
                    <div key={i} className="w-5 h-5 rounded-full border border-background bg-primary/20 flex items-center justify-center" title={c.name}>
                      <Icon icon={Users} size="sm" className="w-2.5 h-2.5 text-primary" />
                    </div>
                  )
                ))}
                {project.project_collaborators.length > 3 && (
                  <div className="w-5 h-5 rounded-full bg-primary/20 border border-background flex items-center justify-center">
                    <span className="text-[10px] text-primary">+{project.project_collaborators.length - 3}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Heading level={3} className="mb-1.5 group-hover:gradient-text transition-all duration-200 text-sm font-semibold">
          {project.title}
        </Heading>

        <Text className="mb-3 line-clamp-2 text-xs text-muted-foreground">
          {project.description}
        </Text>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.stack.slice(0, 3).map((tech, i) => (
            <Badge key={i} variant="secondary" className="text-[10px] font-mono px-1.5 py-0.5">
              {tech}
            </Badge>
          ))}
          {project.stack.length > 3 && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
              +{project.stack.length - 3}
            </Badge>
          )}
        </div>

        {project.project_links.slice(0, 1).map((link, i) => (
          <Button
            key={i}
            variant="outline"
            size="sm"
            asChild
            className="w-full text-xs hover:bg-primary hover:text-primary-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <Icon icon={ExternalLink} size="sm" className="mr-1" />
              {link.label}
            </a>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
