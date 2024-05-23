import NotificationContainer from './NotificationContainer.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Components/NotificationContainer',
  component: NotificationContainer,
  tags: ['autodocs'],
//   argTypes: {
    // backgroundColor: { control: 'color' },
    // size: {
    //   control: { type: 'select' },
    //   options: ['small', 'medium', 'large'],
    // },
//   },
};

export const Wide = {
  args: {
    layout:'wide'
  },
};

export const Square = {
  args: {
    layout:'square'
  },
};