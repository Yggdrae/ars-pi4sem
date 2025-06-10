"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { MeioPagamento } from "./MeioPagamento";
import { ICartao, IPostResponse } from "@/interfaces/ICartao";
import { useCartao } from "@/hooks/useCartao";
import { useAuth } from "@/context/authContext";
import { useToast } from "@/context/ToastContext";
import { Modal } from "@/components/Modal";
import { InputText } from "@/components/InputText";
import { useForm } from "@/hooks/useForms";
import { FaPlus } from "react-icons/fa";

interface IForm {
  numero: string;
  nomeTitular: string;
  validade: string;
  cvv: string;
  bandeira: string;
  usuarioId: number;
}

export const PagamentoTab = () => {
  const { userData } = useAuth();
  const { showToast } = useToast();
  const { getCartoes, deleteCartao, adicionarCartao } = useCartao();

  const [meiosPagamento, setMeiosPagamento] = useState<ICartao[]>([]);
  const [modalVisivel, setModalVisivel] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

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

  const detectarBandeira = (
    numero: string
  ): "VISA" | "MASTERCARD" | "ELO" | "" => {
    const n = numero.replace(/\D/g, "");

    if (n.length !== 16) return "";

    if (
      /^(4011(78|79)|4312(74|75)|4389(35|36)|4514(16|17)|4576(31|32)|5041(75|76)|5067(01|02)|5090(41|42)|6277(80|81)|6362(97|98)|6363(68|69))[0-9]{10}$/.test(
        n
      )
    ) {
      return "ELO";
    }

    if (/^4[0-9]{15}$/.test(n)) return "VISA";

    if (
      /^5[1-5][0-9]{14}$/.test(n) ||
      /^2(2[2-9][0-9]{12}|[3-6][0-9]{13}|7([01][0-9]{12}|20[0-9]{12}))$/.test(n)
    ) {
      return "MASTERCARD";
    }

    return "";
  };

  const handleAdicionarCartao = () => {
    const novaBandeira = detectarBandeira(numero);
    if (!novaBandeira) {
      showToast("Número de cartão inválido ou não reconhecido.", "error");
      return;
    }

    setSending(true);

    setTimeout(() => {
      adicionarCartao({
        numero,
        nomeTitular: nome,
        validade,
        cvv,
        bandeira: novaBandeira,
        usuarioId: userData!.id,
      })
        .then((data: IPostResponse) => {
          setMeiosPagamento([...meiosPagamento, data]);

          showToast("Cartão adicionado com sucesso!", "success");
          setModalVisivel(false);
          setNumero("");
          setValidade("");
          setCvv("");
          setNome("");
          setBandeira("");
          setSending(false);
        })
        .catch((err) => {
          showToast("Ocorreu um erro ao adicionar o cartão.", "error");
          setSending(false);
        });
    }, 1500);
  };

  const handleModalVisivel = () => {
    if (meiosPagamento.length >= 3) {
      showToast("Limite de cartões salvos atingido.", "error");
      return;
    } else setModalVisivel(true);
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
          onClick={() => handleModalVisivel()}
          leftIcon={<FaPlus />}
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
            <Button
              title="Salvar"
              onClick={handleAdicionarCartao}
              loading={sending}
            />
          </>
        }
      >
        <VStack className="gap-4">
          <InputText
            id="numero"
            label="Número do Cartão"
            value={numero}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");

              if (raw.length > 16) return;

              const formatted = raw.replace(/(.{4})/g, "$1 ").trim();

              setNumero(formatted);
              setBandeira(detectarBandeira(raw));
            }}
            placeholder="Digite os números do cartão"
          />
          <InputText
            id="validade"
            label="Validade"
            value={validade}
            onChange={(e) => {
              let raw = e.target.value.replace(/\D/g, "").slice(0, 4);

              if (raw.length >= 3) {
                raw = raw.slice(0, 2) + "/" + raw.slice(2);
              }

              setValidade(raw);
            }}
            placeholder="MM/AA"
          />
          <InputText
            id="cvv"
            label="Código de Segurança"
            value={cvv}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              const limited = raw.slice(0, 3);
              setCvv(limited);
            }}
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
            bandeiraCartao: pagamento.bandeira,
            numeroCartao: pagamento.ultimosDigitos,
            validadeCartao: pagamento.validade,
            padrao: pagamento.favorito,
          }}
          onDefinirPadrao={() => {}}
          onRemover={() => handleDeleteCartao(pagamento.id)}
        />
      ))}
    </VStack>
  );
};
