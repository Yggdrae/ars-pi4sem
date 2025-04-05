"use client";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col w-screen max-w-screen h-screen min-h-screen items-center overflow-x-hidden s">
      <Navbar className="z-99 fixed"/>

      <main className="px-15 max-w-screen w-full flex-1">{children}</main>

      <Footer className="w-full items-start"/>
    </div>
  );
};
