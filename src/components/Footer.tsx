interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}

export function Footer({ children, ...props }: FooterProps) {
    return (
        <div className={`flex flex-row bg-content-secondary border-t border-t-content-primary/30 w-full h-[270px] self-center justify-center py-8 px-20 ${props.className}`}>
            {children}
        </div>
    );
}""