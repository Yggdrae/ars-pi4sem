import { Text } from "../Text";
import { HStack } from "../HStack";
import { VStack } from "../VStack";

interface ProfileHeaderProps {
    name: string;
    email: string;
    initials: string;
}

export const ProfileHeader = ({ name, email, initials }: ProfileHeaderProps) => {
    return (
        <HStack className="items-center gap-4 pb-6 border-b border-[#333]">
            <div className="w-16 h-16 rounded-lg bg-[#E5D3B3] flex items-center justify-center text-[#1E1E1E] font-bold text-xl">
                {initials}
            </div>
            <VStack>
                <Text className="text-lg font-semibold text-content-primary">{name}</Text>
                <Text className="text-sm text-content-ternary">{email}</Text>
            </VStack>
        </HStack>
    );
};
