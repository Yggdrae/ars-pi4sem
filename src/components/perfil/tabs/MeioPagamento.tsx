import { HStack } from "../../HStack";
import { VStack } from "../../VStack";
import { Text } from "../../Text";

export type Bandeiras = "VISA" | "MC" | "ELO" | "AMEX";

export interface IPagamento {
    nomeCartao: string;
    numeroCartao: number;
    validadeCartao: string;
    bandeiraCartao: Bandeiras;
    padrao: boolean;
}

interface MeioPagamentoProps {
    pagamento: IPagamento;
    onDefinirPadrao?: () => void;
    onRemover?: () => void;
}

export const MeioPagamento = ({ pagamento, onDefinirPadrao, onRemover }: MeioPagamentoProps) => {
    const { bandeiraCartao, nomeCartao, numeroCartao, validadeCartao, padrao } = pagamento;
    const finalCartao = numeroCartao.toString().slice(-4);

    return (
        <div className="w-full bg-[#1E1E1E] border border-[#333] rounded-lg px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <VStack className="gap-1">
                <HStack className="items-center gap-2">
                    <Text className="text-md font-bold text-[#E5D3B3] w-12">{bandeiraCartao}</Text>
                    <Text className="text-content-primary">•••• •••• {finalCartao}</Text>
                    {padrao && (
                        <span className="text-xs bg-[#E5D3B3] text-[#1E1E1E] font-semibold px-2 py-1 rounded-md">
                            Padrão
                        </span>
                    )}
                </HStack>
                <Text className="text-sm text-content-ternary">
                    {nomeCartao} Expira em: {validadeCartao}
                </Text>
            </VStack>

            <HStack className="gap-4">
                {!padrao && (
                    <button
                        onClick={onDefinirPadrao}
                        className="text-sm text-content-ternary hover:text-content-primary cursor-pointer"
                    >
                        Definir como padrão
                    </button>
                )}
                <button
                    onClick={onRemover}
                    className="text-sm text-red-500 hover:text-red-400 cursor-pointer"
                >
                    Remover
                </button>
            </HStack>
        </div>
    );
};
