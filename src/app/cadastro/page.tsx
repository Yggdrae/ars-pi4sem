'use client';
import { HStack } from "@/components/HStack";
import { RegisterForm } from "@/components/RegisterForm";
import { Layout } from "@/components/ui/Layout";
import Image from "next/image";

export default function Cadastro() {
  return (
    <Layout disableFooter>
      <HStack className="w-full h-fit flex-col lg:flex-row items-center">
        <div className="hidden lg:block w-full lg:w-3/5 h-full">
          <Image
            className="w-full h-full object-cover"
            src={require("@/assets/conference-room.png")}
            alt="Imagem de Cadastro"
            priority
          />
        </div>
        <div className="w-full lg:w-2/5 h-full flex items-center justify-center bg-content-secondary px-4 py-6">
          <RegisterForm className="w-full max-w-md" />
        </div>
      </HStack>
    </Layout>
  );
}
