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
import { FaBan, FaEye } from "react-icons/fa";
import { HStack } from "@/components/HStack";
import { useToast } from "@/context/ToastContext";

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
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { getHistoricoByUser, cancelarReserva } = useHistorico();
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
            Number(item.valorHoraNaReserva) *
            ((dataFim.getTime() - dataInicio.getTime()) / (1000 * 60 * 60))
          ).toFixed(2)}`,
        };
      });
      setHistorico(formatado.sort((a, b) => b.id - a.id));
    };

    fetchHistorico();
  }, []);

  const verificaHora = (reserva: IReserva) => {
    const diaHoraDeHoje = new Date().getTime();
    const dataReserva = new Date(reserva.diaHoraInicio).getTime();

    const hour = 1000 * 60 * 60;

    if (dataReserva - diaHoraDeHoje < hour) {
      showToast(
        "Reserva deve ser cancelada com no minimo 1 hora de antecedência",
        "error"
      );
      return false;
    }
    return true;
  };

  const actions = [
    {
      label: (
        <HStack className="gap-1 items-center">
          <FaEye /> Ver Reserva
        </HStack>
      ),
      onClick: (row: any) => {
        const reserva = reservas.find((reserva) => {
          if (reserva.id === row.id) return reserva;
        });
        setReservaSelecionada(reserva ? reserva : undefined);
        setModalTipo("ver");
      },
    },
    {
      label: (
        <HStack className="gap-1 items-center">
          <FaBan /> Cancelar Reserva
        </HStack>
      ),
      onClick: (row: any) => {
        const reserva = reservas.find((reserva) => {
          if (reserva.id === row.id) return reserva;
        });
        if (reserva && reserva!.status === "Cancelada") {
          showToast("Reserva já foi cancelada", "error");
          return;
        }
        if (!verificaHora(reserva!)) return;
        setReservaSelecionada(reserva ? reserva : undefined);
        setModalTipo("cancelar");
      },
      className: `bg-red-500 text-white`,
    },
  ];

  const closeModal = () => {
    setModalTipo(null);
    setReservaSelecionada(undefined);
    setMotivo("");
  };

  const handleCancelamento = (reserva: IReserva) => {
    setIsLoading(true);
    setTimeout(async () => {
      await cancelarReserva(reserva.id, motivo)
        .then(async () => {
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
                Number(item.valorHoraNaReserva) *
                ((dataFim.getTime() - dataInicio.getTime()) / (1000 * 60 * 60))
              ).toFixed(2)}`,
            };
          });
          setHistorico(formatado.sort((a, b) => b.id - a.id));
          closeModal();
          showToast("Reserva cancelada com sucesso!", "success");
        })
        .catch((e) => {
          showToast("Erro ao cancelar reserva", "error");
        })
        .finally(() => setIsLoading(false));
    }, 2000);
  };

  return (
    <VStack className="gap-8 mt-6">
      {historico.length > 0 && (
        <FlexTable data={historico} columns={colunas} actions={actions} />
      )}

      {historico.length === 0 && (
        <HStack className="w-full items-center justify-center border border-dashed border-content-ternary rounded-lg p-6">
          <Text className="text-content-primary text-center">
            Nenhuma reserva encontrada
          </Text>
        </HStack>
      )}

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
                disabled={isLoading}
              />
              <Button
                title="Cancelar Reserva"
                onClick={() => handleCancelamento(reservaSelecionada!)}
                loading={isLoading}
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
            {reservaSelecionada.status === "Cancelada" && (
              <Text>
                <strong>Motivo Cancelamento:</strong>{" "}
                {reservaSelecionada.motivoCancelamento}
              </Text>
            )}
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
