import React from "react";

interface AccordionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
    title,
    isOpen,
    onToggle,
    children,
    className
}) => {
    return (
        <div className="border border-gray-600 rounded">
            <button
                type="button"
                className={`${className} w-full cursor-pointer text-left p-2 hover:bg-[#c9b79b] ${isOpen
                    ? "bg-[#c9b79b] text-black font-semibold"
                    : "bg-[#E5D3B3] text-[#1e1e1e]"
                    }`}
                onClick={onToggle}
            >
                {title}
            </button>

            {isOpen && <div className="flex gap-4 px-4 py-2">{children}</div>}
        </div>
    );
};
