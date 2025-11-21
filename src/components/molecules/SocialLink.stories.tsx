import type { Meta, StoryObj } from '@storybook/react';
import { SocialLink } from './SocialLink';
import { Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';

const meta = {
  title: 'Molecules/SocialLink',
  component: SocialLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SocialLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GitHub: Story = {
  args: {
    href: 'https://github.com/SamuelStefano',
    icon: Github,
    label: 'GitHub',
  },
};

export const LinkedIn: Story = {
  args: {
    href: 'https://linkedin.com/in/samuel-stefano',
    icon: Linkedin,
    label: 'LinkedIn',
  },
};

export const Email: Story = {
  args: {
    href: 'mailto:samuelstefanodocarmo@gmail.com',
    icon: Mail,
    label: 'Email',
  },
};

export const Twitter: Story = {
  args: {
    href: 'https://twitter.com',
    icon: Twitter,
    label: 'Twitter',
  },
};

export const Instagram: Story = {
  args: {
    href: 'https://instagram.com',
    icon: Instagram,
    label: 'Instagram',
  },
};

export const AllSocialLinks: Story = {
  render: () => (
    <div className="flex gap-4">
      <SocialLink href="https://github.com/SamuelStefano" icon={Github} label="GitHub" />
      <SocialLink href="https://linkedin.com/in/samuel-stefano" icon={Linkedin} label="LinkedIn" />
      <SocialLink href="mailto:samuelstefanodocarmo@gmail.com" icon={Mail} label="Email" />
      <SocialLink href="https://twitter.com" icon={Twitter} label="Twitter" />
      <SocialLink href="https://instagram.com" icon={Instagram} label="Instagram" />
    </div>
  ),
};

