'use client';
import Card from "@/components/Card";
import { HStack } from "@/components/HStack";
import { RegisterForm } from "@/components/RegisterForm";
import { Layout } from "@/components/ui/Layout";
import Image from "next/image";

export default function Cadastro() {
  return (
    <Layout disableFooter>
      <div className="min-h-[calc(100vh-192px)] flex items-center justify-center bg-content-secondary px-4 py-8">
        <Card className="w-full max-w-7xl flex overflow-hidden rounded-xl shadow-lg border border-[#333]">
          <HStack className="w-full h-full flex-col lg:flex-row min-h-[520px]">
            <div className="hidden lg:block w-2/3 h-full">
              <Image
                className="w-full h-full object-cover"
                src={require("@/assets/conference-room.png")}
                alt="Imagem de Cadastro"
                priority
              />
            </div>
            <div className="w-full lg:w-1/3 flex items-center justify-center">
              <RegisterForm />
            </div>
          </HStack>
        </Card>
      </div>
    </Layout>
  );
}
