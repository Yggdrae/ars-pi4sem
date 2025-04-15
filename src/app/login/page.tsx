'use client'
import Button from "@/components/Button";
import Card from "@/components/Card";
import { HStack } from "@/components/HStack";
import { InputText } from "@/components/InputText";
import { LoginForm } from "@/components/LoginForm";
import { Text } from "@/components/Text";
import { Layout } from "@/components/ui/Layout";
import { VStack } from "@/components/VStack";
import Image from "next/image";

export default function Home() {
  const buttonType = "primary"

  return (
    <Layout>
      <Card className="w-full sm:min-h-[300px] h-[500px]">
        <HStack className="w-full h-full">
          <Image className="flex-[2]" src={require("@/assets/conference-room.png")} alt={"Login Image"} />
          <LoginForm />
        </HStack>
      </Card>
    </Layout>
  );
}
