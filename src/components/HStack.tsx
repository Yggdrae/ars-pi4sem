import React, { forwardRef } from "react";

interface HStackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

const hGap = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  7: "gap-7",
  8: "gap-8",
  9: "gap-9",
  10: "gap-10",
};

export const HStack = forwardRef<HTMLDivElement, HStackProps>(
  ({ children, gap = 0, className = "", ...props }, ref) => {
    const gapClass = hGap[gap as keyof typeof hGap] || "";
    return (
      <div
        ref={ref}
        className={`flex flex-row ${gapClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

HStack.displayName = "HStack";
