import { FilterSection } from "@/components/FilterSection";
import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";
import { Layout } from "@/components/ui/Layout";

export default function Salas() {
    return (
        <Layout>
            <Text className="text-[24px] sm:text-[30px] text-content-primary font-family-heading font-bold">
                Salas Disponíveis
            </Text>
            <HStack className="mt-10">
                <FilterSection/>
            </HStack>
        </Layout>
    )
}