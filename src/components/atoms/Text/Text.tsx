import { cn } from '@/lib/utils';

interface TextProps {
  children: React.ReactNode;
  variant?: 'body' | 'muted' | 'small' | 'large';
  className?: string;
}

const textVariants = {
  body: 'text-base',
  muted: 'text-sm text-muted-foreground',
  small: 'text-sm',
  large: 'text-lg'
};

export const Text = ({ children, variant = 'body', className }: TextProps) => {
  return (
    <p className={cn(textVariants[variant], className)}>
      {children}
    </p>
  );
};

export default Text;



