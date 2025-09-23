import React from 'react';
import { Badge } from '@/components/atoms/badge';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';

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
  className
}: ExperienceItemProps) => {
  return (
    <div className={`bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 lg:p-7 hover:border-primary/30 hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
        <Heading level={4} className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold leading-tight">
          {role}
        </Heading>
        <Text variant="small" className="text-muted-foreground text-xs sm:text-sm md:text-base font-medium bg-muted/30 px-2 py-1 rounded-md flex-shrink-0">
          {period}
        </Text>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        {icon && (
          <div className="p-1.5 sm:p-2 bg-primary/10 rounded-md flex-shrink-0">
            {React.createElement(icon, { className: "w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary" })}
          </div>
        )}
        <Heading level={5} className="text-primary font-semibold text-sm sm:text-base md:text-lg">
          {company}
        </Heading>
      </div>

      <Text className="mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
        {description}
      </Text>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5">
        {stack.map((tech, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 bg-primary/15 text-primary border border-primary/20 text-xs sm:text-sm rounded-md hover:bg-primary/25 hover:border-primary/30 transition-colors"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ExperienceItem;
