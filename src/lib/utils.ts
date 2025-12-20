import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Type definition for class values that can be passed to the `cn` function.
 * Supports strings, numbers, booleans, objects (for conditional classes),
 * arrays (for nested class lists), and null/undefined values.
 */
export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

/**
 * Utility function to merge and conditionally apply Tailwind CSS classes.
 *
 * This is a shadcn/ui pattern that combines:
 * - `clsx`: Conditionally joins classNames together
 * - `twMerge`: Intelligently merges Tailwind CSS classes, resolving conflicts
 *   by keeping the last conflicting class (e.g., "px-2 px-4" becomes "px-4")
 *
 * @param inputs - Variable number of class values (strings, objects, arrays, etc.)
 * @returns A single string of merged Tailwind CSS classes
 *
 * @example
 * ```tsx
 * cn('px-2 py-1', 'bg-blue-500') // "px-2 py-1 bg-blue-500"
 * cn('px-2', 'px-4') // "px-4" (twMerge resolves conflict)
 * cn({ 'bg-red-500': isError, 'bg-green-500': !isError }) // Conditional classes
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
