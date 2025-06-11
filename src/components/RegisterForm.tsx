import { useState } from "react";
import Button from "./Button";
import { HStack } from "./HStack";
import { InputText } from "./InputText";
import { Text } from "./Text";
import { VStack } from "./VStack";
import Link from "next/link";
import { useForm } from "../hooks/useForms";
import { useToast } from "@/context/ToastContext";
import { useCadastro } from "@/hooks/useCadastro";

interface IForm {
  nome: string;
  email: string;
  senha: string;
  tipo: string;
}

export const RegisterForm = ({ className = "" }: { className?: string }) => {
  const { showToast } = useToast();
  const { createUser } = useCadastro();

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

  const senhaStatus = (senha: string) => ({
    length: senha.length >= 8,
    letra: /[a-zA-Z]/.test(senha),
    numero: /\d/.test(senha),
    simbolo: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(senha),
    confirma: senha === confSenha,
  });

  const status = senhaStatus(senha);

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
      await createUser({ nome, email, senha, tipo: "user" })
        .then(() => {
          showToast("Cadastro realizado com sucesso!", "success");
          setNome("");
          setEmail("");
          setSenha("");
          setConfSenha("");
        })
        .catch(() => {
          showToast("Erro no cadastro. Tente novamente.", "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
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
      />
      {senha && (
        <VStack className="text-[12px] text-content-ternary space-y-1">
          <Text className={status.length ? "text-green-500" : "text-red-500"}>
            {status.length ? "✔" : "✖"} Mínimo 8 caracteres
          </Text>
          <Text className={status.letra ? "text-green-500" : "text-red-500"}>
            {status.letra ? "✔" : "✖"} Pelo menos uma letra
          </Text>
          <Text className={status.numero ? "text-green-500" : "text-red-500"}>
            {status.numero ? "✔" : "✖"} Pelo menos um número
          </Text>
          <Text className={status.simbolo ? "text-green-500" : "text-red-500"}>
            {status.simbolo ? "✔" : "✖"} Pelo menos um símbolo
          </Text>
          <Text className={status.confirma ? "text-green-500" : "text-red-500"}>
            {status.confirma ? "✔" : "✖"} Senhas iguais
          </Text>
        </VStack>
      )}

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
      />

      <Button title="Cadastrar" className="mt-10 w-full" loading={isLoading} />

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
