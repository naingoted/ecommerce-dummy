import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    const inputId = `${label.replace(" ", "")}-${type}`;

    return (
      <div className="max-w-[360px] mx-auto w-full">
        <label
          htmlFor={inputId}
          className="block text-md font-bold text-gray-700"
        >
          {label}
        </label>
        <input
          type={type}
          id={inputId}
          role="input"
          aria-label={label}
          className={cn(
            "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
