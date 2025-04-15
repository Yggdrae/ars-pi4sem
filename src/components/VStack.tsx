interface VStackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

const vGap = {
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

export function VStack({ children, gap = 0, className = "", ...props }: VStackProps) {
  const gapClass = vGap[gap as keyof typeof vGap] || "";
  return (
    <div className={`flex flex-col ${gapClass} ${className}`} {...props}>
      {children}
    </div>
  );
}