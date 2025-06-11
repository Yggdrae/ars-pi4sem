import React, { useEffect, useState } from "react";
import { VStack } from "@/components/VStack";
import { InputText } from "@/components/InputText";
import Button from "@/components/Button";
import { useToast } from "@/context/ToastContext";
import { useSalas } from "@/hooks/useSalas";

interface RoomTabDetalhesProps {
  sala: any;
  setSala: (sala: any) => void;
  onClose: () => void;
  isCreating?: boolean;
}

export function RoomTabDetalhes({
  sala,
  setSala,
  onClose,
  isCreating = false,
}: RoomTabDetalhesProps) {

  return (
    <VStack className="gap-4">
      <InputText
        id="numero"
        label="Número da sala"
        value={sala.numero || ""}
        onChange={(e) => setSala({ ...sala, numero: Number(e.target.value) })}
      />
      <InputText
        id="andar"
        label="Andar"
        value={sala.andar || ""}
        onChange={(e) => setSala({ ...sala, andar: Number(e.target.value) })}
      />
      <InputText
        id="valorHora"
        label="Valor por hora"
        value={sala.valorHora || ""}
        onChange={(e) =>
          setSala({ ...sala, valorHora: Number(e.target.value) })
        }
      />
      <InputText
        id="capacidade"
        label="Capacidade"
        value={sala.capacidade || ""}
        onChange={(e) =>
          setSala({ ...sala, capacidade: Number(e.target.value) })
        }
      />
    </VStack>
  );
}
