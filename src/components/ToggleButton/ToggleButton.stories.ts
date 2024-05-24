import ToggleButton from "./ToggleButton.svelte";

export default {
  title: "Components/ToggleButton",
  component: ToggleButton,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        // this only works on a dark background
        { name: 'dark', value: '#5d5d5d' },
      ],
    }
  },
};

export const Primary = {};