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
    <div className={className}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
        <Heading level={4}>
          {role}
        </Heading>
        <Text variant="small" className="text-muted-foreground">
          {period}
        </Text>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        {icon && (
          <div className="p-1 bg-primary/10 rounded-md">
            {React.createElement(icon, { className: "w-3 h-3 text-primary" })}
          </div>
        )}
        <Heading level={5} className="text-primary font-semibold">
          {company}
        </Heading>
      </div>
      
      <Text className="mb-4">
        {description}
      </Text>
      
      <div className="flex flex-wrap gap-2">
        {stack.map((tech, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="px-2 py-1 bg-primary/20  text-sm rounded-md hover:bg-primary/20 transition-colors"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ExperienceItem;
