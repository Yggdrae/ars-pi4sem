import { useState } from "react";
import Button from "./Button";
import { HStack } from "./HStack";
import { InputText } from "./InputText";
import { Text } from "./Text";
import { VStack } from "./VStack";
import Link from "next/link";
import { useForm } from "../hooks/useForms";
import { useToast } from "@/context/ToastContext";

interface IForm {
  nome: string;
  email: string;
  senha: string;
  tipo: string;
}

export const RegisterForm = ({ className = "" }: { className?: string }) => {
  const { showToast } = useToast();
  const { submit, loading } = useForm<IForm>({
    endpoint: "/usuarios/create",
    method: "POST",
  });

  const nomeRegex = /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)+$/;
  const emailRegex = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,}$/;
  const senhaRegex =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  const [isLoading, setIsLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  const [nomeError, setNomeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [confSenhaError, setConfSenhaError] = useState("");

  const validateNome = (value: string) => {
    if (!nomeRegex.test(value)) return "Digite nome e sobrenome.";
    return "";
  };

  const validateEmail = (value: string) => {
    if (!emailRegex.test(value)) return "Digite um email válido.";
    return "";
  };

  const validateSenha = (value: string) => {
    if (!senhaRegex.test(value))
      return "Mín. 8 caracteres com letra, número e símbolo.";
    return "";
  };

  const validateConfirmacao = (value: string, original: string) => {
    if (value !== original) return "As senhas não conferem.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const nomeErr = validateNome(nome);
    const emailErr = validateEmail(email);
    const senhaErr = validateSenha(senha);
    const confErr = validateConfirmacao(confSenha, senha);

    setNomeError(nomeErr);
    setEmailError(emailErr);
    setSenhaError(senhaErr);
    setConfSenhaError(confErr);

    if (nomeErr || emailErr || senhaErr || confErr) {
      setIsLoading(false);
      return;
    }

    setTimeout(async () => {
      await submit({ nome, email, senha, tipo: "user" });
      showToast("Cadastro realizado com sucesso!", "success");
      setIsLoading(false);
      setNome("");
      setEmail("");
      setSenha("");
      setConfSenha("");
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-[#2A2A2A] p-6 sm:p-8 flex-grow ${className}`}
    >
      <Text className="text-center text-[20px] lg:text-[24px] text-content-primary font-bold">
        Criar Conta
      </Text>
      <Text className="text-center text-[12px] lg:text-[14px] text-content-ternary">
        Preencha os campos abaixo para se cadastrar
      </Text>

      <InputText
        id="nome"
        label="Nome Completo"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
          setNomeError(validateNome(e.target.value));
        }}
        onBlur={() => setNomeError(validateNome(nome))}
        errorText={nomeError}
        className="mt-4"
      />

      <InputText
        id="email"
        label="Email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(validateEmail(e.target.value));
        }}
        onBlur={() => setEmailError(validateEmail(email))}
        errorText={emailError}
        className="mt-4"
      />

      <InputText
        id="senha"
        label="Senha"
        placeholder="Digite sua senha"
        type="password"
        value={senha}
        onChange={(e) => {
          setSenha(e.target.value);
          setSenhaError(validateSenha(e.target.value));
        }}
        onBlur={() => setSenhaError(validateSenha(senha))}
        errorText={senhaError}
        className="mt-4"
      />

      <InputText
        id="confirmarSenha"
        label="Confirme sua Senha"
        placeholder="Digite sua senha novamente"
        type="password"
        value={confSenha}
        onChange={(e) => {
          setConfSenha(e.target.value);
          setConfSenhaError(validateConfirmacao(e.target.value, senha));
        }}
        onBlur={() => setConfSenhaError(validateConfirmacao(confSenha, senha))}
        errorText={confSenhaError}
        className="mt-4"
      />

      <Button title="Cadastrar" className="mt-8 w-full" loading={isLoading} />

      <HStack className="justify-center mt-8" gap={1}>
        <Text className="text-[12px] lg:text-[14px] text-content-ternary">
          Já possui uma conta?
        </Text>
        <Link href="/login" passHref>
          <Text className="text-[12px] lg:text-[14px] text-content-primary cursor-pointer">
            Faça Login
          </Text>
        </Link>
      </HStack>
    </form>
  );
};
