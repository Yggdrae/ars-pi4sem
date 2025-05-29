import { useEffect, useState } from "react";
import { VStack } from "@/components/VStack";
import { FlexTable } from "@/components/FlexTable";
import { useHistorico } from "@/hooks/useHistorico";
import { Modal } from "@/components/Modal";
import Button from "@/components/Button";
import { IReserva } from "@/interfaces/IReserva";
import { Text } from "@/components/Text";

interface IHistorico {
  id: number;
  usuario: string;
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
    header: "Usuario",
    accessor: "usuario",
  },
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
  const [historico, setHistorico] = useState<IHistorico[]>([]);
  const [reservas, setReservas] = useState<IReserva[]>([]);
  const [reservaSelecionada, setReservaSelecionada] = useState<
    IReserva | undefined
  >(undefined);

  useEffect(() => {
    const fetchHistorico = async () => {
      const data: IReserva[] = await getHistorico();
      setReservas(data);

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
          id: item.id,
          usuario: item.usuario.nome,
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

  const actions = [
    {
      label: "Ver reserva",
      onClick: (row: any) => {
        const reserva = reservas.map((reserva) => {
          if (reserva.id === row.id) return reserva;
        });
        setReservaSelecionada(reserva ? reserva[0] : undefined);
      },
    },
  ];

  const closeModal = () => {
    setReservaSelecionada(undefined);
  };

  return (
    <VStack className="gap-8 mt-6">
      <FlexTable data={historico} columns={colunas} actions={actions} />

      <Modal
        isOpen={reservaSelecionada !== undefined}
        onClose={closeModal}
        title="Detalhes da Reserva"
        footer={<Button title="Fechar" onClick={closeModal} />}
      >
        {reservaSelecionada && (
          <VStack className="gap-3">
            <Text>
              <strong>Usuário:</strong>{" "}
              {reservaSelecionada.usuario.nome}
            </Text>
            <Text>
              <strong>Email:</strong>{" "}
              {reservaSelecionada.usuario.email}
            </Text>
            <Text>
              <strong>Sala:</strong> Sala {reservaSelecionada.sala.numero} -
              Andar {reservaSelecionada.sala.andar}
            </Text>
            <Text>
              <strong>Data:</strong>{" "}
              {new Date(reservaSelecionada.diaHoraInicio).toLocaleDateString(
                "pt-BR"
              )}
            </Text>
            <Text>
              <strong>Horário:</strong>{" "}
              {new Date(reservaSelecionada.diaHoraInicio).toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              )}{" "}
              -{" "}
              {new Date(reservaSelecionada.diaHoraFim).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Text>
              <strong>Status:</strong> {reservaSelecionada.status}
            </Text>
          </VStack>
        )}
      </Modal>
    </VStack>
  );
};
