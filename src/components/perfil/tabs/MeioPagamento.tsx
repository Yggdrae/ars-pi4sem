import { HStack } from "../../HStack";
import { VStack } from "../../VStack";
import { Text } from "../../Text";
import { ICartao } from "@/interfaces/ICartao";
import { useState } from "react";
import { Spinner } from "@/components/Spinner";
import { FaCreditCard, FaTimes } from "react-icons/fa";

export interface IMeioPagamento {
  bandeiraCartao: string;
  numeroCartao: string | number;
  validadeCartao: string;
  padrao: boolean;
}

interface MeioPagamentoProps {
  pagamento: IMeioPagamento;
  onDefinirPadrao?: () => void;
  onRemover?: () => void;
}

export const MeioPagamento = ({
  pagamento,
  onDefinirPadrao,
  onRemover,
}: MeioPagamentoProps) => {
  const { bandeiraCartao, numeroCartao, validadeCartao, padrao } = pagamento;
  const finalCartao = numeroCartao.toString().slice(-4);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full bg-[#1E1E1E] border border-[#333] rounded-lg px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <HStack className="gap-4 items-center">
        <FaCreditCard className="text-[#E5D3B3] text-2xl" />
        <VStack className="gap-1">
          <HStack className="items-center gap-2">
            <Text className="text-md font-bold text-[#E5D3B3]">
              {bandeiraCartao}
            </Text>
            <Text className="text-content-primary">
              Terminado em: {finalCartao}
            </Text>
          </HStack>
          <Text className="text-sm text-content-ternary">
            Expira em: {validadeCartao}
          </Text>
        </VStack>
      </HStack>

      <HStack className="gap-4">
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              onRemover?.();
              setLoading(false);
            }, 1000);
          }}
          className="text-sm text-red-500 hover:text-red-400 cursor-pointer"
        >
          {loading ? (
            <Spinner className="border-[#E5D3B3]" />
          ) : (
            <HStack className="gap-1 items-center">
              <FaTimes className="text-red-500" />
              <Text className="text-red-500">Remover</Text>
            </HStack>
          )}
        </button>
      </HStack>
    </div>
  );
};
