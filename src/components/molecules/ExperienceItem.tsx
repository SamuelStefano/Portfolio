import { Badge } from '@/components/atoms/badge';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';

interface ExperienceItemProps {
  company: string;
  role: string;
  period: string;
  description: string;
  stack: string[];
  className?: string;
}

export const ExperienceItem = ({ 
  company, 
  role, 
  period, 
  description, 
  stack,
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
      
      <Heading level={5} className="text-primary font-semibold mb-3">
        {company}
      </Heading>
      
      <Text className="mb-4">
        {description}
      </Text>
      
      <div className="flex flex-wrap gap-2">
        {stack.map((tech, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md hover:bg-primary/20 transition-colors"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ExperienceItem;
