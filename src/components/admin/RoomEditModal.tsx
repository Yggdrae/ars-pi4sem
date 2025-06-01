import React, { useEffect, useState } from "react";
import { Modal } from "@/components/Modal";
import { VStack } from "@/components/VStack";
import { Text } from "@/components/Text";
import { FaEdit, FaImages, FaPlug } from "react-icons/fa";
import { RoomTabDetalhes } from "./tabs/RoomTabDetalhes";
import { RoomTabImagens } from "./tabs/RoomTabImagens";
import { RoomTabRecursos } from "./tabs/RoomTabRecursos";
import { useSalas } from "@/hooks/useSalas";
import { useRecursos } from "@/hooks/useRecursos";

interface RoomEditModalProps {
  salaId: number;
  onClose: () => void;
}

const tabs = [
  { label: "Detalhes", key: "detalhes", icon: FaEdit },
  { label: "Imagens", key: "imagens", icon: FaImages },
  { label: "Recursos", key: "recursos", icon: FaPlug },
];

export default function RoomEditModal({ salaId, onClose }: RoomEditModalProps) {
  const [selectedTab, setSelectedTab] = useState("detalhes");

  const { getSalaFullById } = useSalas();
  const { getRecursos } = useRecursos();

  const [sala, setSala] = useState<ISala | null>(null);
  const [todosRecursos, setTodosRecursos] = useState<any[]>([]);

  useEffect(() => {
    if (salaId) {
      getSalaFullById(salaId).then(setSala);
      getRecursos().then(setTodosRecursos);
    }
  }, [salaId]);

  if (!sala) return null;

  return (
    <Modal
      isOpen={!!salaId}
      onClose={onClose}
      title={`Editar Sala ${sala.numero}`}
      className="xl:max-w-2xl 2xl:max-w-5xl xl:min-h-[70vh] 2xl:min-h-[50vh]"
    >
      <VStack className="gap-6 p-4">
        <div className="flex gap-4 border-b border-[#333]">
          {tabs.map(({ label, key, icon: Icon }) => {
            const isActive = selectedTab === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedTab(key)}
                className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2
                  ${isActive
                    ? "text-content-primary border-[#E5D3B3]"
                    : "text-content-ternary border-transparent hover:text-content-primary"
                  }`}
              >
                <Icon className={`text-base ${isActive ? "text-[#E5D3B3]" : "text-[#999]"}`} />
                <Text>{label}</Text>
              </button>
            );
          })}
        </div>

        {selectedTab === "detalhes" && (
          <RoomTabDetalhes sala={sala} setSala={setSala} onClose={onClose} />
        )}
        {selectedTab === "imagens" && (
          <RoomTabImagens sala={sala} setSala={setSala} />
        )}
        {selectedTab === "recursos" && (
          <RoomTabRecursos sala={sala} setSala={setSala} todosRecursos={todosRecursos} />
        )}
      </VStack>
    </Modal>
  );
}
