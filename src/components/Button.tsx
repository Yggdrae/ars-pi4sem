import React, { ButtonHTMLAttributes } from "react";
import { Text } from "./Text";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  size?: "sm" | "md" | "lg";
  title: string;
  className?: string;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  title,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "font-family-heading rounded-lg transition-colors duration-200 cursor-pointer";

  const variantStyles = {
    primary: "bg-[#E5D3B3] text-[#1E1E1E] hover:bg-[#d8c6a6]",
    secondary: "bg-[#1E1E1E]  text-white hover:bg-[#222222]",
    tertiary: "bg-transparent text-content-primary w-full text-start hover:bg-[#E5D3B3]/10",
    outline:
      "bg-transparent border-2 border-[#E5D3B3] text-[#E5D3B3] hover:bg-[#1E1E1E] hover:text-[#E5D3B3]",
  };

  const sizeStyles = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      <Text className="w-full leading-none">{title}</Text>
      {children}
    </button>
  );
};

export default Button;