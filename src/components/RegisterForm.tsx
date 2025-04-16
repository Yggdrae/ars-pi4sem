import Button from "./Button"
import { HStack } from "./HStack"
import { InputText } from "./InputText"
import { Text } from "./Text"
import { VStack } from "./VStack"
import Link from "next/link";

export const RegisterForm = ({ className = "" }: { className?: string }) => {

    return (
        <VStack className={`bg-[#2A2A2A] p-6 sm:p-8 flex-grow ${className}`}>
            <Text className="text-center text-[20px] lg:text-[24px] text-content-primary font-family-heading font-bold">Criar Conta</Text>
            <Text className="text-center text-[12px] lg:text-[14px] text-content-ternary font-family-heading font-bold">Preencha os campos abaixo para se cadastrar </Text>
            <InputText id="nome" label="Nome Completo" placeholder="Digite seu nome" className="mt-4" />
            <InputText id="email" label="Email" placeholder="Digite seu email" className="mt-4" />
            <InputText id="password" type="password" label="Senha" placeholder="Digite sua senha" className="mt-4" />
            <InputText id="passconfirm" type="password" label="Confirme sua Senha" placeholder="Digite sua senha novamente  " className="mt-4" />
            <Button title={"Cadastrar"} className="mt-8" />
        </VStack>
    )
}