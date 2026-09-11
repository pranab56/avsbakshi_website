import * as React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type InputVariant = "default" | "dark";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  inputSize?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      variant = "default",
      inputSize = "md",
      leftIcon,
      rightIcon,
      error,
      label,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const baseContainerStyles =
      "relative flex items-center w-full rounded-xl border transition-all duration-200";

    const variantStyles: Record<InputVariant, string> = {
      default:
        "bg-card border-border text-foreground placeholder:text-muted-foreground focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
      dark:
        "bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
    };

    const sizeStyles: Record<InputSize, string> = {
      sm: "h-9 text-xs px-3",
      md: "h-11 text-xs sm:text-sm px-3.5",
      lg: "h-13 text-sm sm:text-base px-4",
    };

    const errorStyles = error
      ? "border-destructive bg-destructive/10 focus-within:border-destructive focus-within:ring-destructive"
      : "";

    const combinedContainer = cn(baseContainerStyles, variantStyles[variant], sizeStyles[inputSize], errorStyles, className);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-foreground">
            {label}
          </label>
        )}
        <div className={combinedContainer}>
          {leftIcon && (
            <span className="shrink-0 mr-2.5 text-muted-foreground flex items-center justify-center">
              {leftIcon}
            </span>
          )}
          <ShadcnInput
            id={inputId}
            ref={ref}
            className="w-full border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 md:text-sm text-foreground placeholder:text-muted-foreground"
            {...props}
          />
          {rightIcon && (
            <span className="shrink-0 ml-2.5 text-muted-foreground flex items-center justify-center">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-destructive text-[11px] font-medium mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
