import { FaSnowflake, FaTv, FaVideo } from "react-icons/fa";
import Card from "./Card";
import { HStack } from "./HStack";
import { Text } from "./Text";
import { VStack } from "./VStack";

export const FilterSection: React.FC = () => {
    const capacidades = ["4", "6", "8", "10", "12+"];
    const andares = ["1º", "2º", "3º", "4º"];
    const recursos = [{
        nome: "TV",
        icon: FaTv
    },
    {
        nome: "Projetor",
        icon: FaVideo
    },
    {
        nome: "Ar Condicionado",
        icon: FaSnowflake
    }]

    return (
        <Card className="w-1/4 p-4">
            <HStack className="justify-between items-end">
                <Text className="text-[20px] sm:text-[20px] text-content-primary font-family-heading font-bold">
                    Filtros
                </Text>
                <Text className="text-[20px] sm:text-[14px] text-content-primary font-family-heading cursor-pointer">
                    Limpar
                </Text>
            </HStack>

            <Text className="text-[20px] sm:text-[14px] text-content-ternary font-family-heading mt-4">
                Capacidade
            </Text>
            <HStack className="justify-between">
                {capacidades.map((capacidade) => {
                    return (
                        <Card key={capacidade} className="bg-[#2A2A2A] px-4 py-2 cursor-pointer hover:bg-[#3a3a3a]">
                            <Text className="text-[20px] sm:text-[14px] text-content-ternary font-family-heading">{capacidade}</Text>
                        </Card>
                    )
                })}
            </HStack>

            <Text className="text-[20px] sm:text-[14px] text-content-ternary font-family-heading mt-4">
                Andar
            </Text>
            <HStack className="justify-between">
                {andares.map((andar) => {
                    return (
                        <Card key={andar} className="bg-[#2A2A2A] px-4 py-2 cursor-pointer hover:bg-[#3a3a3a]">
                            <Text className="text-[20px] sm:text-[14px] text-content-ternary font-family-heading">{andar}</Text>
                        </Card>
                    )
                })}
            </HStack>

            <Text className="text-[20px] sm:text-[14px] text-content-ternary font-family-heading mt-4">
                Recursos
            </Text>
            <VStack className="justify-between gap-2">
                {recursos.map((recurso) => {
                    const Icon = recurso.icon
                    return (
                        <Card key={recurso.nome} className="bg-[#2A2A2A] px-4 py-2 cursor-pointer hover:bg-[#3a3a3a]">
                            <HStack className="gap-2 items-center">
                                <Icon size={24} className="text-content-ternary" />
                                <Text className="text-[20px] sm:text-[14px] text-content-ternary font-family-heading">{recurso.nome}</Text>
                            </HStack>
                        </Card>
                    )
                })}
            </VStack>
        </Card>
    )
}