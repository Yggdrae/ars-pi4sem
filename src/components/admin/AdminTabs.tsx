import { Text } from "../Text";
import { VStack } from "../VStack";
import { DashboardTab } from "./tabs/DashboardTab";
import { ReservasTab } from "./tabs/ReservasTab";
import { SalasTab } from "./tabs/SalasTab";

interface ProfileTabsProps {
    selectedTab: string;
    onSelectTab: (tab: string) => void;
}

const tabs = [
    { label: "Reservas", key: "reservas" },
    { label: "Salas", key: "salas" },
];

export const AdminTabs = ({ selectedTab, onSelectTab }: ProfileTabsProps) => {
    return (
        <VStack>
            <div className="flex flex-wrap gap-4 mt-6 border-b border-[#333]">
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
            </div>
            {selectedTab === "reservas" && <ReservasTab />}
            {selectedTab === "salas" && <SalasTab />}
            {/* {selectedTab === "dashboard" && <DashboardTab />} */}
        </VStack>
    );
};