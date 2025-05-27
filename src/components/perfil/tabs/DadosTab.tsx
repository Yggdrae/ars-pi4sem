import Button from "@/components/Button";
import { HStack } from "@/components/HStack";
import { InputText } from "@/components/InputText";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { useAuth } from "@/context/authContext";
import { useState } from "react";

export const DadosTab = () => {
  const { userData } = useAuth();
  const [nome, setNome] = useState<string>(userData?.nome || "");
  const [email, setEmail] = useState<string>(userData?.email || "");
  const [editView, setEditView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <VStack className="gap-6 mt-6">
      <HStack className="justify-between items-center">
        <Text className="text-lg font-semibold text-content-primary">
          Dados Pessoais
        </Text>
        {!editView ? (
          <Button
            title="Editar"
            variant="secondary"
            className="w-fit"
            onClick={() => setEditView(true)}
          />
        ) : (
          <HStack className="gap-2">
            <Button
              title="Cancelar"
              variant="primary"
              className="w-fit bg-error-500"
              onClick={() => setEditView(false)}
            />
            <Button
              title="Salvar"
              variant="primary"
              className="w-fit"
              loading={isLoading}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  setEditView(false);
                }, 2000);
              }}
            />
          </HStack>
        )}
      </HStack>

      <div className="flex flex-wrap gap-4">
        <InputText
          id="nome"
          label="Nome Completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu Nome"
          className="w-full sm:w-[48%]"
          disabled={!editView}
        />
        <InputText
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu Email"
          className="w-full sm:w-[48%]"
          disabled={!editView}
        />
      </div>

      <VStack className="mt-8 gap-4">
        <Text className="text-lg font-semibold text-content-primary">
          Segurança
        </Text>
        <Button title="Alterar Senha" variant="secondary" className="w-fit" />
      </VStack>
    </VStack>
  );
};
