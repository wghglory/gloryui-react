import React from 'react';
import './DrButton.scss';

export interface ButtonProps {
  label: string;
}

const DrButton = (props: ButtonProps) => {
  return <button className="dr-button">{props.label}</button>;
};

export default DrButton;
