import { FilterSection } from "@/components/FilterSection";
import { HStack } from "@/components/HStack";
import { SalaCard } from "@/components/SalaCard";
import { Text } from "@/components/Text";
import { Layout } from "@/components/ui/Layout";
import { FaSnowflake, FaTv, FaVideo } from "react-icons/fa";

export default function Salas() {
  const salas = [
    {
      nome: "Sala Executiva Alpha",
      andar: 1,
      capacidade: 8,
      valorHora: 120,
      recursos: [
        { nome: "TV", icon: FaTv },
        { nome: "Projetor", icon: FaVideo },
        { nome: "Ar Condicionado", icon: FaSnowflake },
      ],
    },
    {
      nome: "Sala Executiva Beta",
      andar: 2,
      capacidade: 16,
      valorHora: 220,
      recursos: [
        { nome: "TV", icon: FaTv },
        { nome: "Projetor", icon: FaVideo },
        { nome: "Ar Condicionado", icon: FaSnowflake },
      ],
    },
    {
      nome: "Sala Executiva Gamma",
      andar: 3,
      capacidade: 12,
      valorHora: 180,
      recursos: [
        { nome: "TV", icon: FaTv },
        { nome: "Projetor", icon: FaVideo },
        { nome: "Ar Condicionado", icon: FaSnowflake },
      ],
    },
    {
      nome: "Sala Executiva Delta",
      andar: 1,
      capacidade: 4,
      valorHora: 60,
      recursos: [
        { nome: "TV", icon: FaTv },
        { nome: "Projetor", icon: FaVideo },
        { nome: "Ar Condicionado", icon: FaSnowflake },
      ],
    },
    {
      nome: "Sala Executiva Epsilon",
      andar: 2,
      capacidade: 10,
      valorHora: 150,
      recursos: [
        { nome: "TV", icon: FaTv },
        { nome: "Projetor", icon: FaVideo },
        { nome: "Ar Condicionado", icon: FaSnowflake },
      ],
    },
    {
      nome: "Sala Executiva Omega",
      andar: 3,
      capacidade: 30,
      valorHora: 350,
      recursos: [
        { nome: "TV", icon: FaTv },
        { nome: "Projetor", icon: FaVideo },
        { nome: "Ar Condicionado", icon: FaSnowflake },
      ],
    },
  ];

  return (
    <Layout>
      <Text className="text-[24px] sm:text-[30px] text-content-primary font-family-heading font-bold mb-6">
        Salas Disponíveis
      </Text>
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <FilterSection />
        <div className="w-full flex flex-wrap justify-center gap-4">
          {salas.map((sala) => (
            <SalaCard
              key={sala.nome}
              title={sala.nome}
              floor={sala.andar}
              capacity={sala.capacidade}
              hourValue={sala.valorHora}
              resources={sala.recursos}
              backgroundImage={require("@/assets/conference-room.png")}
              backgroundAlt={`Foto da ${sala.nome}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
