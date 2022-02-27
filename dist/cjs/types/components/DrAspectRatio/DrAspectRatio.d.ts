/// <reference types="react" />
import './DrAspectRatio.scss';
export interface AspectRatioProps {
    ratio: string;
    containerClass?: string;
    children: JSX.Element | JSX.Element[];
}
declare const DrAspectRatio: ({ ratio, containerClass, children }: AspectRatioProps) => JSX.Element;
export default DrAspectRatio;
