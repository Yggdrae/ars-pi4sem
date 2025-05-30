import { Text } from "../Text";
import { HStack } from "../HStack";
import { VStack } from "../VStack";
import { DadosTab } from "./tabs/DadosTab";
import { PagamentoTab } from "./tabs/PagamentoTab";
import { HistoricoTab } from "./tabs/HistoricoTab";
import { FaAddressCard, FaCalendarCheck, FaCreditCard } from "react-icons/fa";

interface ProfileTabsProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const tabs = [
  { label: "Meus Dados", key: "dados", icon: FaAddressCard },
  { label: "Pagamento", key: "pagamento", icon: FaCreditCard },
  { label: "Minhas Reservas", key: "historico", icon: FaCalendarCheck },
];

export const ProfileTabs = ({ selectedTab, onSelectTab }: ProfileTabsProps) => {
  return (
    <VStack>
      <div className="flex flex-wrap gap-4 mt-6 border-b border-[#333]">
        {tabs.map(({ label, key, icon: Icon }) => {
          const isActive = selectedTab === key;
          return (
            <button
              key={key}
              onClick={() => onSelectTab(key)}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2
                ${
                  isActive
                    ? "text-content-primary border-[#E5D3B3]"
                    : "text-content-ternary border-transparent hover:text-content-primary"
                }`}
            >
              <Icon
                className={`text-base ${
                  isActive ? "text-[#E5D3B3]" : "text-[#999]"
                }`}
              />
              <Text>{label}</Text>
            </button>
          );
        })}
      </div>

      {selectedTab === "dados" && <DadosTab />}
      {selectedTab === "pagamento" && <PagamentoTab />}
      {selectedTab === "historico" && <HistoricoTab />}
    </VStack>
  );
};
