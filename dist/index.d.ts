/// <reference types="react" />
interface ButtonProps {
    label: string;
}
declare const DrButton: (props: ButtonProps) => JSX.Element;

interface AspectRatioProps {
    ratio: string;
    containerClass?: string;
    children: JSX.Element | JSX.Element[];
}
declare const DrAspectRatio: ({ ratio, containerClass, children }: AspectRatioProps) => JSX.Element;

export { DrAspectRatio, DrButton };
