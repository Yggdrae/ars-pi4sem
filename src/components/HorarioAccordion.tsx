import React, { useState } from "react";
import { InputText } from "@/components/InputText";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import Button from "./Button";
import { HStack } from "./HStack";

interface Horario {
  inicio: string;
  fim: string;
}

interface HorarioAccordionProps {
  horarios: Record<number, Horario>;
  onChange: (dia: number, campo: "inicio" | "fim", valor: string) => void;
}

const diasSemana = [
  { numero: 1, nome: "Domingo" },
  { numero: 2, nome: "Segunda-feira" },
  { numero: 3, nome: "Terça-feira" },
  { numero: 4, nome: "Quarta-feira" },
  { numero: 5, nome: "Quinta-feira" },
  { numero: 6, nome: "Sexta-feira" },
  { numero: 7, nome: "Sábado" },
];

export const HorarioAccordion = ({
  horarios,
  onChange,
}: HorarioAccordionProps) => {
  const [diaAberto, setDiaAberto] = useState<number | null>(null);

  const toggle = (dia: number) => {
    setDiaAberto((prev) => (prev === dia ? null : dia));
  };

  return (
    <VStack className="gap-2">
      <Text className="font-semibold text-lg">Horários por dia da semana</Text>
      {diasSemana.map(({ numero, nome }) => (
        <div key={numero} className="border border-gray-600 rounded">
          <button
            type="button"
            className={`w-full cursor-pointer text-left p-2 hover:bg-[#c9b79b] ${
              diaAberto === numero
                ? "bg-[#c9b79b] text-black font-semibold"
                : "bg-[#E5D3B3] text-[#1e1e1e]"
            }`}
            onClick={() => toggle(numero)}
          >
            {nome}
          </button>
          {diaAberto === numero && (
            <div className="flex gap-4 px-4 py-2">
              <InputText
                id={`inicio-${numero}`}
                label="Início"
                value={horarios[numero]?.inicio || ""}
                onChange={(e) => onChange(numero, "inicio", e.target.value)}
              />
              <InputText
                id={`fim-${numero}`}
                label="Fim"
                value={horarios[numero]?.fim || ""}
                onChange={(e) => onChange(numero, "fim", e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
    </VStack>
  );
};
