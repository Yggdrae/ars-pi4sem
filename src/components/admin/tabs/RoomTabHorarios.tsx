import React, { useState } from "react";
import { VStack } from "@/components/VStack";
import { Accordion } from "@/components/Accordion";
import { FaTimes } from "react-icons/fa";
import { useToast } from "@/context/ToastContext";

interface IHorario {
  diaDaSemana: number;
  horarioInicio: string;
  horarioFim: string;
}

interface RoomTabHorariosProps {
  salaId?: number;
  horarios?: IHorario[];
  setHorarios?: any;
  isCreating?: boolean;
  onClose?: () => void;
}

const dias: Record<number, string> = {
  1: "Domingo",
  2: "Segunda-feira",
  3: "Terça-feira",
  4: "Quarta-feira",
  5: "Quinta-feira",
  6: "Sexta-feira",
  7: "Sábado",
};

const formatarHora = (hora: string) => {
  if (!hora) return "";
  const [h] = hora.split(":");
  const hh = h.padStart(2, "0");
  return `${hh}:00`;
};

export function RoomTabHorarios({
  salaId,
  horarios,
  setHorarios,
  isCreating = false,
  onClose,
}: RoomTabHorariosProps) {
  const [openTab, setOpenTab] = useState(1);
  const { showToast } = useToast();

  const handleChange = (dia: number, tipo: "inicio" | "fim", valor: string) => {
    const horarioAtual = horarios!.find((h) => h.diaDaSemana === dia);
    if (!horarioAtual) return;

    const novoInicio = tipo === "inicio" ? valor : horarioAtual.horarioInicio;
    const novoFim = tipo === "fim" ? valor : horarioAtual.horarioFim;

    const toMinutos = (hora: string) => {
      const [hh, mm] = hora.split(":").map(Number);
      return hh * 60 + mm;
    };

    if (novoInicio && novoFim && toMinutos(novoFim) <= toMinutos(novoInicio)) {
      showToast(
        "O horário de fechamento deve ser posterior ao de abertura.",
        "error"
      );
      return;
    }

    const newHorarios = horarios!.map((h) => {
      if (h.diaDaSemana === dia) {
        return {
          ...h,
          [tipo === "inicio" ? "horarioInicio" : "horarioFim"]: valor,
        };
      }
      return h;
    });
    setHorarios(newHorarios);
  };

  const handleRemove = () => {
    const horarioDoDia = horarios!.find((h) => h.diaDaSemana === openTab);

    if (!horarioDoDia) return;

    const { horarioInicio, horarioFim } = horarioDoDia;

    if (!horarioInicio && !horarioFim) return;

    const novos = horarios!.map((h) =>
      h.diaDaSemana === openTab
        ? { ...h, horarioInicio: "", horarioFim: "" }
        : h
    );
    showToast("Horário removido", "success");
    setHorarios(novos);
  };

  const opcoesHora = Array.from({ length: 24 }, (_, i) => {
    const hora = i.toString().padStart(2, "0") + ":00";
    return (
      <option key={hora} value={hora}>
        {hora}
      </option>
    );
  });

  return (
    <VStack className="gap-4">
      {horarios?.map((horario) => (
        <Accordion
          key={horario.diaDaSemana}
          title={dias[horario.diaDaSemana]}
          isOpen={openTab === horario.diaDaSemana}
          onToggle={() => setOpenTab(horario.diaDaSemana)}
        >
          <div className="flex flex-col gap-2 text-sm text-content-primary">
            <label htmlFor={`inicio-${horario.diaDaSemana}`}>
              Horário de Abertura
            </label>
            <select
              id={`inicio-${horario.diaDaSemana}`}
              value={formatarHora(horario.horarioInicio)}
              onChange={(e) =>
                handleChange(horario.diaDaSemana, "inicio", e.target.value)
              }
              className="rounded-lg border border-content-primary bg-content-secondary px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition"
            >
              <option value="">Selecione</option>
              {opcoesHora}
            </select>
          </div>

          <div className="flex flex-col gap-2 text-sm text-content-primary">
            <label htmlFor={`fim-${horario.diaDaSemana}`}>
              Horário de Encerramento
            </label>
            <select
              id={`fim-${horario.diaDaSemana}`}
              value={formatarHora(horario.horarioFim)}
              onChange={(e) =>
                handleChange(horario.diaDaSemana, "fim", e.target.value)
              }
              className="rounded-lg border border-content-primary bg-content-secondary px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition"
            >
              <option value="">Selecione</option>
              {opcoesHora}
            </select>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-500 text-sm underline cursor-pointer"
          >
            <FaTimes />
          </button>
        </Accordion>
      ))}
    </VStack>
  );
}
