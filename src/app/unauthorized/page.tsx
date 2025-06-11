'use client'
import Button from "@/components/Button";
import { Text } from "@/components/Text";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-content-secondary px-4 text-center">
      <Text className="text-4xl font-bold text-content-primary mb-4">
        Acesso negado
      </Text>
      <Text className="text-lg text-content-ternary mb-8">
        Você não tem permissão para acessar esta página.
      </Text>
      <Button
        title="Voltar para o início"
        className="px-6 py-3 bg-content-primary text-content-secondary rounded-lg shadow transition"
        onClick={() => (window.location.href = "/")}
      />
    </div>
  );
}
