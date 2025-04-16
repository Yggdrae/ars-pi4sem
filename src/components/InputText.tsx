import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  placeholder?: string;
  className?: string;
}

export const InputText = ({
  label,
  id,
  type = "text",
  placeholder = "",
  className = "",
  ...props
}: InputTextProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="text-sm text-content-primary">
        {label}
      </label>
      <div className="relative w-full">
        <input
          id={id}
          name={id}
          type={isPassword && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          className="bg-[#1E1E1E] border border-[#44403c] text-sm text-white placeholder-gray-400 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#E5D3B3] focus:border-[#E5D3B3] transition-colors w-full"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-content-ternary hover:text-content-primary"
            aria-label="Mostrar ou ocultar senha"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
};