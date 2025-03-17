interface HStackProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    gap?: number;
  }
  
  export function HStack({ children, gap, ...props }: HStackProps) {
    return (
      <div className={`flex flex-row ${gap ? `gap-${gap}` : ""} ${props.className}`}>{children}</div>
    );
  }