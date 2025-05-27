"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { HStack } from "../HStack";
import { VStack } from "../VStack";
import { useAuth } from "@/context/authContext";
import Button from "../Button";
import { useToast } from "@/context/ToastContext";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Navbar({ children, ...props }: NavbarProps) {
  const { isLoggedIn, userData, logout } = useAuth();
  const { showToast } = useToast();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showUserMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  const handleLogout = async () => {
    setTimeout(async () => {
      await logout();
      showToast("Logout realizado com sucesso!", "success");
      setShowUserMenu(false);
      router.replace("/");
    }, 2000);
  };

  return (
    <div
      className={`flex flex-row bg-content-secondary border border-b-content-primary/30 w-full justify-between items-center py-4 px-6 sm:px-10 lg:px-20 sticky top-0 z-50 ${props.className}`}
    >
      <Link href="/">
        <HStack gap={3} className="cursor-pointer items-center text-center">
          <FaHome className="text-content-primary" size={24} />
          <p className="text-content-primary text-[18px] sm:text-[20px] font-family-heading font-bold">
            Eldorado
          </p>
        </HStack>
      </Link>

      <VStack className="relative">
        <div className="relative">
          <FaUser
            className="text-content-primary cursor-pointer"
            size={22}
            onClick={() => setShowUserMenu((prev) => !prev)}
          />

          {showUserMenu && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-4 w-48 bg-[#2A2A2A] border border-content-primary/30 rounded-md shadow-lg py-2 z-50"
            >
              {isLoggedIn && userData ? (
                <>
                  <Link
                    href="/perfil"
                    className="block px-4 py-2 text-sm text-content-primary hover:bg-[#E5D3B3]/10"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Perfil
                  </Link>
                  {userData.tipo === "admin" ? (
                    <Link
                      href="/administrar"
                      className="block px-4 py-2 text-sm text-content-primary hover:bg-[#E5D3B3]/10"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Administrar
                    </Link>
                  ) : null}
                  <button
                    className="block px-4 py-2 text-sm text-content-primary hover:bg-[#E5D3B3]/10 w-full text-left"
                    onClick={handleLogout}
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm text-content-primary hover:bg-[#E5D3B3]/10"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/cadastro"
                    className="block px-4 py-2 text-sm text-content-primary hover:bg-[#E5D3B3]/10"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Cadastre-se
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </VStack>
    </div>
  );
}
