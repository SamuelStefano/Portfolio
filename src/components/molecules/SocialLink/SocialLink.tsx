import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/atoms/button/button';
import { Icon } from '@/components/atoms/Icon/Icon';

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
      className="border-border bg-card hover:border-primary/50 hover:bg-card hover:text-primary transition-colors"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <Icon icon={icon} className="mr-2" />
        {label}
      </a>
    </Button>
  );
};

export default SocialLink;



