import { useState } from "react";
import { VStack } from "@/components/VStack";
import { Text } from "@/components/Text";
import { Switch } from "@/components/Switch";
import { FlexTable } from "@/components/FlexTable";

interface IHistorico {
    data: string;
    horario: string;
    sala: string;
    status: string;
    valor: number;
}

const historico: IHistorico[] = [
    {
        data: new Date("2025-04-25").toLocaleDateString("pt-BR"),
        horario: "14:00 - 16:00",
        sala: "Sala Prime",
        status: "Agendada",
        valor: 200.00,
    },
    {
        data: new Date("2025-04-24").toLocaleDateString("pt-BR"),
        horario: "14:00 - 16:00",
        sala: "Sala Prime",
        status: "Agendada",
        valor: 200.00,
    },
    {
        data: new Date("2025-04-23").toLocaleDateString("pt-BR"),
        horario: "14:00 - 16:00",
        sala: "Sala Prime",
        status: "Agendada",
        valor: 200.00,
    },
    {
        data: new Date("2025-04-22").toLocaleDateString("pt-BR"),
        horario: "14:00 - 16:00",
        sala: "Sala Prime",
        status: "Agendada",
        valor: 200.00,
    },
    {
        data: new Date("2025-04-21").toLocaleDateString("pt-BR"),
        horario: "14:00 - 16:00",
        sala: "Sala Prime",
        status: "Agendada",
        valor: 200.00,
    },
    {
        data: new Date("2025-04-18").toLocaleDateString("pt-BR"),
        horario: "14:00 - 16:00",
        sala: "Sala Prime",
        status: "Agendada",
        valor: 200.00,
    },
]

interface IColunas {
    header: string;
    accessor: keyof IHistorico;
}

const colunas: IColunas[] = [
    {
        header: "Data",
        accessor: "data"
    },
    {
        header: "Horário",
        accessor: "horario"
    },
    {
        header: "Sala",
        accessor: "sala"
    },
    {
        header: "Status",
        accessor: "status"
    },
    {
        header: "Valor",
        accessor: "valor"
    }
]

export const HistoricoTab = () => {
    return (
        <VStack className="gap-8 mt-6">
            <FlexTable data={historico} columns={colunas} />
        </VStack>
    );
};