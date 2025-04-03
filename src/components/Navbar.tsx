interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}

export function Navbar({ children, ...props }: NavbarProps) {
    return (
        <div className={`flex flex-row bg-content-secondary border border-b-content-primary/30 w-full self-center justify-between items-center py-4 px-20 sticky ${props.className}`}>
            {children}
        </div>
    );
}""