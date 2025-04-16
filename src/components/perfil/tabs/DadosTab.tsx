import Button from "@/components/Button";
import { HStack } from "@/components/HStack";
import { InputText } from "@/components/InputText";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";

export const DadosTab = () => {
    return (
        <VStack className="gap-6 mt-6">
            <HStack className="justify-between items-center">
                <Text className="text-lg font-semibold text-content-primary">Dados Pessoais</Text>
                <Button title="Editar" variant="secondary" className="w-fit" />
            </HStack>

            <div className="flex flex-wrap gap-4">
                <InputText
                    id="nome"
                    label="Nome Completo"
                    placeholder="Seu Nome"
                    className="w-full sm:w-[48%]"
                />
                <InputText
                    id="email"
                    label="Email"
                    placeholder="Seu Email"
                    className="w-full sm:w-[48%]"
                />
                <InputText
                    id="telefone"
                    label="Telefone"
                    placeholder="(11) 91234-5678"
                    className="w-full sm:w-[48%]"
                />
            </div>

            <VStack className="mt-8 gap-4">
                <Text className="text-lg font-semibold text-content-primary">Segurança</Text>
                <Button title="Alterar Senha" variant="secondary" className="w-fit" />
            </VStack>
        </VStack>
    );
};
