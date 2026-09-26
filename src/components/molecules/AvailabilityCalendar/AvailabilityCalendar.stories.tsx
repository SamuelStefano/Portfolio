import type { Meta, StoryObj } from '@storybook/react';
import { AvailabilityCalendar } from './AvailabilityCalendar';

const meta = {
  title: 'Molecules/AvailabilityCalendar',
  component: AvailabilityCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AvailabilityCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InCard: Story = {
  render: () => (
    <div className="bg-card border border-border rounded-xl p-6 max-w-md">
      <h3 className="text-lg font-semibold mb-4">Disponibilidade</h3>
      <AvailabilityCalendar />
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-4xl bg-card border border-border rounded-xl p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold gradient-text mb-2">Minha Disponibilidade</h2>
        <p className="text-muted-foreground">
          Veja quando estou mais ativo e disponível para projetos
        </p>
      </div>
      <AvailabilityCalendar />
    </div>
  ),
};




