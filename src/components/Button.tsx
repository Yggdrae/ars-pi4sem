import React, { ButtonHTMLAttributes } from "react";
import { Text } from "./Text";
import { Spinner } from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  size?: "sm" | "md" | "lg";
  title: string;
  loading?: boolean;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  title,
  loading,
  className = "",
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "font-family-heading rounded-lg transition-colors duration-200 cursor-pointer inline-flex items-center justify-center gap-2";

  const variantStyles = {
    primary: "bg-[#E5D3B3] text-[#1E1E1E] hover:bg-[#d8c6a6]",
    secondary: "bg-[#1E1E1E] text-white hover:bg-[#222222]",
    tertiary:
      "bg-transparent text-content-primary w-full text-start hover:bg-[#E5D3B3]/10",
    outline:
      "bg-transparent border-2 border-[#E5D3B3] text-[#E5D3B3] hover:bg-[#1E1E1E] hover:text-[#E5D3B3]",
  };

  const sizeStyles = {
    sm: "h-[32px] px-3 text-[14px]",
    md: "h-[40px] px-4 text-[16px]",
    lg: "h-[48px] px-5 text-[18px]",
    xl: "h-[56px] px-6 text-[16px]",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex justify-center items-center h-[1em]">
          <Spinner />
        </div>
      ) : (
        <>
          {leftIcon && <div className="mr-1">{leftIcon}</div>}
          <Text className="leading-none">{title}</Text>
          {rightIcon && <span className="ml-1">{rightIcon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
