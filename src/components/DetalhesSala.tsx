// RoomDetailsModal.tsx
import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { HStack } from "@/components/HStack";
import { VStack } from "@/components/VStack";
import Card from "./Card";
import { Text } from "./Text";
import ImageCarousel from "./CarrosselSalas";
import { useHorarios } from "@/hooks/useHorarios";
import { IHorario } from "@/interfaces/IHorario";
import Button from "./Button";
import { getRecursoIcon } from "@/utils/recursosIcons";
import { useCartao } from "@/hooks/useCartao";
import { useAuth } from "@/context/authContext";
import { InputText } from "./InputText";
import { ICartao } from "@/interfaces/ICartao";

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
  const { userData } = useAuth();
  const { getCartoes } = useCartao();
  const { getHorariosBySala } = useHorarios();
  const [range, setRange] = useState<{ start: string; end: string } | null>(
    null
  );
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    () => new Date().toISOString().split("T")[0]
  );
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit" | null>(
    null
  );
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loadingPixMethod, setLoadingPixMethod] = useState(false);
  const [inserirNovoCartao, setInserirNovoCartao] = useState(false);

  const [cartoesSalvos, setCartoesSalvos] = useState<ICartao[]>([]);

  const [cartaoSelecionado, setCartaoSelecionado] = useState<any | null>(null);
  const [novoCartao, setNovoCartao] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: "",
  });

  useEffect(() => {
    if (!room || !selectedDate) return;

    setRange(null);
    setHorariosDisponiveis([]);
    setStep(1);
    setPaymentMethod(null);
    setQrCode(null);
    setCartaoSelecionado(null);

    getHorariosBySala(room.id, selectedDate).then((data: IHorario[]) => {
      if (!data || data.length === 0) return;

      const horarios: string[] = [];
      const [startHour] = data[0].horarioInicio.split(":").map(Number);
      const [endHour] = data[0].horarioFim.split(":").map(Number);

      for (let h = startHour; h <= endHour; h++) {
        horarios.push(String(h).padStart(2, "0") + ":00");
      }

      setHorariosDisponiveis(horarios);
    });
    getCartoes(userData!.id).then((data) => {
      setCartoesSalvos(data);
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

  const handleSlotClick = (time: string) => {
    if (!range) setRange({ start: time, end: time });
    else if (range.start === range.end) {
      const [s, e] =
        range.start <= time ? [range.start, time] : [time, range.start];
      setRange({ start: s, end: e });
    } else {
      setRange({ start: time, end: time });
    }
  };

  const handlePixCheckout = () => {
    setLoadingPixMethod(true);
    setQrCode(null);
    setTimeout(() => {
      setQrCode(
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PagamentoPix12345"
      );
      setLoadingPixMethod(false);
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setRange(null);
    setPaymentMethod(null);
    setQrCode(null);
    setCartaoSelecionado(null);
  };

  const handleNext = () => {
    if (step === 1 && selectedSlots.length > 1) setStep(2);
    else if (
      step === 2 &&
      (paymentMethod === "pix" || cartaoSelecionado || novoCartao.numero)
    )
      setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => (prev - 1) as 1 | 2 | 3);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-8 overflow-auto">
      <Card className="relative w-full max-w-5xl min-h-[630px] max-h-[90vh] bg-content-secondary p-4 sm:p-6 overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-200 hover:text-gray-400 text-2xl z-10 cursor-pointer"
        >
          &times;
        </button>

        <VStack className="gap-6">
          {/* Step indicator com bolinhas e labels */}
          <div className="relative mb-6">
            {step > 1 && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <Button title="Voltar" onClick={handleBack} variant="outline" />
              </div>
            )}

            <div className="flex justify-center items-center gap-8 mb-6">
              {[
                { id: 1, label: "Horário" },
                { id: 2, label: "Pagamento" },
                { id: 3, label: "Confirmação" },
              ].map((etapa, index) => (
                <div key={etapa.id} className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-1 transition-all duration-300
                    ${
                      step >= etapa.id
                        ? "bg-content-primary border-content-primary text-black"
                        : "border-gray-500 text-gray-500"
                    }`}
                  >
                    {step > etapa.id ? "✓" : etapa.id}
                  </div>
                  <span
                    className={`text-xs ${
                      step === etapa.id
                        ? "text-white font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    {etapa.label}
                  </span>
                  {index < 2 && (
                    <div
                      className="w-16 h-0.5 bg-gray-500 mt-2"
                      style={{
                        backgroundColor:
                          step > etapa.id ? "#22c55e" : "#6b7280",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-2/3">
                <ImageCarousel images={room.salasImagens} />
              </div>

              <div className="w-full md:w-1/2 p-2 sm:p-4">
                <HStack className="justify-between mb-2">
                  <Text className="text-xl font-semibold text-content-primary">
                    Sala {room.numero}
                  </Text>
                  <div className="bg-content-primary text-black px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    R$ {room.valorHora}/h
                  </div>
                </HStack>

                <HStack className="flex-wrap gap-2 mb-4">
                  {room.salasRecursos?.map((r, i) => (
                    <HStack
                      key={i}
                      className="bg-[#2a2a2a] px-3 py-1 rounded-lg gap-2 items-center text-sm text-white"
                    >
                      {getRecursoIcon(r.recurso.nome)}
                      <Text>{r.recurso.nome}</Text>
                    </HStack>
                  ))}
                </HStack>

                <label
                  htmlFor="data"
                  className="block text-content-primary mb-1 font-medium"
                >
                  Escolha uma data:
                </label>
                <input
                  type="date"
                  id="data"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-[#1E1E1E] border border-[#444] rounded-lg text-white p-2 w-full mb-4"
                />

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
                  {horariosDisponiveis.map((time) => {
                    const selected = selectedSlots.includes(time);
                    return (
                      <button
                        key={time}
                        onClick={() => handleSlotClick(time)}
                        className={`py-2 rounded-lg text-sm transition-colors ${
                          selected
                            ? "bg-content-primary text-black"
                            : "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>

                {range && selectedSlots.length > 1 && (
                  <div className="mb-4">
                    <Text className="text-gray-300">
                      Selecionado: {range.start} – {range.end} (
                      {horasSelecionadas} h)
                    </Text>
                    <Text className="text-content-primary text-lg font-semibold">
                      Total: R$ {total.toFixed(2)}
                    </Text>
                  </div>
                )}

                {!range ||
                  (selectedSlots.length <= 1 && (
                    <div className="mb-4">
                      <Text className="text-gray-300">
                        Selecione um horário de inicio e fim acima.
                      </Text>
                    </div>
                  ))}

                <Button
                  title="Avançar"
                  onClick={handleNext}
                  className="w-full"
                  style={
                    selectedSlots.length < 2
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : {}
                  }
                  disabled={!range || selectedSlots.length < 2}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <HStack className="justify-between">
              <VStack className="gap-4 w-2/3 p-6">
                {paymentMethod === "pix" && qrCode && (
                  <>
                    <Text className="text-xl font-bold text-center">
                      Escaneie o QR Code para pagar
                    </Text>
                    <img
                      src={qrCode}
                      alt="QR Code"
                      className="w-64 h-64 self-center"
                    />
                  </>
                )}

                {paymentMethod === "credit" && (
                  <>
                    {!inserirNovoCartao ? (
                      <>
                        <Text className="text-xl font-bold text-center text-white">
                          Escolha um cartão ou adicione um novo
                        </Text>
                        <VStack className="gap-3">
                          {cartoesSalvos.map((cartao) => (
                            <div
                              key={cartao.id}
                              onClick={() => setCartaoSelecionado(cartao)}
                              className={`p-3 border rounded-lg cursor-pointer text-content-primary ${
                                cartaoSelecionado?.id === cartao.id
                                  ? "border-content-primary bg-[#2a2a2a]"
                                  : "border-[#333] bg-[#1E1E1E]"
                              }`}
                            >
                              <Text className="font-semibold">
                                {cartao.bandeira.toUpperCase()} — Terminado em{" "}
                                {cartao.ultimosDigitos}
                              </Text>
                              <Text className="text-sm text-gray-400">
                                Expira em: {cartao.validade}
                              </Text>
                            </div>
                          ))}
                        </VStack>

                        <button
                          className="mt-4 text-sm text-content-primary underline"
                          onClick={() => {
                            setInserirNovoCartao(true);
                            setCartaoSelecionado(null);
                          }}
                        >
                          Usar novo cartão
                        </button>
                      </>
                    ) : (
                      <VStack className="gap-4 items-center justify-center">
                        <Text className="text-xl font-bold text-center text-white">
                          Insira os dados do novo cartão
                        </Text>
                        <VStack className="gap-2">
                          <InputText
                            id="numero"
                            type="text"
                            label="Número do cartão"
                            placeholder="Número do cartão"
                            className="p-2 rounded bg-[#2a2a2a] text-white"
                            value={novoCartao.numero}
                            onChange={(e) =>
                              setNovoCartao({
                                ...novoCartao,
                                numero: e.target.value,
                              })
                            }
                          />
                          <InputText
                            id="nome"
                            type="text"
                            label="Nome no cartão"
                            placeholder="Nome no cartão"
                            className="p-2 rounded bg-[#2a2a2a] text-white"
                            value={novoCartao.nome}
                            onChange={(e) =>
                              setNovoCartao({
                                ...novoCartao,
                                nome: e.target.value,
                              })
                            }
                          />
                          <HStack className="gap-2">
                            <InputText
                              id="validade"
                              type="text"
                              label="Validade"
                              placeholder="Validade"
                              className="p-2 rounded bg-[#2a2a2a] text-white"
                              value={novoCartao.validade}
                              onChange={(e) =>
                                setNovoCartao({
                                  ...novoCartao,
                                  validade: e.target.value,
                                })
                              }
                            />
                            <InputText
                              id="cvv"
                              type="text"
                              label="CVV"
                              placeholder="CVV"
                              className="p-2 rounded bg-[#2a2a2a] text-white"
                              value={novoCartao.cvv}
                              onChange={(e) =>
                                setNovoCartao({
                                  ...novoCartao,
                                  cvv: e.target.value,
                                })
                              }
                            />
                          </HStack>
                        </VStack>

                        <button
                          className="mt-4 text-sm text-content-primary underline"
                          onClick={() => setInserirNovoCartao(false)}
                        >
                          Voltar aos cartões salvos
                        </button>
                      </VStack>
                    )}
                  </>
                )}
              </VStack>

              <Card className="p-6 text-white w-1/3">
                <VStack className="gap-4">
                  <Text className="text-xl font-bold">Resumo da Reserva</Text>
                  <Text>Data: {selectedDate}</Text>
                  <Text>
                    Horário: {range?.start} – {range?.end} ({horasSelecionadas}
                    h)
                  </Text>
                  <Text className="text-lg font-semibold text-content-primary">
                    Total: R$ {total.toFixed(2)}
                  </Text>

                  <div>
                    <Text className="font-semibold mb-2">
                      Escolha o método de pagamento:
                    </Text>
                    <HStack className="gap-2">
                      <Button
                        title="PIX"
                        onClick={() => {
                          setPaymentMethod("pix");
                          handlePixCheckout();
                        }}
                      />
                      <Button
                        title="Cartão de Crédito"
                        onClick={() => setPaymentMethod("credit")}
                      />
                    </HStack>
                  </div>

                  <Button
                    title="Confirmar"
                    onClick={handleNext}
                    disabled={
                      !paymentMethod ||
                      (paymentMethod === "pix" && !qrCode) ||
                      (paymentMethod === "credit" &&
                        !cartaoSelecionado &&
                        !novoCartao.numero)
                    }
                  />
                </VStack>
              </Card>
            </HStack>
          )}

          {step === 3 && (
            <Text className="text-center text-content-primary font-bold text-xl">
              Reserva confirmada com sucesso!
            </Text>
          )}
        </VStack>
      </Card>
    </div>,
    document.body
  );
}
