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
FourThree.args = {
  ratio: '4:3',
  containerClass: '',
  children: <img src="https://picsum.photos/800/600" alt="4:3 picture" className="object-cover" />
};

export const SixteenNine = Template.bind({});
SixteenNine.args = {
  ratio: '16:9',
  containerClass: '',
  children: <img src="https://picsum.photos/1600/900" alt="16:9 picture" className="object-cover" />
};

export const OneOne = Template.bind({});
OneOne.args = {
  ratio: '1:1',
  containerClass: '',
  children: <img src="https://picsum.photos/600/600" alt="1:1 picture" className="object-cover" />
};

export const IFrameDemo = Template.bind({});
IFrameDemo.args = {
  ratio: '16:9',
  containerClass: '',
  children: (
    <iframe
      src="https://example.com"
      title="Aspect Ratio Demo"
      className="h-full w-full border-0"
    />
  )
};
