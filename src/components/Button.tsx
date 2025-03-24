import { IconName } from "@/interfaces/IIcons";
import { JSX } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  name?: string;
  variant?: "primary" | "outline" | "ghost";
  color?: "primary" | "error" | "warning" | "success" | "info";
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
  leftIcon?: string; 
  rightIcon?: string;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-md",
  lg: "px-6 py-3 text-lg",
};

const variantColorClasses = {
  primary: {
    primary: "bg-primary-500 text-white hover:bg-primary-600",
    error: "bg-error-500 text-white hover:bg-error-600",
    warning: "bg-warning-500 text-white hover:bg-warning-600",
    success: "bg-success-500 text-white hover:bg-success-600",
    info: "bg-dark-400 text-dark-900 hover:bg-dark-600 hover:text-white"
  },
  outline: {
    primary: "border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white",
    error: "border border-error-500 text-error-500 hover:bg-error-500 hover:text-white",
    warning: "border border-warning-500 text-warning-500",
    success: "border border-success-500 text-success-500",
    info: "border border-info-500 text-white"
  },
  ghost: {
    primary: "bg-transparent text-primary-500",
    error: "bg-transparent text-error-500 hover:text-white",
    warning: "bg-transparent text-warning-500",
    success: "bg-transparent text-success-500",
    info: "bg-transparent text-dark-200 hover:text-white"
  },
};

const roundedClasses = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export function Button({
  size = "md",
  name,
  variant = "primary",
  color = "primary",
  rounded = "md",
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`${sizeClasses[size!]}
        ${variantColorClasses[variant!][color!]}
        ${rounded ? roundedClasses[rounded] : ""}
        ${props.className}
        hover:cursor-pointer
        flex items-center justify-center`}
    >
      {leftIcon && (
        <span className={`pi ${leftIcon} mr-2`} />
      )}

      {name}

      {rightIcon && (
        <span className={`pi ${rightIcon} ml-2`} />
      )}
    </button>
  );
}
