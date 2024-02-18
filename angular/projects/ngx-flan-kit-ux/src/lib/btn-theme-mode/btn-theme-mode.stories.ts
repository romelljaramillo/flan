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
    color: 'dark',
    label: 'Button',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    label: 'Button',
  },
};

export const Success: Story = {
  args: {
    color: 'success',
    label: 'Button',
  },
};

export const Info: Story = {
  args: {
    color: 'info',
    label: 'Button',
  },
};

export const Warning: Story = {
  args: {
    color: 'warning',
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
