import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base text-zinc-900 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-900 placeholder:text-zinc-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border-zinc-200 focus-visible:border-zinc-950",
        outline:
          "border-zinc-300 bg-white focus-visible:border-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-visible:border-zinc-400",
        ghost:
          "border-transparent bg-transparent shadow-none focus-visible:border-zinc-400 dark:bg-transparent dark:focus-visible:border-zinc-600",
      },
      inputSize: {
        default: "h-9",
        sm: "h-8 rounded-md px-2.5 text-xs md:text-xs",
        lg: "h-10 rounded-md px-4 text-base md:text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  },
);

export type InputProps = Omit<React.ComponentProps<"input">, "size"> &
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
Input.displayName = "Input";

export { inputVariants };
