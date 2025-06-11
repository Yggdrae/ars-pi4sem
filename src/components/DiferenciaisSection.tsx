import { FaCalendarAlt, FaChair, FaTv, FaWifi } from "react-icons/fa";
import Card from "@/components/Card";
import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";

const diferenciais = [
  {
    icon: FaCalendarAlt,
    title: "Reserva Simplificada",
    description:
      "Sistema intuitivo para reservar sua sala preferida em poucos cliques.",
  },
  {
    icon: FaChair,
    title: "Conforto Premium",
    description:
      "Mobiliário ergonômico e ambiente climatizado para o máximo conforto.",
  },
  {
    icon: FaTv,
    title: "Tecnologia Avançada",
    description:
      "Equipamentos modernos com suporte a apresentações em alta definição.",
  },
  {
    icon: FaWifi,
    title: "Internet de Alta Velocidade",
    description:
      "Conexão rápida e estável para suas conferências virtuais.",
  },
];

export const DiferenciaisSection = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-0">
      <Text className="text-center text-[24px] sm:text-[30px] text-content-primary font-family-heading font-bold mb-8">
        Nossos Diferenciais
      </Text>

      <div className="w-full max-w-7xl flex flex-wrap justify-center gap-6 mb-16">
        {diferenciais.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card
              key={idx}
              className="w-full sm:w-[48%] lg:w-[22%] min-h-[280px] bg-[#2A2A2A] flex flex-col items-center justify-center px-5 py-6"
            >
              <Icon className="text-[#E5D3B3] text-[48px] mb-3" />
              <Text className="text-[18px] text-center text-content-primary font-family-heading mb-2">
                {item.title}
              </Text>
              <Text className="text-center text-[15px] text-content-ternary font-family-text">
                {item.description}
              </Text>
            </Card>
          );
        })}
      </div>
    </div>
  );
};