"use client";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  disableNav?: boolean;
  disableFooter?: boolean;
}

export const Layout = ({ children, disableNav, disableFooter }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {!disableNav && <Navbar />}

      <main className="flex-1 px-4 sm:px-8 lg:px-20 pt-12 pb-12">
        {children}
      </main>

      {!disableFooter && <Footer />}
    </div>
  );
};
