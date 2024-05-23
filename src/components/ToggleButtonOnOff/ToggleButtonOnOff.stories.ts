import ToggleButtonOnOff from "./ToggleButtonOnOff.svelte";

export default {
    title: "Deeptime/ReducedMotionToggle/ToggleButtonOnOff",
    component: ToggleButtonOnOff,
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