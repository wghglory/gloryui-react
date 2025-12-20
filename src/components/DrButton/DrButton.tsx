import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps {
  label: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const DrButton = ({ label, variant = 'default', size = 'md', className }: ButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
          'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          'h-9 px-4 py-2': size === 'md',
          'h-8 rounded-md px-3 text-sm': size === 'sm',
          'h-10 rounded-md px-8': size === 'lg'
        },
        className
      )}
    >
      {label}
    </button>
  );
};

export default DrButton;
