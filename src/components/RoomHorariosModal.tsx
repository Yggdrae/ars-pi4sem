import React, { useState } from "react";
import { Modal } from "@/components/Modal";
import { VStack } from "@/components/VStack";
import { HorarioAccordion } from "./HorarioAccordion";
import { HStack } from "@/components/HStack";
import Button from "@/components/Button";
import { IHorarioPayload } from "@/interfaces/IHorario";
import { useHorarios } from "@/hooks/useHorarios";
import { useSalas } from "@/hooks/useSalas";

interface RoomEditModalProps {
  salaId: number;
  onClose: () => void;
}

export default function RoomHorariosModal({
  salaId,
  onClose,
}: RoomEditModalProps) {
  const { getSalaFullById } = useSalas();
  const { updateHorariosSala } = useHorarios();
  const [horariosPorDia, setHorariosPorDia] = useState<
    Record<number, { inicio: string; fim: string }>
  >({
    1: { inicio: "08:00", fim: "14:00" },
    2: { inicio: "08:00", fim: "18:00" },
    3: { inicio: "08:00", fim: "18:00" },
    4: { inicio: "08:00", fim: "18:00" },
    5: { inicio: "08:00", fim: "18:00" },
    6: { inicio: "08:00", fim: "18:00" },
    7: { inicio: "08:00", fim: "14:00" },
  });

  const handleChangeHorario = (
    dia: number,
    campo: "inicio" | "fim",
    valor: string
  ) => {
    setHorariosPorDia((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], [campo]: valor },
    }));
  };

  const handleSalvar = async () => {
    const payload: IHorarioPayload[] = Object.entries(horariosPorDia).map(
      ([dia, horario]) => ({
        salaId,
        diaDaSemana: Number(dia),
        horarioInicio: horario.inicio,
        horarioFim: horario.fim,
      })
    );

    await updateHorariosSala(payload);
    onClose();
  };

  return (
    <Modal isOpen={!!salaId} onClose={onClose} title="Editar Horários">
      <VStack className="gap-10">
        <HorarioAccordion
          horarios={horariosPorDia}
          onChange={handleChangeHorario}
        />
        <Button title="Salvar" onClick={handleSalvar} />
      </VStack>
    </Modal>
  );
}
