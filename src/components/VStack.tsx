interface VStackProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    gap?: number;
}

export function VStack({ children, gap, ...props }: VStackProps) {
  return (
    <div className={`flex flex-col ${gap ? `gap-${gap}` : ""} ${props.className}`}>{children}</div>
  );
}