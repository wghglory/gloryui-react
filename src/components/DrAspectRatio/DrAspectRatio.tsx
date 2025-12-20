import React from 'react';
import { cn } from '../../lib/utils';

export interface AspectRatioProps {
  ratio: '1:1' | '4:3' | '16:9';
  containerClass?: string;
  children: React.ReactNode;
}

const ratioMap = {
  '1:1': 'pb-[100%]',
  '4:3': 'pb-[75%]',
  '16:9': 'pb-[56.25%]'
};

const DrAspectRatio = ({ ratio, containerClass, children }: AspectRatioProps) => {
  return (
    <div className={cn('relative w-full overflow-hidden', containerClass)}>
      <div className={cn('relative w-full', ratioMap[ratio])}>
        <div className="absolute inset-0">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                className: cn('h-full w-full', child.props.className)
              } as any);
            }
            return child;
          })}
        </div>
      </div>
    </div>
  );
};

export default DrAspectRatio;
