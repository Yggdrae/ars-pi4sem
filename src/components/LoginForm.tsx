import { useRouter } from "next/navigation";
import Button from "./Button";
import { InputText } from "./InputText";
import { Text } from "./Text";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useToast } from "@/context/ToastContext";

export const LoginForm = ({ className = "" }: { className?: string }) => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin");
          router.push(redirectPath);
          return;
        }
        router.push("/");
      } catch {
        showToast("Erro no login. Verifique suas credenciais.", "error");
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <form
      onSubmit={handleLogin}
      className={`w-full max-w-sm animate-fade-in flex flex-col gap-6 ${className}`}
    >
      <Text className="text-center text-[22px] font-bold text-content-primary">
        Bem-vindo de volta
      </Text>

      <InputText
        id="email"
        label="Email"
        placeholder="Digite seu email"
        value={email}
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputText
        id="password"
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
        value={senha}
        disabled={isLoading}
        onChange={(e) => setSenha(e.target.value)}
      />

      <Button
        title="Acessar"
        type="submit"
        loading={isLoading}
        className="w-full"
      />

      <div className="text-right">
        <Link
          href="/cadastro"
          className="text-sm text-content-ternary hover:text-content-primary transition"
        >
          Não tenho uma conta!
        </Link>
      </div>
    </form>
  );
};
