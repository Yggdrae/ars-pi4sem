import { Text } from "../Text";
import { VStack } from "../VStack";
import { ReservasTab } from "./tabs/ReservasTab";
import { SalasTab } from "./tabs/SalasTab";
import { FaCalendarCheck, FaDoorOpen } from "react-icons/fa";

interface ProfileTabsProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const tabs = [
  { label: "Reservas", key: "reservas", icon: FaCalendarCheck },
  { label: "Salas", key: "salas", icon: FaDoorOpen },
];

export const AdminTabs = ({ selectedTab, onSelectTab }: ProfileTabsProps) => {
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
                ${isActive
                  ? "text-content-primary border-[#E5D3B3]"
                  : "text-content-ternary border-transparent hover:text-content-primary"
                }`}
            >
              <Icon className={`text-base ${isActive ? "text-[#E5D3B3]" : "text-[#999]"}`} />
              <Text>{label}</Text>
            </button>
          );
        })}
      </div>

      {selectedTab === "reservas" && <ReservasTab />}
      {selectedTab === "salas" && <SalasTab />}
    </VStack>
  );
};
