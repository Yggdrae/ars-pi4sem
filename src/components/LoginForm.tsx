import { useRouter } from "next/navigation";
import Button from "./Button";
import { HStack } from "./HStack";
import { InputText } from "./InputText";
import { Text } from "./Text";
import { VStack } from "./VStack";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useToast } from "@/context/ToastContext";

interface IForm {
  email: string;
  senha: string;
}

export const LoginForm = ({ className = "" }: { className?: string }) => {
  const { login } = useAuth();
  const { showToast } = useToast(); 
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
          { email, senha },
          { withCredentials: true }
        );
        await login();
        showToast("Login realizado com sucesso!", "success");
        //alert("Login realizado com sucesso!");
        router.replace("/");
      } catch (err: any) {
        showToast("Erro no login. Verifique suas credenciais.", "error");
        //alert("Erro no login. Verifique suas credenciais.");
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <form onSubmit={handleLogin} className={`bg-[#2A2A2A] p-6 ${className}`}>
      <Text className="text-center text-[20px] font-bold text-content-primary">
        Acessar Conta
      </Text>
      <InputText
        id="email"
        label="Email"
        placeholder="Digite seu email"
        className="mt-8"
        value={email}
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputText
        id="password"
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
        className="mt-8"
        value={senha}
        disabled={isLoading}
        onChange={(e) => setSenha(e.target.value)}
      />
      <Button
        title="Acessar"
        className="mt-8 w-full"
        type="submit"
        loading={isLoading}
      />
    </form>
  );
};
