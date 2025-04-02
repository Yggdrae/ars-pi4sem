"use client";

import Image from "next/image";
import { HStack } from "../HStack";
import { Navbar } from "../Navbar";
import { Button } from "../Button";
import { FaHome, FaUser } from "react-icons/fa";
import { Footer } from "../Footer";
import { VStack } from "../VStack";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen min-h-screen items-center">
      <Navbar>
        <HStack gap={3}>
          <FaHome className="text-content-primary" size={30} />
          <p className="text-content-primary text-[20px] font-family-heading">Golden Space</p>
        </HStack>
        <FaUser className="text-content-primary" size={25} />
      </Navbar>
      <main className="px-15 w-full h-screen">{children}</main>
      <Footer className="w-full items-start">
        <VStack className="w-full h-full justify-between">
          <HStack className="justify-between">
            <VStack className="w-1/4">
              <p className="text-content-primary text-[18px] font-family-heading mb-6">Golden Space</p>
              <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Soluções elegantes para suas reuniões corporativas.</p>
            </VStack>
            <VStack className="w-1/4">
              <p className="text-content-primary text-[18px] font-family-heading mb-6">Contato</p>
              <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Email: contato@goldenspace.com</p><></>
              <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Telefone: (11) 91234-5678</p><></>
              <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Endereço: Av. Paulista, 1000 - São Paulo, SP</p>
            </VStack>
            <VStack className="w-1/4">
              <p className="text-content-primary text-[18px] font-family-heading mb-6">Horários</p>
              <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Segunda a Sexta: 08:00 - 20:00</p>
              <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Sábado: 09:00 - 15:00</p>
              <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Domingo: Fechado</p>
            </VStack>
          </HStack>
          <div className="self-center border-t-1 w-full border-t-content-ternary/30">
            <p className="text-[#99A1AF] text-[16px] font-family-heading text-center text-wrap mt-6">© 2025 Golden Space. Todos os direitos reservados.</p>
          </div>
          </VStack>
      </Footer>
    </div>
  );
};
