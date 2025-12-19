import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import DrAspectRatio from './DrAspectRatio';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DrAspectRatio> = {
  title: 'DrComponentLibrary/DrAspectRatio',
  component: DrAspectRatio
};

export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DrAspectRatio> = (args) => <DrAspectRatio {...args} />;

export const FourThree = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FourThree.args = {
  ratio: '4:3',
  containerClass: 'hello',
  children: <img src="https://picsum.photos/800/600" alt="4:3 picture" />
};

export const SixteenNine = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SixteenNine.args = {
  ratio: '16:9',
  containerClass: 'hello',
  children: <img src="https://picsum.photos/1600/900" alt="16:9 picture" />
};

export const OneOne = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
OneOne.args = {
  ratio: '1:1',
  containerClass: 'hello',
  children: <img src="https://picsum.photos/600/600" alt="1:1 picture" />
};

export const IFrameDemo = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
IFrameDemo.args = {
  ratio: '16:9',
  containerClass: 'hello',
  children: (
    <iframe src="https://example.com" title="Aspect Ratio Demo" className="inset-0" style={{ border: 'none' }} />
  )
};
