import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { HStack } from "@/components/HStack";
import { VStack } from "@/components/VStack";
import Image from "next/image";
import Card from "./Card";
import { Text } from "./Text";
import ImageCarousel from "./CarrosselSalas";
import { useHorarios } from "@/hooks/useHorarios";
import { IHorario } from "@/interfaces/IHorario";
import { Spinner } from "./Spinner";
import Button from "./Button";

interface RoomDetailsModalProps {
  room: ISala;
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomDetailsModal({
  room,
  isOpen,
  onClose,
}: RoomDetailsModalProps) {
  const { getHorariosBySala } = useHorarios();
  const [range, setRange] = useState<{ start: string; end: string } | null>(
    null
  );
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const [loadingPixMethod, setLoadingPixMethod] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);  

  useEffect(() => {
    setRange(null);
    setHorariosDisponiveis([]);

    getHorariosBySala(room.id, selectedDate).then((data: IHorario[]) => {
      if (
        !data ||
        data.length === 0 ||
        !data[0]?.horarioInicio ||
        !data[0]?.horarioFim
      ) {
        return;
      }

      const horarios: string[] = [];
      const [startHour] = data[0].horarioInicio.split(":").map(Number);
      const [endHour] = data[0].horarioFim.split(":").map(Number);

      for (let h = startHour; h <= endHour; h++) {
        const horaFormatada = String(h).padStart(2, "0") + ":00";
        horarios.push(horaFormatada);
      }

      setHorariosDisponiveis(horarios);
    });
  }, [room, selectedDate]);

  const selectedSlots = useMemo(() => {
    if (!range) return [];
    const startIndex = horariosDisponiveis.indexOf(range.start);
    const endIndex = horariosDisponiveis.indexOf(range.end);
    const [from, to] =
      startIndex <= endIndex ? [startIndex, endIndex] : [endIndex, startIndex];
    return horariosDisponiveis.slice(from, to + 1);
  }, [range, horariosDisponiveis]);

  const horasSelecionadas = Math.max(selectedSlots.length - 1, 0);
  const precoHora = room.valorHora;
  const total = horasSelecionadas * precoHora;

  function onSlotClick(time: string) {
    if (!range) {
      setRange({ start: time, end: time });
    } else if (range.start === range.end) {
      const [s, e] =
        range.start <= time ? [range.start, time] : [time, range.start];
      setRange({ start: s, end: e });
    } else {
      setRange({ start: time, end: time });
    }
  }

  function handlePixCheckout() {
    setLoadingPixMethod(true);
    setQrCode(null);
    setTimeout(() => {
      setQrCode(
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PagamentoPix12345"
      );
      setLoadingPixMethod(false);
    }, 2000);
  }

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-8 overflow-auto">
      <Card className="relative w-full max-w-4xl xl:max-w-[1000px] min-h-[500px] bg-content-secondary p-4 sm:p-6 overflow-hidden">
        <button
          onClick={() => {
            onClose();
            setRange(null);
            setShowPaymentScreen(false);
            setQrCode(null);
          }}
          className="absolute top-4 right-4 text-gray-200 hover:text-gray-400 text-2xl z-10 cursor-pointer"
        >
          &times;
        </button>

        <div className="flex w-full h-full transition-all duration-500 ease-in-out">
          <div
            className={`w-full transition-transform duration-500 ease-in-out ${showPaymentScreen ? "-translate-x-500 absolute" : "relative"
              }`}
          >
            <VStack className="gap-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-2/3">
                  <ImageCarousel images={room.salasImagens} />
                </div>

                <div className="w-full md:w-1/2 p-2 sm:p-4">
                  <HStack className="flex flex-row items-center justify-between">
                    <Text className="text-content-primary text-xl sm:text-2xl font-semibold">
                      Sala {room.numero}
                    </Text>
                    <div className="bg-content-primary text-black px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                      {`R$ ${room.valorHora}/h`}
                    </div>
                  </HStack>
                  <HStack className="flex flex-wrap gap-2 my-4">
                    {room.salasRecursos &&
                      room.salasRecursos.map((resource, index) => (
                        <HStack
                          key={index}
                          className="px-3 py-1 bg-[#2a2a2a] text-sm rounded-lg items-center gap-1"
                        >
                          <Text className="text-content-ternary">
                            {resource.recurso.nome}
                          </Text>
                        </HStack>
                      ))}
                  </HStack>

                  <div className="mb-4">
                    <label
                      htmlFor="data"
                      className="block text-content-primary mb-1 font-medium"
                    >
                      Escolha uma data:
                    </label>
                    <input
                      type="date"
                      id="data"
                      name="data"
                      value={selectedDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-[#1E1E1E] border border-[#444] rounded-lg text-white p-2 w-full focus:outline-none focus:ring-2 focus:ring-content-primary"
                    />
                  </div>

                  {horariosDisponiveis.length === 0 && (
                    <Text className="text-gray-300">
                      Nenhum horário disponível para o dia selecionado.
                    </Text>
                  )}

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
                    {horariosDisponiveis.map((time) => {
                      const selected = selectedSlots.includes(time);
                      return (
                        <button
                          key={time}
                          onClick={() => onSlotClick(time)}
                          className={`py-2 rounded-lg text-sm focus:outline-none transition-colors cursor-pointer ${selected
                            ? "bg-content-primary text-gray-900"
                            : "bg-[#2a2a2a] text-gray-200 hover:bg-[#3a3a3a]"
                            }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>

                  {range && (
                    <>
                      <div className="mb-4">
                        <p className="text-gray-300">
                          Selecionado: {range.start} – {range.end} (
                          {horasSelecionadas} h)
                        </p>
                        <p className="text-content-primary text-lg font-semibold">
                          Total: R$ {total.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        onClick={() => setShowPaymentScreen(true)}
                        className="w-full mt-2"
                        title="Confirmar Reserva"
                      />
                    </>
                  )}
                </div>
              </div>
            </VStack>
          </div>

          <div
            className={`w-full transition-transform duration-500 ease-in-out ${showPaymentScreen
              ? "translate-x-0 relative"
              : "translate-x-full absolute"
              }`}
          >
            <Button title="Voltar" onClick={() => {
              setShowPaymentScreen(false);
              setQrCode(null);
              setLoadingPixMethod(false);
            }} />
            <VStack className="gap-4">
              <Text className="text-2xl text-center text-content-primary font-bold mb-4">
                Escolha o método de pagamento
              </Text>
              <Button
                title="Pagar com PIX"
                onClick={handlePixCheckout}
                className="w-full"
                loading={loadingPixMethod}
              />
              {loadingPixMethod === false && qrCode === null && (
                <Button
                  title="Cartão de Crédito"
                  disabled
                  variant="outline"
                  className="w-full"
                />
              )}
              {qrCode && (
                <img src={qrCode} alt="QR Code" className="w-64 h-64 self-center" />
              )}
            </VStack>
          </div>
        </div>
      </Card>
    </div>,
    document.body
  );
}
