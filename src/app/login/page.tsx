"use client";
import Card from "@/components/Card";
import { HStack } from "@/components/HStack";
import { LoginForm } from "@/components/LoginForm";
import { Layout } from "@/components/ui/Layout";
import Image from "next/image";

export default function Login() {
  return (
    <Layout disableFooter>
      <div className="min-h-[calc(100vh-192px)] flex items-center justify-center bg-content-secondary">
        <Card className="w-full max-w-7xl flex overflow-hidden rounded-xl shadow-lg border border-[#333]">
          <HStack className="w-full h-full flex-col lg:flex-row">
            <Image
              className="hidden lg:block w-2/3 h-full object-cover"
              src={require("@/assets/conference-room.png")}
              alt="Login Image"
              priority
            />
            <div className="w-full lg:w-1/3 flex items-center justify-center p-6">
              <LoginForm />
            </div>
          </HStack>
        </Card>
      </div>
    </Layout>
  );
}
