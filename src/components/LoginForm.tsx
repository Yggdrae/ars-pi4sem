import { useRouter } from "next/navigation";
import Button from "./Button";
import { HStack } from "./HStack";
import { InputText } from "./InputText";
import { Text } from "./Text";
import { VStack } from "./VStack";
import Link from "next/link";
import { useForm } from "@/hooks/useForms";
import { useState } from "react";

interface IForm {
  email: string;
  senha: string;
}

export const LoginForm = ({ className = "" }: { className?: string }) => {
  const { submit, loading, error, data } = useForm<IForm>({
    endpoint: "/auth/login",
    method: "POST",
    onSuccess: (res) => console.log("Enviado!", res),
    onError: (err) => console.log("Erro!", err),
  });

  const nomeRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const [senha, setSenha] = useState<string>("");

  const checkFields = async () => {
    const isEmailValid = nomeRegex.test(email);
    if (!isEmailValid) {
      setEmailError("Insira um email válido!");
      return;
    }
    await submit({ email, senha });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkFields();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-[#2A2A2A] p-6 sm:p-8 flex-grow ${className}`}
    >
      <Text className="text-center text-[20px] lg:text-[24px] text-content-primary font-family-heading font-bold">
        Acessar Conta
      </Text>
      <Text className="text-center text-[12px] lg:text-[14px] text-content-ternary font-family-heading font-bold">
        Entre com suas credenciais para continuar
      </Text>
      <InputText
        id="email"
        label="Email"
        placeholder="Digite seu email"
        className="mt-8"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorText={emailError}
      />
      <InputText
        id="password"
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
        className="mt-8"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <Text className="mt-2 text-end text-[12px] lg:text-[14px] text-content-primary font-family-heading cursor-pointer">
        Esqueceu sua senha?
      </Text>
      <Button title="Acessar" className="mt-8 w-full" type="submit" />{" "}
      {/* botão do tipo submit! */}
      <HStack className="justify-center mt-8" gap={1}>
        <Text className="text-center text-[12px] lg:text-[14px] text-content-ternary font-family-heading">
          Não tem uma conta?
        </Text>
        <Link href={"/cadastro"} passHref>
          <Text className="text-center text-[12px] lg:text-[14px] text-content-primary font-family-heading cursor-pointer">
            Cadastre-se
          </Text>
        </Link>
      </HStack>
    </form>
  );
};
