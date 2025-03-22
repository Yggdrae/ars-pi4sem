'use client'
import { Button } from "@/components/Button";
import { HStack } from "@/components/HStack";
import Image from 'next/image'
import { VStack } from "@/components/VStack";
import Card from "@/components/Card";
import { InputField } from "@/components/InputField";

export default function Home() {
  const buttonType = "primary"

  return (
    <div className="flex h-full w-full justify-center items-center bg-dark-content">
      <HStack className="w-4/6 h-full">
        <Image src={require("@/assets/login.png")} alt="login" className="w-full h-full" />
      </HStack>
      <VStack gap={6} className="border-2 border-l-error-500 w-2/6 h-full p-12 justify-center items-center">
        <Image src={require("@/assets/nestjs.svg")} alt="login" width={200} />
        <InputField className='text-white border rounded py-2 px-4 w-full' label="Username" />
        <InputField className='text-white border rounded py-2 px-4 w-full' label="Password" type="password" />
        <Button className="w-2/5 hover:border-white" name="Enter" variant="outline" color="error" rounded />
        <VStack className="w-full justify-center items-center">
          <Button className="hover:delay-100 w-3/4 hover:text-white" name="Forgot your password?" variant="ghost" size="sm" color="error" rounded />
          <Button className="hover:delay-100 w-3/4 hover:text-white" name="Create an account" variant="ghost" size="sm" color="error" rounded />
        </VStack>
      </VStack>
    </div>
  );
}
