import { composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { type ClassValue, clsx } from "clsx"

export interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const focusRing = tv({
  base: 'outline outline-zinc-600 dark:outline-zinc-400 outline-offset-2',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2'
    }
  }
});

export function composeTailwindRenderProps<T>(className: string | ((v: T) => string) | undefined, tw: string): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
