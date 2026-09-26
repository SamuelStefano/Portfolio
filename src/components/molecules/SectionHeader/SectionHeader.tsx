import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <div className="mb-10 lg:mb-12">
    <Heading level={2} className="text-2xl sm:text-3xl lg:text-4xl tracking-tight text-foreground">
      {title}
    </Heading>
    {subtitle && (
      <Text className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">{subtitle}</Text>
    )}
  </div>
);

export default SectionHeader;
