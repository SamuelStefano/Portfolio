import React from 'react';
import { Badge } from '@/components/atoms/badge/badge';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';

interface ExperienceItemProps {
  company: string;
  role: string;
  period: string;
  description: string;
  stack: string[];
  icon?: React.ComponentType<any>;
  className?: string;
}

export const ExperienceItem = ({
  company,
  role,
  period,
  description,
  stack,
  icon,
  className,
}: ExperienceItemProps) => {
  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3 mb-2">
        <Heading level={4} className="text-base sm:text-lg font-semibold leading-tight">
          {role}
        </Heading>
        <Text variant="small" className="text-muted-foreground text-xs font-medium bg-muted/30 px-2 py-0.5 rounded flex-shrink-0 self-start">
          {period}
        </Text>
      </div>

      <div className="flex items-center gap-2 mb-3">
        {icon && (
          <div className="p-1.5 bg-primary/10 rounded flex-shrink-0">
            {React.createElement(icon, { className: 'w-3.5 h-3.5 text-primary' })}
          </div>
        )}
        <Heading level={5} className="text-primary font-semibold text-sm">
          {company}
        </Heading>
      </div>

      <Text className="mb-4 text-sm text-muted-foreground leading-relaxed">
        {description}
      </Text>

      <div className="flex flex-wrap gap-1.5">
        {stack.map((tech, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 text-xs font-mono hover:bg-primary/20 transition-colors"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ExperienceItem;
