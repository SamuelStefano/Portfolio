import { cn } from '@/lib/utils';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const headingClasses = {
  1: 'text-4xl md:text-5xl font-bold',
  2: 'text-3xl md:text-4xl font-bold',
  3: 'text-2xl md:text-3xl font-bold',
  4: 'text-xl md:text-2xl font-semibold',
  5: 'text-lg md:text-xl font-semibold',
  6: 'text-base md:text-lg font-semibold'
};

export const Heading = ({ level, children, className }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={cn(headingClasses[level], className)}>
      {children}
    </Tag>
  );
};

export default Heading;



