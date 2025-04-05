import React, { ButtonHTMLAttributes } from 'react';
import { Text } from './Text';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  title: string;
  className?: string;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  title,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'text-center text-[30px] font-family-heading w-[160] h-[48]';
  
  const variantStyles = {
    primary: 'bg-[#E5D3B3] hover:bg-[#d8c6a6] text-[#1E1E1E]',
    secondary: 'bg-[#1E1E1E] hover:bg-[#2a2a2a] text-[#FFFFFF]',
    tertiary: 'bg-transparent text-content-primary w-full rounded-none',
    outline: 'bg-transparent border-2 border-[#E5D3B3] text-[#E5D3B3] hover:bg-[#1E1E1E]'
  };
  
  const sizeStyles = {
    sm: 'py-2 px-4',
    md: 'py-3 px-6',
    lg: 'py-4 px-8'
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} rounded-lg transition-colors duration-200 cursor-pointer ${className}`}
      {...props}
    >
      <Text className='text-[16px] w-full'>{title}</Text>
    </button>
  );
};

export default Button;