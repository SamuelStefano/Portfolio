import { ExternalLink, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn, cardSrc } from '@/lib/utils';
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
  const IconComponent = getIconComponent(project.icon_name);
  const accentGradient = ROLE_ACCENT[project.role] ?? ROLE_ACCENT.Collaborator;

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={t('projects.viewDetails')}
      className="group bg-card border-border hover:border-primary/50 transition-colors duration-200 cursor-pointer h-full flex flex-col overflow-hidden"
      onClick={() => onProjectClick(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onProjectClick(project);
        }
      }}
    >
      {/* role accent top bar */}
      <div className={cn('h-0.5 w-full bg-gradient-to-r', accentGradient)} />

      {/* thumbnail */}
      <div className="relative h-44 overflow-hidden">
        {project.thumbnail_url ? (
          <img
            src={cardSrc(project.thumbnail_url)}
            alt={project.title}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            decoding="async"
            onError={e => { e.currentTarget.src = project.thumbnail_url!; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
            <IconComponent className="w-14 h-14 text-primary" />
          </div>
        )}

      </div>

      <CardContent className="p-5 flex flex-1 flex-col">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className={cn('border-primary/30 text-primary text-xs', project.role === 'Creator' && 'border-neon-blue/50 text-neon-blue')}>
            {t(`projects.roles.${project.role}`, { defaultValue: project.role })}
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

        <Heading level={3} className="mb-1.5 text-xl md:text-xl font-semibold group-hover:text-primary transition-colors">
          {project.title}
        </Heading>

        <Text className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {project.description}
        </Text>

        <div className="flex flex-wrap gap-1 mb-4 mt-auto">
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
            className="w-full text-xs hover:border-primary/50 hover:bg-transparent hover:text-primary"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
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
