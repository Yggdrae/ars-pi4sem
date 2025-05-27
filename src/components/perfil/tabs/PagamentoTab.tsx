"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { MeioPagamento } from "./MeioPagamento";
import { ICartao } from "@/interfaces/ICartao";
import { useCartao } from "@/hooks/useCartao";
import { useAuth } from "@/context/authContext";
import { useToast } from "@/context/ToastContext";
import { Modal } from "@/components/Modal";
import { InputText } from "@/components/InputText";

export const PagamentoTab = () => {
  const { userData } = useAuth();
  const { showToast } = useToast();
  const { getCartoes, deleteCartao } = useCartao();

  const [meiosPagamento, setMeiosPagamento] = useState<ICartao[]>([]);
  const [modalVisivel, setModalVisivel] = useState<boolean>(false);

  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [nome, setNome] = useState("");
  const [bandeira, setBandeira] = useState("");

  const handleDeleteCartao = async (id: number) => {
    await deleteCartao(id);
    showToast("Cartão excluído com sucesso!", "success");
    const updated = meiosPagamento.filter((c) => c.id !== id);
    setMeiosPagamento(updated);
  };

  const detectarBandeira = (numero: string) => {
    const n = numero.replace(/\D/g, "");
    if (/^4[0-9]{0,}$/.test(n)) return "VISA";
    if (/^(5[1-5]|2[2-7])[0-9]{0,}$/.test(n)) return "MASTERCARD";
    if (/^3[47][0-9]{0,}$/.test(n)) return "AMEX";
    return "";
  };

  const handleAdicionarCartao = () => {
    const novaBandeira = detectarBandeira(numero);
    if (!novaBandeira) {
      showToast("Número de cartão inválido ou não reconhecido.", "error");
      return;
    }

    // Simular envio
    showToast("Cartão adicionado com sucesso!", "success");
    setMeiosPagamento((prev) => [
      ...prev,
      {
        id: Math.random(), // simulado
        numeroCriptografado: numero.slice(-4),
        nomeCriptografado: nome,
        validadeCriptografada: validade,
        cvvCriptografado: "•••",
        favorito: false,
        criadoEm: new Date().toISOString(),
      },
    ]);
    setModalVisivel(false);
    setNumero("");
    setValidade("");
    setCvv("");
    setNome("");
    setBandeira("");
  };

  useEffect(() => {
    const fetch = async () => {
      const cards = await getCartoes(userData!.id);
      setMeiosPagamento(cards);
    };
    fetch();
  }, []);

  return (
    <VStack className="gap-6 mt-6">
      <HStack className="justify-between items-center">
        <Text className="text-lg font-semibold text-content-primary">
          Métodos de Pagamento
        </Text>
        <Button
          title="Adicionar Cartão"
          variant="primary"
          className="w-fit"
          onClick={() => setModalVisivel(true)}
        />
      </HStack>

      <Modal
        isOpen={modalVisivel}
        onClose={() => setModalVisivel(false)}
        title="Adicionar Cartão"
        footer={
          <>
            <Button
              title="Cancelar"
              variant="secondary"
              onClick={() => setModalVisivel(false)}
            />
            <Button title="Salvar" onClick={handleAdicionarCartao} />
          </>
        }
      >
        <VStack className="gap-4">
          <InputText
            id="numero"
            label="Número do Cartão"
            value={numero}
            onChange={(e) => {
              setNumero(e.target.value);
              setBandeira(detectarBandeira(e.target.value));
            }}
            placeholder="Digite os números do cartão"
          />
          <InputText
            id="validade"
            label="Validade"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            placeholder="MM/AA"
          />
          <InputText
            id="cvv"
            label="Código de Segurança"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
          />
          <InputText
            id="nome"
            label="Nome no Cartão"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Como aparece no cartão"
          />
          {bandeira && (
            <Text className="text-sm text-content-ternary">
              Bandeira detectada: {bandeira}
            </Text>
          )}
        </VStack>
      </Modal>

      {meiosPagamento.map((pagamento) => (
        <MeioPagamento
          key={pagamento.id}
          pagamento={{
            bandeiraCartao: "VISA", // ou usar `bandeira` se vier do back
            nomeCartao: pagamento.nomeCriptografado,
            numeroCartao: pagamento.numeroCriptografado,
            validadeCartao: pagamento.validadeCriptografada,
            padrao: pagamento.favorito,
          }}
          onDefinirPadrao={() => {}}
          onRemover={() => handleDeleteCartao(pagamento.id)}
        />
      ))}
    </VStack>
  );
};
