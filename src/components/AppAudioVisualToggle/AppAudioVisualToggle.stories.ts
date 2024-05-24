import AppAudioVisualToggle from './AppAudioVisualToggle.svelte';
import DarkMode from '../../../.storybook/DarkMode.svelte';
import SuperTall from '../../../.storybook/SuperTall.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/AppAudioVisualToggle',
  component: AppAudioVisualToggle,
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
};

export const Night = {
  component: AppAudioVisualToggle,
  decorators: [() => DarkMode],
};

export const LightTall = {
  component: AppAudioVisualToggle,
  decorators: [() => SuperTall],
};


export const DarkTall = {
  component: AppAudioVisualToggle,
  decorators: [() => DarkMode, () => SuperTall],
};
