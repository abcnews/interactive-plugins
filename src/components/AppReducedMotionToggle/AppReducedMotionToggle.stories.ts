import AppReducedMotionToggle from './AppReducedMotionToggle.svelte';
import DarkMode from '../../../.storybook/DarkMode.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/AppReducedMotionToggle',
  component: AppReducedMotionToggle,
  tags: ['autodocs'],
  //   argTypes: {
  // backgroundColor: { control: 'color' },
  // size: {
  //   control: { type: 'select' },
  //   options: ['small', 'medium', 'large'],
  // },
  //   },
};

export const Light = {
  args: {
    layout: 'wide'
  },
};

export const Night = {
  component: AppReducedMotionToggle,
  decorators: [() => DarkMode],
};