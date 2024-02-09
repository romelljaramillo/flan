import { addons } from '@storybook/manager-api';
// import { themes } from '@storybook/theming';
import flanTheme from './flan-theme';

addons.setConfig({
  theme: flanTheme,
});