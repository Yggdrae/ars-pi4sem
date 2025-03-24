'use client'
import { Button } from "@/components/Button";
import { HStack } from "@/components/HStack";
import Image from 'next/image'
import { VStack } from "@/components/VStack";
import Card from "@/components/Card";
import { InputField } from "@/components/InputField";
import { Navbar } from "@/components/Navbar";
import { redirect } from "next/navigation";

export default function Home() {
  const buttonType = "primary"

  return (
    <div className="flex h-full w-full justify-center items-center bg-dark-content font-mono">
      <Navbar>
        <HStack gap={4}>
          <Image src={require("@/assets/nestjs.svg")} alt="login" width={40} />
          <Button name="Home" variant="ghost" color="error" size="md"  leftIcon="pi-home"/>
          <Button name="Reservar" variant="ghost" color="error" size="md"  leftIcon="pi-calendar-plus"/>
        </HStack>
        <HStack gap={4}>
          <Button name="Login" variant="ghost" color="error" size="md" leftIcon="pi-sign-in"/>
          <Button name="Criar conta" variant="outline" color="error" size="md" rounded={"full"} />
        </HStack>
      </Navbar>
    </div>
  );
}
