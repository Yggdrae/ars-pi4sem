import { FaSnowflake, FaTv, FaVideo } from "react-icons/fa";
import { getRecursoIcon } from "@/utils/recursosIcons";
import Card from "./Card";
import { HStack } from "./HStack";
import { Text } from "./Text";
import { VStack } from "./VStack";
import { useEffect, useMemo, useState } from "react";
import Button from "./Button";
import { ISala } from "@/interfaces/ISala";

interface FilterSectionProps {
  rooms: ISala[];
  onFilterSelection: (salasFiltradas: ISala[]) => void;
}

export const FilterSection = ({
  rooms,
  onFilterSelection,
}: FilterSectionProps) => {
  const [selectedCapacidades, setSelectedCapacidades] = useState<string[]>([]);
  const [selectedAndares, setSelectedAndares] = useState<string[]>([]);
  const [selectedRecursos, setSelectedRecursos] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const capacidadesUnicas = useMemo(() => {
  const capacidadesSet = new Set<string>();

  rooms.forEach(({ capacidade }) => {
    if (typeof capacidade !== "number") return; // evita null, undefined, strings, etc.

    if (capacidade >= 12) {
      capacidadesSet.add("12+");
    } else {
      capacidadesSet.add(capacidade.toString());
    }
  });

  return Array.from(capacidadesSet);
}, [rooms]);

  const andaresUnicos = useMemo(() => {
    const todos = rooms.map((s) => s.andar);
    const distintos = Array.from(new Set(todos));
    return distintos.sort((a, b) => (a > b ? 1 : -1)).map((v) => `${v}º`);
  }, [rooms]);

  const recursosUnicos = useMemo(() => {
    const nomes = rooms.flatMap(
      (s) => s.salasRecursos?.map((r) => r.recurso?.nome) || []
    );
    const distintos = Array.from(new Set(nomes));
    return distintos.map((nome) => ({ nome }));
  }, [rooms]);

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
        selectedAndares.includes(`${sala.andar}º`);

      const recursosMatch =
        selectedRecursos.length === 0 ||
        selectedRecursos.every((rec) =>
          sala.salasRecursos?.some((r) => r.recurso?.nome === rec)
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

  const filtroJSX = (
    <>
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

      <Text className="mt-4 text-white">Capacidade</Text>
      <HStack className="flex-wrap gap-2">
        {capacidadesUnicas.map((capacidade) => (
          <Card
            key={capacidade}
            className={`bg-[#2A2A2A] px-4 py-2 cursor-pointer hover:bg-[#3a3a3a] ${
              selectedCapacidades.includes(capacidade) ? "bg-[#444]" : ""
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

      <Text className="mt-4 text-white">Andar</Text>
      <HStack className="flex-wrap gap-2">
        {andaresUnicos.map((andar) => (
          <Card
            key={andar}
            className={`bg-[#2A2A2A] px-4 py-2 cursor-pointer hover:bg-[#3a3a3a] ${
              selectedAndares.includes(andar) ? "bg-[#444]" : ""
            }`}
            onClick={() =>
              toggleSelection(andar, selectedAndares, setSelectedAndares)
            }
          >
            <Text className="text-white">{andar}</Text>
          </Card>
        ))}
      </HStack>

      <Text className="mt-4 text-white">Recursos</Text>
      <VStack className="gap-2">
        {recursosUnicos.map((recurso) => (
          <Card
            key={recurso.nome}
            className={`bg-[#2A2A2A] px-4 py-2 cursor-pointer hover:bg-[#3a3a3a] ${
              selectedRecursos.includes(recurso.nome) ? "bg-[#444]" : ""
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
              {getRecursoIcon(recurso.nome, { size: 16, color: "white" })}
              <Text className="text-white">{recurso.nome}</Text>
            </HStack>
          </Card>
        ))}
      </VStack>
    </>
  );

  return isMobile ? (
    <details className="w-full md:hidden">
      <summary className="text-white cursor-pointer py-2 px-4 bg-[#2A2A2A] rounded-md mb-4">
        Mostrar filtros
      </summary>
      <div className="mt-2 p-2 bg-[#1f1f1f] rounded-md">{filtroJSX}</div>
    </details>
  ) : (
    <Card className="w-full md:w-1/3 lg:w-1/4 p-4 mb-6 md:mb-0">
      {filtroJSX}
    </Card>
  );
};
