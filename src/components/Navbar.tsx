interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}

export function Navbar({ children, ...props }: NavbarProps) {
    return (
        <div className={`flex flex-row justify-between items-center p-4 fixed top-0 left-0 right-0 w-full ${props.className}`}>
            {children}
        </div>
    );
}