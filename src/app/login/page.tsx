'use client'
import Card from "@/components/Card";
import { HStack } from "@/components/HStack";
import { LoginForm } from "@/components/LoginForm";
import { Layout } from "@/components/ui/Layout";
import Image from "next/image";

export default function Login() {

  return (
    <Layout>
      <Card className="w-full sm:min-h-[300px] h-[500px]">
        <HStack className="w-full h-full flex-col lg:flex-row">
          <Image
            className="hidden lg:block w-2/3 h-full object-cover"
            src={require("@/assets/conference-room.png")}
            alt="Login Image"
          />
          <LoginForm className="w-full lg:w-1/3" />
        </HStack>
      </Card>
    </Layout>
  );
}
