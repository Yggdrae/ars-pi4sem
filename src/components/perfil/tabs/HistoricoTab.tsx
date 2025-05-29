import { useEffect, useState } from "react";
import { VStack } from "@/components/VStack";
import { FlexTable } from "@/components/FlexTable";
import { useHistorico } from "@/hooks/useHistorico";
import { useAuth } from "@/context/authContext";
import { IReserva } from "@/interfaces/IReserva";
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { InputText } from "@/components/InputText";
import Button from "@/components/Button";

interface IHistorico {
  id: number;
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
  { header: "Data", accessor: "data" },
  { header: "Horário", accessor: "horario" },
  { header: "Sala", accessor: "sala" },
  { header: "Status", accessor: "status" },
  { header: "Valor", accessor: "valor" },
];

export const HistoricoTab = () => {
  const { userData } = useAuth();
  const { getHistoricoByUser } = useHistorico();
  const [historico, setHistorico] = useState<IHistorico[]>([]);
  const [reservas, setReservas] = useState<IReserva[]>([]);
  const [reservaSelecionada, setReservaSelecionada] = useState<
    IReserva | undefined
  >(undefined);
  const [modalTipo, setModalTipo] = useState<"ver" | "cancelar" | null>(null);
  const [motivo, setMotivo] = useState("");

  useEffect(() => {
    const fetchHistorico = async () => {
      const data: IReserva[] = await getHistoricoByUser(userData!.id);
      setReservas(data);
      const formatado: IHistorico[] = data.map((item): IHistorico => {
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
          data: dataFormatada,
          horario: horarioFormatado,
          sala: `Sala ${item.sala.numero} (Andar ${item.sala.andar})`,
          status: item.status,
          valor: `R$${(
            Number(item.sala.valorHora) *
            ((dataFim.getTime() - dataInicio.getTime()) / (1000 * 60 * 60))
          ).toFixed(2)}`,
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
        setModalTipo("ver");
      },
    },
    {
      label: "Cancelar reserva",
      onClick: (row: any) => {
        const reserva = reservas.map((reserva) => {
          if (reserva.id === row.id) return reserva;
        });
        setReservaSelecionada(reserva ? reserva[0] : undefined);
        setModalTipo("cancelar");
      },
    },
  ];

  const closeModal = () => {
    setModalTipo(null);
    setReservaSelecionada(undefined);
    setMotivo("");
  };

  return (
    <VStack className="gap-8 mt-6">
      <FlexTable data={historico} columns={colunas} actions={actions} />

      <Modal
        isOpen={modalTipo !== undefined && reservaSelecionada !== undefined}
        onClose={closeModal}
        title={modalTipo === "ver" ? "Detalhes da Reserva" : "Cancelar Reserva"}
        footer={
          modalTipo === "cancelar" ? (
            <>
              <Button
                title="Cancelar"
                variant="secondary"
                onClick={closeModal}
              />
              <Button
                title="Cancelar Reserva"
                onClick={() => {
                  console.log(
                    "Solicitado cancelamento da reserva",
                    reservaSelecionada?.id,
                    motivo
                  );
                  closeModal();
                }}
              />
            </>
          ) : (
            <Button title="Fechar" onClick={closeModal} />
          )
        }
      >
        {reservaSelecionada && (
          <VStack className="gap-3">
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
            {modalTipo === "cancelar" && (
              <InputText
                id="motivo"
                label="Motivo do cancelamento"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Digite o motivo..."
              />
            )}
          </VStack>
        )}
      </Modal>
    </VStack>
  );
};
