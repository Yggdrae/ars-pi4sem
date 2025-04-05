'use client'
import Link from "next/link";
import { FaHome, FaUser } from "react-icons/fa";
import { HStack } from "./HStack";
import { VStack } from "./VStack";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { redirect } from "next/navigation";


interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}

export function Navbar({ children, ...props }: NavbarProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Tipamos o evento como MouseEvent
        function handleClickOutside(event: MouseEvent) {
            // Precisamos fazer um type assertion para event.target
            if (
                showUserMenu &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShowUserMenu(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

    return (
        <div className={`flex flex-row bg-content-secondary border border-b-content-primary/30 w-full self-center justify-between items-center py-4 px-20 sticky ${props.className}`}>
            <HStack gap={3} className="cursor-pointer items-center text-center">
                <FaHome className="text-content-primary" size={30} />
                <p className="text-content-primary text-[20px] font-family-heading font-bold place-self-center">Eldorado</p>
            </HStack>
            <VStack >
                <FaUser className="text-content-primary" onClick={() => setShowUserMenu(!showUserMenu)} style={{ cursor: "pointer" }} size={25} />

                {showUserMenu && (
                    <div ref={menuRef} className="absolute right-[5%] mt-10 w-48 bg-[#2A2A2A] border border-content-primary/30 rounded-md shadow-lg py-1 z-99">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 text-sm text-content-primary hover:bg-[#E5D3B3]/10 transition-colors"
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    Perfil
                                </Link>
                                <Link
                                    href="/logout"
                                    className="block px-4 py-2 text-sm text-content-primary hover:bg-[#E5D3B3]/10 transition-colors"
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    Sair
                                </Link>
                            </>
                        ) : (
                            <Button
                                title="Login"
                                variant="tertiary"
                                className="block px-2 text-sm hover:bg-[#E5D3B3]/10 transition-colors"
                                onClick={() => {
                                    setShowUserMenu(false);
                                    redirect('/login')
                                }}
                            >
                                Login
                            </Button>
                        )}
                    </div>
                )}
            </VStack>
        </div>
    );
}