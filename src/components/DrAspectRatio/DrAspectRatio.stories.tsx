import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import DrAspectRatio from './DrAspectRatio';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'DrComponentLibrary/DrAspectRatio',
  component: DrAspectRatio,
} as ComponentMeta<typeof DrAspectRatio>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DrAspectRatio> = (args) => <DrAspectRatio {...args} />;

export const FourThree = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FourThree.args = {
  ratio: '4:3',
  containerClass: 'hello',
  children: (
    <img
      src="https://th.bing.com/th/id/R.30e3353f4d34b9496ec9b5d9a16c95f7?rik=rjbkdDAweLkomA&riu=http%3a%2f%2fcn.wallpaperforgirls.com%2ftupian%2fnuhai-bizhi-1920x1200-767-493412f4.jpg&ehk=FvG3DsaPo8MCvLwhdvGf8ajlXj6YlPm8Jivg8g5sg%2b4%3d&risl=&pid=ImgRaw&r=0"
      alt="4:3 picture"
    />
  ),
};

export const SixteenNine = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SixteenNine.args = {
  ratio: '16:9',
  containerClass: 'hello',
  children: (
    <img
      src="https://th.bing.com/th/id/R.30e3353f4d34b9496ec9b5d9a16c95f7?rik=rjbkdDAweLkomA&riu=http%3a%2f%2fcn.wallpaperforgirls.com%2ftupian%2fnuhai-bizhi-1920x1200-767-493412f4.jpg&ehk=FvG3DsaPo8MCvLwhdvGf8ajlXj6YlPm8Jivg8g5sg%2b4%3d&risl=&pid=ImgRaw&r=0"
      alt="16:9 picture"
    />
  ),
};

export const OneOne = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
OneOne.args = {
  ratio: '1:1',
  containerClass: 'hello',
  children: (
    <img
      src="https://th.bing.com/th/id/R.30e3353f4d34b9496ec9b5d9a16c95f7?rik=rjbkdDAweLkomA&riu=http%3a%2f%2fcn.wallpaperforgirls.com%2ftupian%2fnuhai-bizhi-1920x1200-767-493412f4.jpg&ehk=FvG3DsaPo8MCvLwhdvGf8ajlXj6YlPm8Jivg8g5sg%2b4%3d&risl=&pid=ImgRaw&r=0"
      alt="1:1 picture"
    />
  ),
};

export const IFrameDemo = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
IFrameDemo.args = {
  ratio: '16:9',
  containerClass: 'hello',
  children: (
    <>
      <div className="flex items-center justify-center">
        Loading Code Editor
        <div className="ml-4 animate-spin">Loading</div>
      </div>

      <iframe
        src="https://google.com"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        allow="accelerometer; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; xr-spatial-tracking"
        title={'title'}
        className="inset-0"
      />
    </>
  ),
};
