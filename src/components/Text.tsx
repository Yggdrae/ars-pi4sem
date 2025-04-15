import { JSX } from "react";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements; // permite mudar para h1, span, etc
}

export function Text({ children, className = "", as: Component = "p" }: TextProps) {
  return <Component className={className}>{children}</Component>;
}