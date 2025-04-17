import React from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
}

export const Switch = ({ checked, onCheckedChange, id }: SwitchProps) => {
  return (
    <label htmlFor={id} className="relative inline-block w-11 h-6 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      <div
        className={`w-full h-full rounded-full transition-colors duration-200 ${
          checked ? "bg-[#E5D3B3]" : "bg-[#444]"
        }`}
      ></div>
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 shadow-md ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      ></div>
    </label>
  );
};