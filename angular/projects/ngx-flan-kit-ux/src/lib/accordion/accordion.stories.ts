import type { Meta, StoryObj } from '@storybook/angular';

import { AccordionComponent } from './accordion.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<AccordionComponent> = {
  title: 'Roanja/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  render: (args: AccordionComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    items: {
      control: 'array',
    },
  },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const Default: Story = {
  args: {
    items: [
      { title: 'Item 1', content: 'Contenido 1' },
      { title: 'Item 2', content: 'Contenido 2' },
      { title: 'Item 3', content: 'Contenido 3' }
    ]
  },
};

export const ShowItem: Story = {
  args: {
    items: [
      { title: 'Item 1', content: 'Contenido 1' },
      { title: 'Item 2', content: 'Contenido 2' },
      { title: 'Item 3', content: 'Contenido 3' }
    ],
    showItem: 1
  },
};

export const ShowAll: Story = {
  args: {
    items: [
      { title: 'Item 1', content: 'Contenido 1' },
      { title: 'Item 2', content: 'Contenido 2' },
      { title: 'Item 3', content: 'Contenido 3' }
    ],
    showAll: true
  },
};

export const Id: Story = {
  args: {
    items: [
      { title: 'Item 1', content: 'Contenido 1' },
      { title: 'Item 2', content: 'Contenido 2' },
      { title: 'Item 3', content: 'Contenido 3' }
    ],
    id: 'accordion-id'
  },
};