import { ProfileHeader } from "./ProfileHeader";
import { ProfileTabs } from "./ProfileTabs";

interface ProfileCardProps {
    name: string;
    email: string;
    initials: string;
    selectedTab: string;
    onSelectTab: (tab: string) => void;
}

export const ProfileCard = ({ name, email, initials, selectedTab, onSelectTab }: ProfileCardProps) => {
    return (
        <div className="bg-[#2A2A2A] border border-[#333] rounded-xl p-6 w-full">
            <ProfileHeader name={name} email={email} initials={initials} />
            <ProfileTabs selectedTab={selectedTab} onSelectTab={onSelectTab} />
        </div>
    );
};
