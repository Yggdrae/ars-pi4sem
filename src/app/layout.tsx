import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import localfont from "next/font/local";
import "./globals.css";

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Eldorado",
  description: "Eldorado - Locação de Salas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoMono.variable} antialiased h-screen bg-content-secondary`}
      >
        {children}
      </body>
    </html>
  );
}
