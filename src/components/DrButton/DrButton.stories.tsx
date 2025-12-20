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

export const Default = Template.bind({});
Default.args = {
  label: 'Hello world!',
  variant: 'default',
  size: 'md'
};

export const Outline = Template.bind({});
Outline.args = {
  label: 'Outline Button',
  variant: 'outline',
  size: 'md'
};

export const Ghost = Template.bind({});
Ghost.args = {
  label: 'Ghost Button',
  variant: 'ghost',
  size: 'md'
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small Button',
  variant: 'default',
  size: 'sm'
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large Button',
  variant: 'default',
  size: 'lg'
};
