import React from 'react';
import './DrAspectRatio.scss';
export interface AspectRatioProps {
    ratio: string;
    containerClass?: string;
    children: React.ReactElement;
}
declare const DrAspectRatio: ({ ratio, containerClass, children }: AspectRatioProps) => JSX.Element;
export default DrAspectRatio;
