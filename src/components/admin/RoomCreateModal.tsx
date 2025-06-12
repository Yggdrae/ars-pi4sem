import React, { useState, useEffect } from "react";
import { Modal } from "@/components/Modal";
import { VStack } from "@/components/VStack";
import { Text } from "@/components/Text";
import { FaClock, FaEdit, FaImages, FaPlug } from "react-icons/fa";
import { RoomTabDetalhes } from "./tabs/RoomTabDetalhes";
import { RoomTabImagens } from "./tabs/RoomTabImagens";
import { RoomTabRecursos } from "./tabs/RoomTabRecursos";
import { useSalas } from "@/hooks/useSalas";
import { useRecursos } from "@/hooks/useRecursos";
import { useToast } from "@/context/ToastContext";
import Button from "@/components/Button";
import { RoomTabHorarios } from "./tabs/RoomTabHorarios";
import { useHorarios } from "@/hooks/useHorarios";

const tabs = [
  { label: "Detalhes", key: "detalhes", icon: FaEdit },
  { label: "Imagens", key: "imagens", icon: FaImages },
  { label: "Recursos", key: "recursos", icon: FaPlug },
  { label: "Horários", key: "horarios", icon: FaClock },
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
  const { criaHorarioSala } = useHorarios();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [numero, setNumero] = useState("");
  const [andar, setAndar] = useState("");
  const [valorHora, setValorHora] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [imagens, setImagens] = useState<{ id: string; file: File }[]>([]);
  const [recursosSelecionados, setRecursosSelecionados] = useState<number[]>(
    []
  );
  const [todosRecursos, setTodosRecursos] = useState<any[]>([]);
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

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRecursos().then(setTodosRecursos);
  }, []);

  const handleNext = () => {
    if (step === 1) {
      let notFilled = [];
      if (!numero) notFilled.push("Número");
      if (!andar) notFilled.push("Andar");
      if (!valorHora) notFilled.push("Valor por hora");
      if (!capacidade) notFilled.push("Capacidade");

      if (notFilled.length > 0) {
        showToast(`Preencha todos detalhes da sala`, "error");
        return;
      } else {
        setStep(2);
      }
    }
    if (step === 2) {
      if (imagens.length === 0) {
        showToast("Faça upload de ao menos uma imagem", "error");
        return;
      } else {
        setStep(3);
      }
    }
    if (step === 3) {
      if (recursosSelecionados.length === 0) {
        showToast("Selecione ao menos um recurso", "error");
        return;
      } else {
        setStep(4);
      }
    }
    if (step === 4) {
      let horariosFilled = 0;
      horarios.map((horario) => {
        if (horario.horarioInicio !== "" && horario.horarioFim !== "")
          horariosFilled += 1;
      });
      if (horariosFilled === 0) {
        showToast("Preencha ao menos um horário", "error");
        return;
      } else {
        handleSalvar();
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

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

        await Promise.all(
          imagens.map(async (img, index) => {
            await uploadImagem({
              salaId: novaSala.id,
              imagem: img.file,
              ordem: index + 1,
            });
          })
        );

        for (const recursoId of recursosSelecionados) {
          await addRecursoSala({
            sala: novaSala.id,
            recurso: recursoId,
            quantidade: 1,
          });
        }

        for (const horario of horarios) {
          if (horario.horarioInicio !== "" && horario.horarioFim !== "") {
            await criaHorarioSala({
              salaId: novaSala.id,
              diaDaSemana: horario.diaDaSemana,
              horarioInicio: horario.horarioInicio,
              horarioFim: horario.horarioFim,
            });
          }
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
      title="Criar Nova Sala"
      className="xl:max-w-2xl 2xl:max-w-5xl xl:min-h-[70vh] 2xl:min-h-[50vh]"
    >
      <VStack className="gap-6 p-4">
        <div className="flex gap-4 border-b border-[#333]">
          {tabs.map(({ label, key, icon: Icon }, index) => {
            const isActive = step === index + 1;
            return (
              <div
                key={key}
                className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2
                  ${
                    isActive
                      ? "text-content-primary border-[#E5D3B3]"
                      : step > index + 1
                      ? "text-green-500 border-green-500"
                      : "text-content-ternary border-transparent"
                  }`}
              >
                <Icon className="text-base" />
                <Text>{label}</Text>
              </div>
            );
          })}
        </div>

        {step === 1 && (
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

        {step === 2 && (
          <RoomTabImagens
            imagens={imagens}
            setImagens={setImagens}
            isCreating
          />
        )}

        {step === 3 && (
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

        {step === 4 && (
          <RoomTabHorarios
            isCreating
            horarios={horarios}
            setHorarios={setHorarios}
          />
        )}

        {step === 1 && (
          <div className="mt-6 place-self-end">
            <Button
              title="Próximo"
              onClick={handleNext}
              loading={isLoading}
            />
          </div>
        )}
        {(step === 2 || step === 3) && (
          <div className="mt-6 flex justify-between">
            <Button title="Voltar" onClick={handlePrevious} />
            <Button title="Próximo" onClick={handleNext} />
          </div>
        )}
        {step === 4 && (
          <div className="mt-6 flex justify-between">
            <Button title="Voltar" onClick={handlePrevious} />
            <Button
              title="Criar sala"
              onClick={handleNext}
              loading={isLoading}
            />
          </div>
        )}
      </VStack>
    </Modal>
  );
}
