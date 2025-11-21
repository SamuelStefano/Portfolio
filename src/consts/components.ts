import { Github, Linkedin, Instagram, Mail, Phone, FileText, User, GitBranch, Globe, Code2 } from 'lucide-react';

// Social Links
export const SOCIAL_LINKS = [
  {
    icon: Github,
    href: 'https://github.com/SamuelStefano',
    label: 'GitHub'
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/samuel-stefano',
    label: 'LinkedIn'
  },
  {
    icon: Instagram,
    href: 'https://instagram.com/samuel.stefano',
    label: 'Instagram'
  },
  {
    icon: FileText,
    href: 'https://drive.google.com/file/d/1-TpoRcofaK4T-rZZFWouQctZhW4Q9kpp/view?usp=sharing',
    label: 'Currículo'
  },
  {
    icon: Mail,
    href: 'mailto:samuel@example.com',
    label: 'Email'
  },
  {
    icon: Phone,
    href: 'tel:+5544998795387',
    label: 'Telefone'
  }
];

// Contact Info
export const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'samuelstefanodocarmo@gmail.com',
    href: 'mailto:samuelstefanodocarmo@gmail.com'
  },
  {
    icon: Phone,
    label: '+55 (44) 99879-5387',
    href: 'tel:+5544998795387'
  }
];

// Languages
export const LANGUAGES = [
  {
    code: 'pt',
    name: 'Português',
    flag: 'https://flagicons.lipis.dev/flags/4x3/br.svg'
  },
  {
    code: 'en',
    name: 'English',
    flag: 'https://flagicons.lipis.dev/flags/4x3/us.svg'
  },
  {
    code: 'es',
    name: 'Español',
    flag: 'https://flagicons.lipis.dev/flags/4x3/es.svg'
  }
];

// Text Variants
export const TEXT_VARIANTS = {
  default: 'text-foreground',
  large: 'text-lg font-medium',
  small: 'text-sm',
  muted: 'text-muted-foreground'
};

// Icon Size Classes
export const ICON_SIZE_CLASSES = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

// Heading Classes
export const HEADING_CLASSES = {
  1: 'text-4xl font-bold',
  2: 'text-3xl font-bold',
  3: 'text-2xl font-semibold',
  4: 'text-xl font-semibold',
  5: 'text-lg font-medium',
  6: 'text-base font-medium'
};

// Animation Variants
export const ANIMATION_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95
  })
};

export const SIDE_ANIMATION_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.9
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.9
  })
};




