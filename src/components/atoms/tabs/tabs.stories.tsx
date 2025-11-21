import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

const meta = {
  title: 'Atoms/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <p>Overview content goes here</p>
      </TabsContent>
      <TabsContent value="details" className="mt-4">
        <p>Details content goes here</p>
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        <p>Settings content goes here</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithCards: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Username</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Current password</label>
              <input type="password" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">New password</label>
              <input type="password" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const ProjectSections: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="admin">Admin</TabsTrigger>
        <TabsTrigger value="mobile">Mobile</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>Main project information and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This section shows the project overview with key metrics and description.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="dashboard" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Main interface with statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Dashboard screenshots and details would be displayed here.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="admin" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Admin Panel</CardTitle>
            <CardDescription>Administrative interface</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Admin panel features and screenshots.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="mobile" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Mobile View</CardTitle>
            <CardDescription>Responsive mobile interface</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Mobile version screenshots and features.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};




