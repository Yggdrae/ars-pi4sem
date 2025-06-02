import React, { useEffect, useState } from "react";
import { Modal } from "@/components/Modal";
import { VStack } from "@/components/VStack";
import { Text } from "@/components/Text";
import { FaClock, FaEdit, FaImages, FaPlug } from "react-icons/fa";
import { RoomTabDetalhes } from "./tabs/RoomTabDetalhes";
import { RoomTabImagens } from "./tabs/RoomTabImagens";
import { RoomTabRecursos } from "./tabs/RoomTabRecursos";
import { useSalas } from "@/hooks/useSalas";
import { useRecursos } from "@/hooks/useRecursos";
import Button from "../Button";
import { useToast } from "@/context/ToastContext";
import { RoomTabHorarios } from "./tabs/RoomTabHorarios";
import { IHorarioPayload } from "@/interfaces/IHorario";
import { useHorarios } from "@/hooks/useHorarios";

interface RoomEditModalProps {
  salaId: number;
  onClose: () => void;
}

const tabs = [
  { label: "Detalhes", key: "detalhes", icon: FaEdit },
  { label: "Imagens", key: "imagens", icon: FaImages },
  { label: "Recursos", key: "recursos", icon: FaPlug },
  { label: "Horários", key: "horarios", icon: FaClock },
];

export default function RoomEditModal({ salaId, onClose }: RoomEditModalProps) {
  const [selectedTab, setSelectedTab] = useState("detalhes");

  const {
    updateSala,
    reorderImagens,
    removeRecursoSala,
    addRecursoSala,
    getSalaFullById,
  } = useSalas();
  const { updateHorariosSala } = useHorarios();
  const { getRecursos } = useRecursos();
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [sala, setSala] = useState<ISala | null>(null);
  const [todosRecursos, setTodosRecursos] = useState<any[]>([]);

  const [imagensReordenadas, setImagensReordenadas] = useState<any[]>([]);
  const [recursosSelecionados, setRecursosSelecionados] = useState<number[]>(
    []
  );
  const [horarios, setHorarios] = useState<
    { diaDaSemana: number; horarioInicio: string; horarioFim: string }[]
  >([
    { diaDaSemana: 1, horarioInicio: "", horarioFim: "" },
    { diaDaSemana: 2, horarioInicio: "", horarioFim: "" },
    { diaDaSemana: 3, horarioInicio: "", horarioFim: "" },
    { diaDaSemana: 4, horarioInicio: "", horarioFim: "" },
    { diaDaSemana: 5, horarioInicio: "", horarioFim: "" },
    { diaDaSemana: 6, horarioInicio: "", horarioFim: "" },
    { diaDaSemana: 7, horarioInicio: "", horarioFim: "" },
  ]);

  useEffect(() => {
    if (salaId) {
      getSalaFullById(salaId).then((data) => {
        setSala(data);
        setImagensReordenadas(data.salasImagens);
        setRecursosSelecionados(
          data.salasRecursos.map((r: any) => r.recurso.id)
        );
        data.disponibilidades.map((d: any) => {
          const horario = horarios.find((h) => h.diaDaSemana === d.diaDaSemana);
          if (horario) {
            horario.horarioInicio = d.horarioInicio;
            horario.horarioFim = d.horarioFim;
          }
          return horario;
        });
        setHorarios(horarios);
      });
      getRecursos().then(setTodosRecursos);
    }
  }, [salaId]);

  const checkFields = () => {
    let notFilled = [];
    if (!sala!.numero) notFilled.push("Número");
    if (!sala!.andar) notFilled.push("Andar");
    if (!sala!.valorHora) notFilled.push("Valor por hora");
    if (!sala!.capacidade) notFilled.push("Capacidade");

    let horariosFilled = 0;
    horarios.map((horario) => {
      if (horario.horarioInicio !== "" && horario.horarioFim !== "") horariosFilled += 1;
    });

    if(horariosFilled === 0) showToast("Preencha ao menos um horário", "error");
    if(notFilled.length > 0) showToast(`Preencha todos detalhes da sala`, "error");

    return notFilled.length === 0 && horariosFilled > 0;
  };

  const handleSalvar = async () => {
    const isValid = checkFields();
    if(!isValid) return;
    
    if (!sala) return;
    setIsLoading(true);
    try {
      await updateSala(sala.id, {
        numero: String(sala.numero),
        andar: sala.andar,
        valorHora: String(sala.valorHora),
        capacidade: String(sala.capacidade),
      });

      await reorderImagens({
        salaId: sala.id,
        ids: imagensReordenadas.map((img) => img.id),
      });

      const recursosAtuais = sala.salasRecursos.map((r) => r.recurso.id);

      for (const id of recursosAtuais) {
        if (!recursosSelecionados.includes(id)) {
          const recurso = sala.salasRecursos.find((r) => r.recurso.id === id);
          if (recurso) await removeRecursoSala(recurso.id);
        }
      }

      for (const id of recursosSelecionados) {
        if (!recursosAtuais.includes(id)) {
          await addRecursoSala({ sala: sala.id, recurso: id, quantidade: 1 });
        }
      }

      let horariosReq: IHorarioPayload[] = [];

      for (const horario of horarios) {
        if (horario.horarioInicio !== "" && horario.horarioFim !== "") {
          horariosReq.push({
            salaId: sala.id,
            diaDaSemana: horario.diaDaSemana,
            horarioInicio: horario.horarioInicio,
            horarioFim: horario.horarioFim,
          });
        }
      }

      await updateHorariosSala(horariosReq);

      showToast("Sala atualizada com sucesso!", "success");
      onClose();
    } catch {
      showToast("Erro ao atualizar sala.", "error");
    } finally {
      setIsLoading(false);
    }
  };

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
            sala={sala}
            setSala={setSala}
            onClose={onClose}
            isCreating={false}
          />
        )}
        {selectedTab === "imagens" && (
          <RoomTabImagens
            imagensReordenadas={imagensReordenadas}
            setImagensReordenadas={setImagensReordenadas}
            imagens={[]}
            setImagens={() => {}}
            isCreating={false}
          />
        )}
        {selectedTab === "recursos" && (
          <RoomTabRecursos
            sala={sala}
            setSala={setSala}
            todosRecursos={todosRecursos}
            isCreating={false}
            recursosSelecionados={recursosSelecionados}
            setRecursosSelecionados={setRecursosSelecionados}
          />
        )}
        {selectedTab === "horarios" && (
          <RoomTabHorarios
            horarios={horarios}
            setHorarios={setHorarios}
            isCreating={false}
          />
        )}

        <div className="mt-6 place-self-end">
          <Button
            title="Salvar alterações"
            onClick={handleSalvar}
            loading={isLoading}
          />
        </div>
      </VStack>
    </Modal>
  );
}
