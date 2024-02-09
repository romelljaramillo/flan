import type { Meta, StoryObj } from '@storybook/angular';

import { BtnThemeModeComponent } from './btn-theme-mode.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<BtnThemeModeComponent> = {
  title: 'Roanja/ThemeMode',
  component: BtnThemeModeComponent,
  tags: ['autodocs'],
  render: (args: BtnThemeModeComponent) => ({
    props: {
      ...args,
    },
  })  
};

export default meta;
type Story = StoryObj<BtnThemeModeComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Dark: Story = {
  args: {
    backgroundColor: 'dark',
    label: 'Button',
  },
};

export const Primary: Story = {
  args: {
    backgroundColor: 'primary',
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    backgroundColor: 'secondary',
    label: 'Button',
  },
};

export const Success: Story = {
  args: {
    backgroundColor: 'success',
    label: 'Button',
  },
};

export const Info: Story = {
  args: {
    backgroundColor: 'info',
    label: 'Button',
  },
};

export const Warning: Story = {
  args: {
    backgroundColor: 'warning',
    label: 'Button',
  },
};


export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
