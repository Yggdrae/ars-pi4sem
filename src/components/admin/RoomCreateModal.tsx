// RoomCreateModal.tsx
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/Modal";
import { VStack } from "@/components/VStack";
import { Text } from "@/components/Text";
import { FaEdit, FaImages, FaPlug } from "react-icons/fa";
import { RoomTabDetalhes } from "./tabs/RoomTabDetalhes";
import { RoomTabImagens } from "./tabs/RoomTabImagens";
import { RoomTabRecursos } from "./tabs/RoomTabRecursos";
import { useSalas } from "@/hooks/useSalas";
import { useRecursos } from "@/hooks/useRecursos";
import { useToast } from "@/context/ToastContext";
import Button from "@/components/Button";

const tabs = [
  { label: "Detalhes", key: "detalhes", icon: FaEdit },
  { label: "Imagens", key: "imagens", icon: FaImages },
  { label: "Recursos", key: "recursos", icon: FaPlug },
];

export default function RoomCreateModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { createSala, uploadImagem, addRecursoSala, getSalas } = useSalas();
  const { getRecursos } = useRecursos();
  const { showToast } = useToast();

  const [selectedTab, setSelectedTab] = useState("detalhes");

  const [numero, setNumero] = useState("");
  const [andar, setAndar] = useState("");
  const [valorHora, setValorHora] = useState("");
  const [capacidade, setCapacidade] = useState("");

  const [imagens, setImagens] = useState<File[]>([]);
  const [recursosSelecionados, setRecursosSelecionados] = useState<number[]>(
    []
  );
  const [todosRecursos, setTodosRecursos] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRecursos().then(setTodosRecursos);
  }, []);

  const handleSalvar = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const novaSala = await createSala({
          numero,
          andar,
          valorHora,
          capacidade,
        });

        for (const img of imagens) {
          await uploadImagem({ salaId: novaSala.id, imagem: img });
        }

        for (const recursoId of recursosSelecionados) {
          await addRecursoSala({
            sala: novaSala.id,
            recurso: recursoId,
            quantidade: 1,
          });
        }

        showToast("Sala criada com sucesso!", "success");
        onClose();
        getSalas();
      } catch {
        showToast("Erro ao criar sala.", "error");
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Criar nova Sala"
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
                ${
                  isActive
                    ? "text-content-primary border-[#E5D3B3]"
                    : "text-content-ternary border-transparent hover:text-content-primary"
                }`}
              >
                <Icon
                  className={`text-base ${
                    isActive ? "text-[#E5D3B3]" : "text-[#999]"
                  }`}
                />
                <Text>{label}</Text>
              </button>
            );
          })}
        </div>

        {selectedTab === "detalhes" && (
          <RoomTabDetalhes
            sala={{ numero, andar, valorHora, capacidade }}
            setSala={({ numero, andar, valorHora, capacidade }) => {
              setNumero(numero);
              setAndar(andar);
              setValorHora(valorHora);
              setCapacidade(capacidade);
            }}
            isCreating
            onClose={onClose}
          />
        )}

        {selectedTab === "imagens" && (
          <RoomTabImagens
            imagens={imagens}
            setImagens={setImagens}
            isCreating
          />
        )}

        {selectedTab === "recursos" && (
          <RoomTabRecursos
            recursosSelecionados={recursosSelecionados}
            setRecursosSelecionados={setRecursosSelecionados}
            todosRecursos={todosRecursos}
            isCreating
            sala={{ numero, andar, valorHora }}
            setSala={({
              numero,
              andar,
              valorHora,
            }: {
              numero: string;
              andar: string;
              valorHora: string;
            }) => {
              setNumero(numero);
              setAndar(andar);
              setValorHora(valorHora);
            }}
          />
        )}

        <div className="mt-6 place-self-end">
          <Button
            title="Criar sala"
            onClick={handleSalvar}
            loading={isLoading}
          />
        </div>
      </VStack>
    </Modal>
  );
}
