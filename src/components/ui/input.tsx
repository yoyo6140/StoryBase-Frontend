import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full min-w-0 rounded-xl border text-sm text-slate-900 shadow-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-slate-200 bg-slate-50',
        outline: 'border-slate-300 bg-white',
        ghost:
          'border-transparent bg-transparent shadow-none focus-visible:ring-offset-0',
      },
      inputSize: {
        default: 'h-11 px-3 py-2',
        sm: 'h-9 rounded-lg px-2.5 py-1.5 text-xs',
        lg: 'h-12 rounded-xl px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  },
);

export type InputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { inputVariants };
