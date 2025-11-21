import type { Meta, StoryObj } from '@storybook/react';
import { ImageCarousel } from './ImageCarousel';

const sampleImages = [
  'https://via.placeholder.com/800x600/4F46E5/ffffff?text=Image+1',
  'https://via.placeholder.com/800x600/10B981/ffffff?text=Image+2',
  'https://via.placeholder.com/800x600/F59E0B/ffffff?text=Image+3',
  'https://via.placeholder.com/800x600/EF4444/ffffff?text=Image+4',
];

const meta = {
  title: 'Molecules/ImageCarousel',
  component: ImageCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ImageCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images: sampleImages,
    title: 'Project Gallery',
    onImageClick: (imageUrl) => console.log('Image clicked:', imageUrl),
  },
};

export const SingleImage: Story = {
  args: {
    images: [sampleImages[0]],
    title: 'Single Image',
    onImageClick: (imageUrl) => console.log('Image clicked:', imageUrl),
  },
};

export const TwoImages: Story = {
  args: {
    images: sampleImages.slice(0, 2),
    title: 'Two Images',
    onImageClick: (imageUrl) => console.log('Image clicked:', imageUrl),
  },
};

export const ManyImages: Story = {
  args: {
    images: [
      ...sampleImages,
      'https://via.placeholder.com/800x600/8B5CF6/ffffff?text=Image+5',
      'https://via.placeholder.com/800x600/EC4899/ffffff?text=Image+6',
    ],
    title: 'Project Screenshots',
    onImageClick: (imageUrl) => console.log('Image clicked:', imageUrl),
  },
};

export const ProjectGallery: Story = {
  args: {
    images: [
      'https://via.placeholder.com/1200x800/4F46E5/ffffff?text=Dashboard',
      'https://via.placeholder.com/1200x800/10B981/ffffff?text=Admin+Panel',
      'https://via.placeholder.com/1200x800/F59E0B/ffffff?text=Mobile+View',
      'https://via.placeholder.com/1200x800/EF4444/ffffff?text=Settings',
    ],
    title: 'Skill Evals Gallery',
    onImageClick: (imageUrl) => console.log('Image clicked:', imageUrl),
  },
};




