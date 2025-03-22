interface HStackProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  }

  const gapClasses = {
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
  }
  
  export function HStack({ children, gap, ...props }: HStackProps) {
    return (
      <div className={`flex flex-row ${gapClasses[gap!]} ${props.className}`}>{children}</div>
    );
  }