import Button from "@/components/Button";
import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { IPagamento, MeioPagamento } from "./MeioPagamento";

export const PagamentoTab = () => {
    const meiosPagamento: IPagamento[] = [{
        nomeCartao: "Victor Nicacio",
        numeroCartao: 1234,
        validadeCartao: "12/24",
        bandeiraCartao: "VISA",
        padrao: true,
    }, {
        nomeCartao: "Victor Nicacio",
        numeroCartao: 1234,
        validadeCartao: "12/24",
        bandeiraCartao: "MC",
        padrao: false,
    }]

    return (
        <VStack className="gap-6 mt-6">
            <HStack className="justify-between items-center">
                <Text className="text-lg font-semibold text-content-primary">Métodos de Pagamento</Text>
                <Button title="Adicionar Cartão" variant="primary" className="w-fit" />
            </HStack>

            {meiosPagamento.map((pagamento, index) => (
                <MeioPagamento key={index} pagamento={pagamento} onDefinirPadrao={() => {}} onRemover={() => {}} />))}
        </VStack>
    );
};
