interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}

export function Navbar({ children, ...props }: NavbarProps) {
    return (
        <div className={`flex flex-row bg-dark-800 w-99/100 self-center justify-between items-center py-4 px-8 fixed top-2 rounded-lg ${props.className}`}>
            {children}
        </div>
    );
}