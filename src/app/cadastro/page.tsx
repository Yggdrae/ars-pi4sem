'use client'
import { HStack } from "@/components/HStack";
import { RegisterForm } from "@/components/RegisterForm";
import { Layout } from "@/components/ui/Layout";
import Image from "next/image";

export default function Cadastro() {
    return (
        <Layout>
            <HStack>
                <Image
                    className="hidden lg:block w-2/3 h-full object-cover"
                    src={require("@/assets/conference-room.png")}
                    alt="Login Image"
                />
                <RegisterForm className="w-full lg:w-1/3"/>
            </HStack>
        </Layout>
    )
}