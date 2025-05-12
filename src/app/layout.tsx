import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";

export const metadata: Metadata = {
  title: "Eldorado",
  description: "Eldorado - Locação de Salas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`antialiased h-screen bg-content-secondary`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
