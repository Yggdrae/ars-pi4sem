import React from "react";

interface DividerProps {
    direction?: "horizontal" | "vertical";
    thickness?: string;
    color?: string;
    className?: string;
}

export const Divider: React.FC<DividerProps> = ({
    direction = "horizontal",
    thickness,
    color = "#4B5563",
    className = "",
}) => {
    const isHorizontal = direction === "horizontal";

    const baseStyle = isHorizontal
        ? `w-full h-[${thickness || "1px"}]`
        : `h-full w-[${thickness || "1px"}]`;

    return (
        <div
            className={`${baseStyle} ${className}`}
            style={{ backgroundColor: color }}
        />
    );
};