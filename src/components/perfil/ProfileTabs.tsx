import { Text } from "../Text";
import { HStack } from "../HStack";
import { VStack } from "../VStack";
import { DadosTab } from "./tabs/DadosTab";
import { PagamentoTab } from "./tabs/PagamentoTab";

interface ProfileTabsProps {
    selectedTab: string;
    onSelectTab: (tab: string) => void;
}

const tabs = [
    { label: "Meus Dados", key: "dados" },
    { label: "Pagamento", key: "pagamento" },
    { label: "Notificações", key: "notificacoes" },
    { label: "Histórico de Reservas", key: "historico" },
];

export const ProfileTabs = ({ selectedTab, onSelectTab }: ProfileTabsProps) => {
    return (
        <VStack>
            <HStack className="w-full mt-6 border-b border-[#333] overflow-x-auto gap-4 mb-4">
                {tabs.map(({ label, key }) => (
                    <button
                        key={key}
                        onClick={() => onSelectTab(key)}
                        className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
            ${selectedTab === key
                                ? "text-content-primary border-[#E5D3B3]"
                                : "text-content-ternary border-transparent hover:text-content-primary"
                            }`
                        }
                    >
                        <Text>{label}</Text>
                    </button>
                ))}
            </HStack>
            {selectedTab === "dados" && <DadosTab />}
            {selectedTab === "pagamento" && <PagamentoTab />}
        </VStack>
    );
};