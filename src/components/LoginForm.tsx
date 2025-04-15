import Button from "./Button"
import { HStack } from "./HStack"
import { InputText } from "./InputText"
import { Text } from "./Text"
import { VStack } from "./VStack"

export const LoginForm = () => {
    return (
        <VStack className="flex-[1] bg-[#2A2A2A] p-8">
            <Text className="text-center text-[32px] sm:text-[24px] text-content-primary font-family-heading font-bold">Acessar Conta</Text>
            <Text className="text-center text-[18px] sm:text-[12px] text-content-ternary font-family-heading font-bold">Entre com suas credenciais para continuar</Text>
            <InputText id="email" label="Email" placeholder="Digite seu email" className="mt-8" />
            <InputText id="password" type="password" label="Senha" placeholder="Digite sua senha" className="mt-8" />
            <Text className="mt-2 text-end text-[14px] sm:text-[10px] text-content-primary font-family-heading cursor-pointer">Esqueceu sua senha?</Text>
            <Button title={"Acessar"} className="mt-8" />
            <HStack className="justify-center mt-8" gap={1}>
                <Text className="text-center text-[20px] sm:text-[18px] text-content-ternary font-family-heading">Não tem uma conta?</Text>
                <Text className="text-center text-[20px] sm:text-[18px] text-content-primary font-family-heading cursor-pointer">Cadastre-se</Text>
            </HStack>
        </VStack>
    )
}