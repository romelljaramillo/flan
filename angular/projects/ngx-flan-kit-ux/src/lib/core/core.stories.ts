import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular';

import { CoreComponent } from './core.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<CoreComponent> = {
  title: 'Roanja/Core',
  component: CoreComponent,
  decorators: [componentWrapperDecorator((story) => `<div class="text-center m-3">${story}</div>`)],
  tags: ['autodocs'],
  parameters: {
    componentSubtitle:
      'Add CSS classes to the component and an ID',
  },
  /*
   * More on Storybook argTypes at:
   * https://storybook.js.org/docs/react/api/argtypes
   */
  render: (args: CoreComponent) => ({
    props: {
      ...args,
    },
  }),
  
};

export default meta;
type Story = StoryObj<CoreComponent>;

export const Css: Story = {
  args: {
    css: 'text-primary',
  },
};

export const Id: Story = {
  args: {
    id: 'id-text',
  },
};

