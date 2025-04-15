"use client";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-1 px-4 sm:px-8 lg:px-20 pt-24">
        {children}
      </main>

      <Footer className="w-full" />
    </div>
  );
};
