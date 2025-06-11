import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  title: "Eldorado",
  description: "Eldorado",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-playfair-display",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className={`antialiased h-screen bg-content-secondary`}>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
