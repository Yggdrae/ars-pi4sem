import { VStack } from "@/components/VStack";
import { useSalas } from "@/hooks/useSalas";
import { FlexTable } from "@/components/FlexTable";
import React, { useState } from "react";
import RoomEditModal from "../RoomEditModal";

interface ISalas {
  id: number;
  numero: number;
  andar: number;
  valorHora: number;
  isDestaque: boolean;
  botao: React.ReactElement
}

interface IColunas {
  header: string;
  accessor: keyof ISalas;
}

export const SalasTab = () => {
  const colunas: IColunas[] = [
    {
      header: "Número",
      accessor: "numero"
    },
    {
      header: "Andar",
      accessor: "andar"
    },
    {
      header: "Valor",
      accessor: "valorHora"
    },
  ]
  
  const actions = [
    { label: "Editar", onClick: (row: any) =>  setSalaId(row.id) },
    { label: "Excluir", onClick: (row: any) => alert(`Excluindo ${row.id}`), className: "bg-red-500 text-white" },
  ];

  const [salaId, setSalaId] = useState(0)

  const [salas, setSalas] = useState([])
  useSalas().getSalas().then((data) => {
    setSalas(data);
  })

  return (
    <VStack className="gap-8 mt-6">
      <FlexTable data={salas} columns={colunas} actions={actions} />
      <RoomEditModal roomId={salaId} isOpen={salaId !== 0} onClose={() => setSalaId(0)}/>
    </VStack>
  );
};