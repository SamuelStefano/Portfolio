import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>This is a simple card with just content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some information about the project or feature.</p>
      </CardContent>
    </Card>
  ),
};

export const Complete: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Name</CardTitle>
        <CardDescription>A brief description of the project</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This project was built using React, TypeScript, and TailwindCSS. It features a modern
          design and responsive layout.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>View Project</Button>
      </CardFooter>
    </Card>
  ),
};

export const ProjectCard: Story = {
  render: () => (
    <Card className="w-[350px] hover-card">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40" />
      </div>
      <CardHeader>
        <CardTitle>Skill Evals</CardTitle>
        <CardDescription>Developer Challenge Platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
            React
          </span>
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
            TypeScript
          </span>
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
            Next.js
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  ),
};

