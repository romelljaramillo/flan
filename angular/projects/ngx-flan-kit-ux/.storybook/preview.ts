import type { Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { componentWrapperDecorator } from '@storybook/angular';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { themes } from '@storybook/theming';

setCompodocJson(docJson);

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', left: '☀️', right: 'Light' },
          { value: 'dark', title: 'Dark', left: '🌙', right: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    docs: {
      theme: themes.light      
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (storyFunc, context) => {
      const theme = context.globals["theme"];
      console.log('theme', theme);
      
      document.documentElement.setAttribute('data-bs-theme', theme === 'dark' ? 'dark' : 'light')
      return storyFunc();
    },
  ],
};



export default preview;
