import type { Meta, StoryObj } from '@storybook/react';
import { ImageCarousel } from './ImageCarousel';

const sampleImages = [
  '/projects/Skill Evals/Dashboard principal.png',
  '/projects/Skill Evals/Challenge tela.png',
  '/projects/Skill Evals/Dashboard de admin.png',
  '/projects/Skill Evals/Code.png',
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
    onImageClick: () => {},
  },
};

export const SingleImage: Story = {
  args: {
    images: [sampleImages[0]],
    title: 'Single Image',
    onImageClick: () => {},
  },
};

export const TwoImages: Story = {
  args: {
    images: sampleImages.slice(0, 2),
    title: 'Two Images',
    onImageClick: () => {},
  },
};

export const ManyImages: Story = {
  args: {
    images: [
      ...sampleImages,
      '/projects/Skill Evals/Challenge test passed.png',
      '/projects/Skill Evals/Pre Challenge.png',
    ],
    title: 'Project Screenshots',
    onImageClick: () => {},
  },
};

export const ProjectGallery: Story = {
  args: {
    images: [
      '/projects/Skill Evals/Dashboard principal.png',
      '/projects/Skill Evals/Dashboard de admin.png',
      '/projects/Skill Evals/Challenge tela.png',
      '/projects/Skill Evals/Code.png',
    ],
    title: 'Skill Evals Gallery',
    onImageClick: () => {},
  },
};




