import { useEffect, useState } from "react";
import { VStack } from "@/components/VStack";
import { FlexTable } from "@/components/FlexTable";
import { useHistorico } from "@/hooks/useHistorico";

interface IHistorico {
  data: string;
  horario: string;
  sala: string;
  status: string;
  valor: string;
}

interface IColunas {
  header: string;
  accessor: keyof IHistorico;
}

const colunas: IColunas[] = [
  {
    header: "Data",
    accessor: "data",
  },
  {
    header: "Horário",
    accessor: "horario",
  },
  {
    header: "Sala",
    accessor: "sala",
  },
  {
    header: "Status",
    accessor: "status",
  },
  {
    header: "Valor",
    accessor: "valor",
  },
];

export const ReservasTab = () => {
  const { getHistorico } = useHistorico();
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const fetchHistorico = async () => {
      const data = await getHistorico();

      const formatado = data.map((item: any): IHistorico => {
        const dataInicio = new Date(item.diaHoraInicio);
        const dataFim = new Date(item.diaHoraFim);

        const dataFormatada = dataInicio.toLocaleDateString("pt-BR");
        const horarioFormatado = `${dataInicio.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${dataFim.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;

        return {
          data: dataFormatada,
          horario: horarioFormatado,
          sala: `Sala ${item.sala.numero} (Andar ${item.sala.andar})`,
          status: item.status,
          valor: `R$${
            Number(item.sala.valorHora) *
            ((dataFim.getTime() - dataInicio.getTime()) / (1000 * 60 * 60))
          }`,
        };
      });

      setHistorico(formatado);
    };

    fetchHistorico();
  }, []);

  return (
    <VStack className="gap-8 mt-6">
      <FlexTable data={historico} columns={colunas} />
    </VStack>
  );
};
