import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { Icon } from '@/components/atoms/Icon';

interface SocialLinkProps {
  icon: LucideIcon;
  href: string;
  label: string;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const SocialLink = ({ 
  icon, 
  href, 
  label, 
  variant = 'outline',
  size = 'lg'
}: SocialLinkProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      asChild
      className="hover-glow border-border bg-card/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
    >
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <Icon icon={icon} className="mr-2 group-hover:scale-110 transition-transform" />
        {label}
      </a>
    </Button>
  );
};

export default SocialLink;
