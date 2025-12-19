import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import DrButton from './DrButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DrButton> = {
  title: 'DrComponentLibrary/DrButton',
  component: DrButton
};

export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DrButton> = (args) => <DrButton {...args} />;

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
  label: 'Hello world!'
};

export const ClickMe = Template.bind({});
ClickMe.args = {
  label: 'Click me!'
};
