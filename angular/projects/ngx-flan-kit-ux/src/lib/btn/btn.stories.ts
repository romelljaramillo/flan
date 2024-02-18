import type { Meta, StoryObj } from '@storybook/angular';
import { BtnComponent } from './btn.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<BtnComponent> = {
  title: 'Roanja/Btn',
  component: BtnComponent,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle:
      `Buttons are used to initialize an action, either in the background or foreground of an experience. 
      They are used primarily for actions, such as "Add", "Close", "Cancel", "Save", etc.`,
  },
  render: (args: BtnComponent) => ({
    props: {
      ...args,
    },
  }),
  
};

export default meta;
type Story = StoryObj<BtnComponent>;

export const Color: Story = {
  args: {
    color: 'primary',
    label: 'Button',
  },
};

export const Outline: Story = {
  args: {
    outline: true,
    color: 'primary',
    label: 'Button',
  },
};

export const SizeLg: Story = {
  args: {
    size: 'lg',
    color: 'primary',
    label: 'Button',
  },
};

export const SizeSm: Story = {
  args: {
    size: 'sm',
    color: 'primary',
    label: 'Button',
  },
};

export const Block: Story = {
  args: {
    block: true,
    color: 'primary',
    label: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    color: 'primary',
    label: 'Button',
  },
};

