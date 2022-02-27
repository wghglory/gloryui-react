import React from 'react';
import './DrAspectRatio.scss';

export interface AspectRatioProps {
  ratio: string;
  containerClass?: string;
  children: JSX.Element | JSX.Element[];
}

const DrAspectRatio = ({ratio, containerClass = '', children}: AspectRatioProps) => {
  let stylePadding = '0';

  /* https://www.w3schools.com/howto/howto_css_aspect_ratio.asp
    padding-top: 100%; 1:1 Aspect Ratio
    padding-top: 75%; 4:3 Aspect Ratio (divide 3 by 4 = 0.75)
    padding-top: 66.66%; 3:2 Aspect Ratio (divide 2 by 3 = 0.6666)
  */

  if (ratio === '4:3') {
    stylePadding = '75%';
  } else if (ratio === '16:9') {
    stylePadding = '56.25%';
  } else if (ratio === '1:1') {
    stylePadding = '100%';
  } else {
    console.warn('aspect ratio not supported');
  }

  return (
    <div
      className={`${containerClass} dr-aspect-ratio`}
      style={{
        paddingBottom: stylePadding,
      }}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          className: `${child.props.className} dr-aspect-ratio-child`,
        }),
      )}
    </div>
  );
};

export default DrAspectRatio;
