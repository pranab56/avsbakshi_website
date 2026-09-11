import * as React from "react";
import Link from "next/link";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "dark" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      fullWidth = false,
      href,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Base styles with smooth transitions and theme variables
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 select-none whitespace-nowrap";

    // Variant styles using theme-aware classes
    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-xs hover:shadow-md border border-transparent",
      secondary:
        "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border",
      dark:
        "bg-foreground text-background hover:bg-foreground/90 border border-transparent shadow-xs",
      outline:
        "bg-card hover:bg-accent text-foreground border border-border hover:border-primary/50",
      ghost:
        "bg-transparent hover:bg-accent text-foreground hover:text-primary",
    };

    // Size styles with consistent heights
    const sizes: Record<ButtonSize, string> = {
      sm: "h-9 px-3.5 text-xs gap-1.5",
      md: "h-11 px-5 text-xs sm:text-sm gap-2",
      lg: "h-13 px-7 text-sm sm:text-base gap-2.5 font-semibold",
    };

    const widthStyle = fullWidth ? "w-full" : "";
    const combinedClasses = cn(baseStyles, variants[variant], sizes[size], widthStyle, className);

    const content = (
      <>
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={combinedClasses}>
          {content}
        </Link>
      );
    }

    return (
      <ShadcnButton
        ref={ref}
        type={type}
        disabled={disabled}
        className={combinedClasses}
        {...props}
      >
        {content}
      </ShadcnButton>
    );
  }
);

Button.displayName = "Button";
export default Button;
