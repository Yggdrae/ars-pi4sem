import { AdminHeader } from "./AdminHeader";
import { AdminTabs } from "./AdminTabs";

interface ProfileCardProps {
    name: string;
    email: string;
    initials: string;
    selectedTab: string;
    onSelectTab: (tab: string) => void;
}

export const AdminProfile = ({ name, email, initials, selectedTab, onSelectTab }: ProfileCardProps) => {
    return (
        <div className="bg-[#2A2A2A] border border-[#333] rounded-xl p-6 w-full">
            <AdminHeader name={name} email={email} initials={initials} />
            <AdminTabs selectedTab={selectedTab} onSelectTab={onSelectTab} />
        </div>
    );
};
