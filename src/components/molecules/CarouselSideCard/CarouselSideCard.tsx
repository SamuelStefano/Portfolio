import { Badge } from '@/components/atoms/badge/badge';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';
import { Project } from '@/types/project';
import { getIconComponent } from '@/utils/iconResolver';

interface CarouselSideCardProps {
  project: Project;
  onClick: () => void;
}

export const CarouselSideCard = ({ project, onClick }: CarouselSideCardProps) => {
  const IconComponent = getIconComponent(project.icon_name);

  return (
    <div className="contents" onClick={onClick}>
      {project.thumbnail_url ? (
        <div className="w-full h-full relative">
           <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <IconComponent className="w-12 h-12 text-muted-foreground/80" />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
          <IconComponent className="w-16 h-16 text-muted-foreground" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-3 max-h-[60%] overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm text-xs px-2 py-1">
            {project.role}
          </Badge>
        </div>
        <Heading level={4} className="text-sm mb-1 group-hover:text-primary transition-colors duration-300 truncate">
          {project.title}
        </Heading>
        <Text variant="small" className="text-xs opacity-90 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 leading-tight">
          {project.description}
        </Text>
      </div>
    </div>
  );
};

export default CarouselSideCard;
