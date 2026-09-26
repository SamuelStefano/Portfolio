import {
  Bot,
  Briefcase,
  Calendar,
  Code,
  CreditCard,
  FileText,
  GraduationCap,
  Headphones,
  Layout,
  Leaf,
  Library,
  Monitor,
  TrendingUp,
  Video,
  type LucideIcon,
} from 'lucide-react';

/** Only the icons projects actually reference, so lucide does not drag hundreds of glyphs
 *  into the bundle. Unknown names fall back to Code. */
const ICONS: Record<string, LucideIcon> = {
  Bot,
  Briefcase,
  Calendar,
  Code,
  CreditCard,
  FileText,
  GraduationCap,
  Headphones,
  Layout,
  Leaf,
  Library,
  Monitor,
  TrendingUp,
  Video,
};

export const getIconComponent = (iconName: string): LucideIcon => ICONS[iconName] ?? Code;
