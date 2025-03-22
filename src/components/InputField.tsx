import { useState } from "react";

export function InputField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    const [focused, setFocused] = useState(false);

    return (
        <div className="relative w-full">
            <label
                className={`absolute left-2 transition-all duration-200 text-gray-500 text-sm pointer-events-none ${
                    focused || props.value ? "-top-4 text-gray-500 text-xs bg-dark-content p-1" : "top-2.5 text-gray-500"
                }`}
            >
                {label}
            </label>
            <input
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onFocus={() => setFocused(true)}
                onBlur={(e) => setFocused(e.target.value.length > 0)}
                {...props}
            />
        </div>
    );
}
