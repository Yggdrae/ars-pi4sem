import { FaSnowflake, FaTv, FaVideo } from "react-icons/fa";
import Card from "./Card";
import { HStack } from "./HStack";
import { Text } from "./Text";
import { VStack } from "./VStack";
import { useEffect, useState } from "react";
import Button from "./Button";

interface FilterSectionProps {
  rooms: ISala[];
  onFilterSelection: (salasFiltradas: ISala[]) => void;
}

export const FilterSection = ({
  rooms,
  onFilterSelection,
}: FilterSectionProps) => {
  const capacidades = ["4", "6", "8", "10", "12+"];
  const andares = ["1º", "2º", "3º", "4º"];
  const recursos = [
    { nome: "TV", icon: FaTv },
    { nome: "Projetor", icon: FaVideo },
    { nome: "Ar Condicionado", icon: FaSnowflake },
  ];

  const [selectedCapacidades, setSelectedCapacidades] = useState<string[]>([]);
  const [selectedAndares, setSelectedAndares] = useState<string[]>([]);
  const [selectedRecursos, setSelectedRecursos] = useState<string[]>([]);

  useEffect(() => {
    const filtradas = rooms.filter((sala) => {
      const capacidadeMatch =
        selectedCapacidades.length === 0 ||
        selectedCapacidades.some((cap) => {
          if (cap === "12+") return sala.capacidade >= 12;
          return sala.capacidade === parseInt(cap);
        });

      const andarMatch =
        selectedAndares.length === 0 ||
        selectedAndares.includes(sala.andar + "º");

      const recursosMatch =
        selectedRecursos.length === 0 ||
        selectedRecursos.every((rec) =>
          sala.salasRecursos.some((r) => r.recurso.nome === rec)
        );

      return capacidadeMatch && andarMatch && recursosMatch;
    });

    onFilterSelection(filtradas);
  }, [selectedCapacidades, selectedAndares, selectedRecursos, rooms]);

  const toggleSelection = (
    value: string,
    selected: string[],
    setter: Function
  ) => {
    if (selected.includes(value)) {
      setter(selected.filter((v) => v !== value));
    } else {
      setter([...selected, value]);
    }
  };

  return (
    <Card className="w-full md:w-1/3 lg:w-1/4 p-4 mb-6 md:mb-0">
      <HStack className="justify-between items-end">
        <Text className="text-[20px] sm:text-[20px] text-content-primary font-family-heading font-bold">
          Filtros
        </Text>
        <Button
          title="Limpar"
          onClick={() => {
            setSelectedCapacidades([]);
            setSelectedAndares([]);
            setSelectedRecursos([]);
          }}
        />
      </HStack>

      {/* CAPACIDADE */}
      <Text className="mt-4 text-white">Capacidade</Text>
      <HStack className="flex-wrap gap-2">
        {capacidades.map((capacidade) => (
          <Card
            key={capacidade}
            className={`bg-[#2A2A2A] px-4 py-2 cursor-pointer hover:bg-[#3a3a3a] ${selectedCapacidades.includes(capacidade) ? "bg-[#444]" : ""
              }`}
            onClick={() =>
              toggleSelection(
                capacidade,
                selectedCapacidades,
                setSelectedCapacidades
              )
            }
          >
            <Text className="text-white">{capacidade}</Text>
          </Card>
        ))}
      </HStack>

      {/* ANDAR */}
      <Text className="mt-4 text-white">Andar</Text>
      <HStack className="flex-wrap gap-2">
        {andares.map((andar) => (
          <Card
            key={andar}
            className={`bg-[#2A2A2A] px-4 py-2 cursor-pointer hover:bg-[#3a3a3a] ${selectedAndares.includes(andar) ? "bg-[#444]" : ""
              }`}
            onClick={() =>
              toggleSelection(andar, selectedAndares, setSelectedAndares)
            }
          >
            <Text className="text-white">{andar}</Text>
          </Card>
        ))}
      </HStack>

      {/* RECURSOS */}
      <Text className="mt-4 text-white">Recursos</Text>
      <VStack className="gap-2">
        {recursos.map((recurso) => {
          const Icon = recurso.icon;
          return (
            <Card
              key={recurso.nome}
              className={`bg-[#2A2A2A] px-4 py-2 cursor-pointer hover:bg-[#3a3a3a] ${selectedRecursos.includes(recurso.nome) ? "bg-[#444]" : ""
                }`}
              onClick={() =>
                toggleSelection(
                  recurso.nome,
                  selectedRecursos,
                  setSelectedRecursos
                )
              }
            >
              <HStack className="gap-2 items-center">
                <Icon size={20} className="text-content-ternary" />
                <Text className="text-white">{recurso.nome}</Text>
              </HStack>
            </Card>
          );
        })}
      </VStack>
    </Card>
  );
};
