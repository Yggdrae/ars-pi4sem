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

interface ReservasProps {
    pagamento?: IPagamento;
    onDefinirPadrao?: () => void;
    onRemover?: () => void;
}

export const ReservasTab = ({ pagamento, onDefinirPadrao, onRemover }: ReservasProps) => {

    return (
        <div className="w-full bg-[#1E1E1E] border border-[#333] rounded-lg px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        </div>
    );
};
