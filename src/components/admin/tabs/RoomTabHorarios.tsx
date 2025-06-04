import React, { useEffect, useState } from "react";
import { VStack } from "@/components/VStack";
import Button from "@/components/Button";
import { IHorarioPayload } from "@/interfaces/IHorario";
import { useHorarios } from "@/hooks/useHorarios";
import { HorarioAccordion } from "@/components/HorarioAccordion";
import { Accordion } from "@/components/Accordion";
import { InputField } from "@/components/InputField";
import { InputText } from "@/components/InputText";

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

export function RoomTabHorarios({
  salaId,
  horarios,
  setHorarios,
  isCreating = false,
  onClose,
}: RoomTabHorariosProps) {
  const [openTab, setOpenTab] = useState(1);

  const handleChangeHorarioInicio = (value: string) => {
    if (horarios) {
      const newHorarios = horarios.map((horario) => {
        if (horario.diaDaSemana === openTab) {
          return { ...horario, horarioInicio: value };
        }
        return horario;
      });
      setHorarios(newHorarios);
    }
  };

  const handleChangeHorarioFim = (value: string) => {
    if (horarios) {
      const newHorarios = horarios.map((horario) => {
        if (horario.diaDaSemana === openTab) {
          return { ...horario, horarioFim: value };
        }
        return horario;
      });
      setHorarios(newHorarios);
    }
  };

  return (
    <VStack className="gap-4">
      {horarios &&
        horarios.map((horario) => (
          <Accordion
            key={horario.diaDaSemana}
            title={dias[horario.diaDaSemana]}
            isOpen={openTab === horario.diaDaSemana}
            onToggle={() => setOpenTab(horario.diaDaSemana)}
          >
            <InputText
              id="inicio"
              type="time"
              label="Horário de Abertura"
              onChange={(e) => handleChangeHorarioInicio(e.target.value)}
              value={horario.horarioInicio}
            />
            <InputText
              id="fim"
              type="time"
              label="Horário de Encerramento"
              onChange={(e) => handleChangeHorarioFim(e.target.value)}
              value={horario.horarioFim}
            />
          </Accordion>
        ))}
    </VStack>
  );
}
