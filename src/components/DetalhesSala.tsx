import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { HStack } from "@/components/HStack";
import { VStack } from "@/components/VStack";
import Card from "./Card";
import { Text } from "./Text";
import ImageCarousel from "./CarrosselSalas";
import { useHorarios } from "@/hooks/useHorarios";
import { IHorario, IHorarioResponse } from "@/interfaces/IHorario";
import Button from "./Button";
import { getRecursoIcon } from "@/utils/recursosIcons";
import { useCartao } from "@/hooks/useCartao";
import { useAuth } from "@/context/authContext";
import { InputText } from "./InputText";
import { BandeiraCartao, ICartao } from "@/interfaces/ICartao";
import { AnimatePresence, motion } from "framer-motion";
import { Accordion } from "./Accordion";
import { Divider } from "./Divider";
import { useToast } from "@/context/ToastContext";
import { useReserva } from "@/hooks/useReserva";
import { ISala } from "@/interfaces/ISala";
import { Spinner } from "./Spinner";
import { HorizontalScroll } from "./HorizontalScroll";
import { CheckboxCell } from "./Checkbox";
import { detectarBandeiraCompleta } from "@/utils/detectarBandeira";
import { getPaymentIcon } from "@/utils/getPaymentIcon";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

import {
  validarCvvCartao,
  validarNomeCartao,
  validarValidadeCartao,
} from "@/utils/validateCartao";

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
  registerLocale("pt-BR", ptBR);
  const { userData } = useAuth();
  const { showToast } = useToast();
  const { createReserva } = useReserva();
  const { getHorariosBySala } = useHorarios();
  const { getCartoes, adicionarCartao, pagamento } = useCartao();
  const [horariosDoDia, setHorariosDoDia] = useState<IHorarioResponse[]>([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<
    { horario: string; ativo: boolean }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    console.log(`${yyyy}-${mm}-${dd}`);
    return `${yyyy}-${mm}-${dd}`;
  });
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit" | null>(
    null
  );
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [inserirNovoCartao, setInserirNovoCartao] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(300);
  const [loading, setLoading] = useState(false);
  const [cartoesSalvos, setCartoesSalvos] = useState<ICartao[]>([]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState<any | null>(null);
  const [bandeira, setBandeira] = useState("");
  const [novoCartao, setNovoCartao] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: "",
  });
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [salvarCartao, setSalvarCartao] = useState(false);
  const minDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60)
      .toString()
      .padStart(2, "0");
    const sec = (segundos % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  function getProximoHorario(horario: string): string {
    const [h, m] = horario.split(":").map(Number);
    const novaHora = h + 1;
    return `${String(novaHora).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  useEffect(() => {
    if (!room || !selectedDate) return;

    setStep(1);
    setPaymentMethod(null);
    setQrCode(null);
    setCartaoSelecionado(null);
    setSelectedSlots([]);

    const [year, month, day] = selectedDate.split("-").map(Number);
    const localDate = new Date(year, month - 1, day);
    const diaDaSemana = localDate.getDay();
    const disponibilidadesDoDia = room.disponibilidades?.filter(
      (d) => d.diaDaSemana === diaDaSemana
    );

    setHorariosDoDia(disponibilidadesDoDia || []);
    setHorariosDisponiveis([]);

    getCartoes(userData!.id).then(setCartoesSalvos);
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() - 1);

    const nextDateString = nextDate.toISOString().split("T")[0];

    getHorariosBySala(room.id, nextDateString).then(
      (intervalosDisponiveis: IHorario[]) => {
        const horariosCompletos: { horario: string; ativo: boolean }[] = [];

        if (disponibilidadesDoDia && disponibilidadesDoDia.length > 0) {
          disponibilidadesDoDia.forEach(({ horarioInicio, horarioFim }) => {
            const [startHour] = horarioInicio.split(":" as any).map(Number);
            const [endHour] = horarioFim.split(":" as any).map(Number);

            for (let h = startHour; h <= endHour; h++) {
              const horaStr = String(h).padStart(2, "0") + ":00";

              const horarioToMinutos = (h: string) => {
                const [hh, mm] = h.split(":" as any).map(Number);
                return hh * 60 + mm;
              };

              console.log(selectedDate);
              const estaDisponivel = intervalosDisponiveis.some((intervalo) => {
                const hMin = horarioToMinutos(horaStr);
                const inicioMin = horarioToMinutos(intervalo.horarioInicio);
                const fimMin = horarioToMinutos(intervalo.horarioFim);
                console.log(hMin, inicioMin, fimMin);
                return hMin >= inicioMin && hMin + 60 <= fimMin;
              });

              horariosCompletos.push({
                horario: horaStr,
                ativo: estaDisponivel,
              });
            }
            horariosCompletos.pop();
          });
        }

        setHorariosDisponiveis(horariosCompletos);
      }
    );
  }, [room, selectedDate]);

  useEffect(() => {
    if (qrCode && tempoRestante > 0) {
      const interval = setInterval(() => {
        setTempoRestante((t) => t - 1);
        if (tempoRestante === 292) {
          handlePagamentoPix();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [qrCode, tempoRestante]);

  const horariosClicaveis = useMemo(() => {
    if (selectedSlots.length === 0) {
      return horariosDisponiveis.map((h) => h.horario);
    }

    const indexSelecionados = selectedSlots
      .map((horario) =>
        horariosDisponiveis.findIndex((h) => h.horario === horario)
      )
      .filter((i) => i !== -1);

    const min = Math.min(...indexSelecionados);
    const max = Math.max(...indexSelecionados);

    const vizinhos = new Set([
      horariosDisponiveis[min - 1]?.horario,
      horariosDisponiveis[max + 1]?.horario,
    ]);

    return [...selectedSlots, ...vizinhos];
  }, [selectedSlots, horariosDisponiveis]);

  const horasSelecionadas = selectedSlots.length;
  const precoHora = room.valorHora;
  const total = horasSelecionadas * precoHora;

  const handleSlotClick = (time: string) => {
    const index = selectedSlots.indexOf(time);

    if (index !== -1) {
      if (selectedSlots.length <= 1) {
        setSelectedSlots([]);
        return;
      }

      if (index !== 0 && index !== selectedSlots.length - 1) {
        showToast("Desmarque os horários das pontas primeiro.", "info");
        return;
      }

      const newSlots = [...selectedSlots];
      newSlots.splice(index, 1);
      setSelectedSlots(newSlots);
    } else {
      const newSlots = [...selectedSlots, time].sort();
      setSelectedSlots(newSlots);
    }
  };

  const handlePixCheckout = () => {
    setTimeout(() => {
      setQrCode(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${JSON.stringify(
          {
            valor: total,
            horarios: selectedSlots,
            email: "emaildepagamento@email.com",
          }
        )}`
      );
      setTempoRestante(300);
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setPaymentMethod(null);
    setQrCode(null);
    setCartaoSelecionado(null);
  };

  const handleNext = () => {
    if (step === 1 && selectedSlots.length >= 1) setStep(2);
    else if (
      step === 2 &&
      (paymentMethod === "pix" || cartaoSelecionado || novoCartao.numero)
    ) {
      setStep(3);
      setQrCode(null);
      setPaymentMethod(null);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
      setQrCode(null);
      setPaymentMethod(null);
    }
  };

  const checkCartaoFields = () => {
    return (
      novoCartao.nome === "" ||
      novoCartao.numero === "" ||
      novoCartao.validade === "" ||
      novoCartao.cvv === ""
    );
  };

  const handlePagamento = async () => {
    setLoading(true);
    let cartaoId = 0;

    setTimeout(async () => {
      if (inserirNovoCartao) {
        console.log("inside cartao");
        if (checkCartaoFields()) {
          showToast("Preencha todos os campos.", "error");
          setLoading(false);
          return;
        }
        const bandeiraCartao = detectarBandeiraCompleta(novoCartao.numero);
        if (bandeiraCartao === "") {
          showToast("Cartão desconhecido.", "error");
          setLoading(false);
          return;
        }
        if (!validarValidadeCartao(novoCartao.validade)) {
          showToast("Data de validade vencida ou inválida.", "error");
          setLoading(false);
          return;
        }
        if (!validarCvvCartao(novoCartao.cvv)) {
          showToast("CVV inválido.", "error");
          setLoading(false);
          return;
        }
        if (!validarNomeCartao(novoCartao.nome)) {
          showToast("Nome do titular inválido.", "error");
          setLoading(false);
          return;
        }

        if (salvarCartao) {
          const cartaoCriado = await adicionarCartao({
            numero: novoCartao.numero,
            nomeTitular: novoCartao.nome,
            validade: novoCartao.validade,
            cvv: novoCartao.cvv,
            bandeira: bandeira,
            usuarioId: userData!.id,
          })
            .then((data) => {
              cartaoId = data.id;
              return data;
            })
            .catch((data) => {
              if (data.response.status === 409)
                showToast("Cartão já cadastrado.", "error");
              else showToast("Erro ao adicionar cartão.", "error");
              setLoading(false);
              return "";
            });

          if (cartaoCriado === "") return;
        }
      }

      const pagamentoOk = await pagamento({
        valor: total,
        metodo: paymentMethod!,
        usuarioId: userData!.id,
        cartaoId: inserirNovoCartao ? cartaoId : cartaoSelecionado?.id,
      })
        .then(() => {
          return true;
        })
        .catch(() => {
          showToast(
            "Erro ao realizar pagamento. Verifique seu cartão.",
            "error"
          );
          setLoading(false);
          return false;
        });

      if (!pagamentoOk) return;

      await createReserva({
        sala: room.id,
        usuario: userData!.id,
        diaHoraInicio: `${selectedDate} ${selectedSlots[0]}`,
        diaHoraFim: `${selectedDate} ${getProximoHorario(
          selectedSlots[selectedSlots.length - 1]
        )}`,
        status: "Confirmada",
        valorHoraNaReserva: total,
      })
        .then(() => {
          showToast("Reserva realizada com sucesso.", "success");
          handleNext();
        })
        .catch(() => {
          showToast("Erro ao realizar reserva.", "error");
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  };

  const handlePagamentoPix = async () => {
    setLoading(true);
    await createReserva({
      sala: room.id,
      usuario: userData!.id,
      diaHoraInicio: `${selectedDate} ${selectedSlots[0]}`,
      diaHoraFim: `${selectedDate} ${getProximoHorario(
        selectedSlots[selectedSlots.length - 1]
      )}`,
      status: "Confirmada",
      valorHoraNaReserva: total,
    })
      .then(() => {
        showToast("Reserva realizada com sucesso.", "success");
        handleNext();
      })
      .catch(() => {
        showToast("Erro ao realizar reserva.", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSalvarCartao = () => {
    if (cartoesSalvos.length >= 3 && !salvarCartao) {
      showToast("Limite de cartões salvos atingido.", "error");
      return;
    } else {
      setSalvarCartao(!salvarCartao);
    }
  };

  if (!isOpen) return null;

  const variants = {
    initial: { opacity: 0, x: 50, scale: 0.98 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -50, scale: 0.98 },
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-8 overflow-hidden">
      <Card className="relative w-full xl:max-w-5xl 2xl:max-w-7xl xl:min-h-[90vh] 2xl:min-h-[70vh] max-h-[90vh] bg-content-secondary p-4 sm:p-6 overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-200 hover:text-gray-400 text-2xl z-10 cursor-pointer"
        >
          &times;
        </button>

        <VStack>
          <div className="relative">
            {step === 2 && (
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
                    className={`w-4 h-4 text-xs rounded-full border-2 flex items-center justify-center transition-all duration-300
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
                  <div
                    className="w-16 h-0.5 bg-gray-500 mt-2"
                    style={{
                      backgroundColor: step > etapa.id ? "#22c55e" : "#6b7280",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                layout
                key="step1"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-2/3">
                    <ImageCarousel images={room.salasImagens} />
                  </div>

                  <div className="w-full md:w-1/2 p-2 sm:p-4">
                    <HStack className="justify-between 2xl:mb-4 xl:mb-2 -mt-4">
                      <Text className="text-xl font-semibold text-content-primary">
                        Sala {room.numero}
                      </Text>
                      <div className="bg-content-primary text-black px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                        R$ {room.valorHora}/h
                      </div>
                    </HStack>

                    <HorizontalScroll className="gap-2 mb-4">
                      {room.salasRecursos?.map((r, i) => (
                        <HStack
                          key={i}
                          className="bg-[#2a2a2a] px-3 py-1 rounded-lg gap-2 items-center text-sm text-white inline-flex shrink-0"
                        >
                          {getRecursoIcon(r.recurso.nome)}
                          <Text>{r.recurso.nome}</Text>
                        </HStack>
                      ))}
                    </HorizontalScroll>

                    <div className="mb-4 w-full">
                      <label className="block text-content-primary mb-1 font-medium">
                        Escolha uma data:
                      </label>
                      <DatePicker
                        selected={selectedDate ? new Date(selectedDate) : null}
                        onChange={(date: Date | null) => {
                          if (date) {
                            const formatted = date.toISOString().split("T")[0];
                            setSelectedDate(formatted);
                          }
                        }}
                        locale="pt-BR"
                        minDate={minDate}
                        maxDate={maxDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Clique para selecionar"
                        className="bg-[#1E1E1E] border border-[#444] rounded-lg text-white p-2 w-full cursor-pointer"
                        calendarClassName="!bg-white !text-black rounded-xl justify-self-end"
                        wrapperClassName="w-full"
                        dayClassName={() => "text-content-ternary"}
                        showPopperArrow={false}
                      />
                    </div>
                    {horariosDisponiveis.length > 0 && (
                      <Text className="text-gray-300 mb-4 animate-pulse">
                        Selecione um ou mais horários disponíveis para a data
                        escolhida.
                      </Text>
                    )}

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
                      {horariosDisponiveis.map(({ horario, ativo }) => {
                        const selected = selectedSlots.includes(horario);
                        const clicavel =
                          horariosClicaveis.includes(horario) && ativo;

                        return (
                          <button
                            key={horario}
                            onClick={() => clicavel && handleSlotClick(horario)}
                            disabled={!clicavel}
                            className={`py-2 rounded-lg text-xs transition-colors ${
                              !clicavel
                                ? "bg-[#444] text-gray-500 cursor-not-allowed"
                                : selected
                                ? "bg-content-primary text-black cursor-pointer"
                                : "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] cursor-pointer"
                            }`}
                          >
                            {`${horario} – ${getProximoHorario(horario)}`}
                          </button>
                        );
                      })}
                    </div>

                    {selectedSlots.length > 0 && (
                      <div className="2xl:mb-4">
                        <Text className="text-gray-300">
                          Selecionado: {selectedSlots[0]} –{" "}
                          {getProximoHorario(
                            selectedSlots[selectedSlots.length - 1]
                          )}{" "}
                          ({horasSelecionadas} h)
                        </Text>
                        <Text className="text-content-primary text-lg font-semibold">
                          Total: R$ {total.toFixed(2)}
                        </Text>
                      </div>
                    )}

                    {horariosDisponiveis.length === 0 && (
                      <div className="mb-4">
                        <Text className="text-gray-300">
                          Nenhum horário para o dia selecionado.
                        </Text>
                      </div>
                    )}

                    <Button
                      title="Avançar"
                      onClick={handleNext}
                      className="w-full"
                      style={
                        selectedSlots.length < 1
                          ? { opacity: 0.5, cursor: "not-allowed" }
                          : {}
                      }
                      disabled={selectedSlots.length < 1}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                layout
                key="step2"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <HStack className="justify-between">
                  <VStack className="gap-4 w-1/2 2xl:p-6 xl:p-3">
                    <div className="w-full justify-center items-center translate-x-[20%]">
                      <Text className="font-semibold mb-2 text-white text-center">
                        Escolha o método de pagamento:
                      </Text>

                      <VStack className="2xl:gap-4 xl:gap-1">
                        <Accordion
                          title="Pix"
                          isOpen={paymentMethod === "pix"}
                          onToggle={() => {
                            if (paymentMethod === "pix") return;
                            setPaymentMethod("pix");
                            handlePixCheckout();
                          }}
                        >
                          {paymentMethod === "pix" && (
                            <VStack className="justify-center items-center w-full gap-4">
                              <Text className="text-xl font-bold text-center text-white">
                                Escaneie o QR Code para pagar
                              </Text>
                              {!qrCode && (
                                <Spinner className="self-center border-content-primary" />
                              )}
                              {qrCode && (
                                <img
                                  src={qrCode}
                                  alt="QR Code"
                                  className="w-32 h-32 self-center"
                                />
                              )}
                              <Text className="text-center text-gray-400 mt-2">
                                Expira em: {formatarTempo(tempoRestante)}
                              </Text>
                            </VStack>
                          )}
                        </Accordion>

                        <Accordion
                          title="Cartão de Crédito"
                          isOpen={paymentMethod === "credit"}
                          onToggle={() => {
                            setPaymentMethod("credit");
                            setLoading(false);
                            setQrCode(null);
                          }}
                        >
                          {paymentMethod === "credit" && (
                            <>
                              {!inserirNovoCartao ? (
                                <VStack className="gap-3 w-full">
                                  {cartoesSalvos.length > 0 &&
                                    cartoesSalvos.map((cartao) => (
                                      <div
                                        key={cartao.id}
                                        onClick={() =>
                                          setCartaoSelecionado(cartao)
                                        }
                                        className={`p-3 h-3/4 border rounded-lg cursor-pointer text-content-primary ${
                                          cartaoSelecionado?.id === cartao.id
                                            ? "border-content-primary bg-[#2a2a2a]"
                                            : "border-[#333] bg-[#1E1E1E]"
                                        }`}
                                      >
                                        <Text className="font-semibold">
                                          {cartao.bandeira.toUpperCase()} —
                                          Terminado em {cartao.ultimosDigitos}
                                        </Text>
                                        <Text className="text-sm text-gray-400">
                                          Expira em: {cartao.validade}
                                        </Text>
                                      </div>
                                    ))}
                                  {cartoesSalvos.length === 0 && (
                                    <HStack className="w-full items-center justify-center border border-dashed border-content-ternary rounded-lg p-6">
                                      <Text className="text-content-primary text-center">
                                        Nenhum cartão cadastrado.
                                      </Text>
                                    </HStack>
                                  )}
                                  <button
                                    className="mt-2 text-sm text-content-primary underline"
                                    onClick={() => {
                                      setInserirNovoCartao(true);
                                      setCartaoSelecionado(null);
                                    }}
                                  >
                                    Usar novo cartão
                                  </button>
                                </VStack>
                              ) : (
                                <VStack className="gap-4 items-center justify-center w-full 2xl:max-h-[50vh] xl:max-h-[50vh] p-2">
                                  <VStack className="gap-2 justify-center">
                                    <InputText
                                      id="numero"
                                      type="text"
                                      label="Número do cartão"
                                      placeholder="Número do cartão"
                                      className="p-2 rounded bg-[#2a2a2a] text-white"
                                      value={novoCartao.numero}
                                      iconRight={getPaymentIcon(
                                        bandeira as BandeiraCartao
                                      )}
                                      onChange={(e) => {
                                        const raw = e.target.value.replace(
                                          /\D/g,
                                          ""
                                        );
                                        const limitedRaw = raw.slice(0, 19);
                                        const formatted = limitedRaw
                                          .replace(/(.{4})/g, "$1 ")
                                          .trim();
                                        1;
                                        setNovoCartao({
                                          ...novoCartao,
                                          numero: formatted,
                                        });
                                        const novaBandeira =
                                          detectarBandeiraCompleta(limitedRaw);
                                        setBandeira(novaBandeira);
                                      }}
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
                                        onChange={(e) => {
                                          let raw = e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 4);

                                          if (raw.length >= 3) {
                                            raw =
                                              raw.slice(0, 2) +
                                              "/" +
                                              raw.slice(2);
                                          }

                                          setNovoCartao({
                                            ...novoCartao,
                                            validade: raw,
                                          });
                                        }}
                                      />
                                      <InputText
                                        id="cvv"
                                        type="text"
                                        label="CVV"
                                        placeholder="CVV"
                                        className="p-2 rounded bg-[#2a2a2a] text-white"
                                        value={novoCartao.cvv}
                                        onChange={(e) => {
                                          const raw = e.target.value.replace(
                                            /\D/g,
                                            ""
                                          );
                                          const limited = raw.slice(0, 3);
                                          setNovoCartao({
                                            ...novoCartao,
                                            cvv: limited,
                                          });
                                        }}
                                      />
                                    </HStack>
                                    <HStack className="w-full items-center justify-end gap-2">
                                      <Text className="text-content-primary">
                                        Salvar cartão?
                                      </Text>
                                      <CheckboxCell
                                        checked={salvarCartao}
                                        onChange={() => handleSalvarCartao()}
                                      />
                                    </HStack>
                                  </VStack>

                                  <button
                                    className="2xl:mt-4 text-sm text-content-primary underline"
                                    onClick={() => setInserirNovoCartao(false)}
                                  >
                                    Voltar aos cartões salvos
                                  </button>
                                </VStack>
                              )}
                            </>
                          )}
                        </Accordion>
                      </VStack>
                    </div>
                  </VStack>

                  <Card className="p-6 text-white w-1/3 xl:min-h-[70vh] 2xl:min-h-[50vh] max-h-[70vh]">
                    <Text className="text-xl font-bold mb-6">
                      Resumo da Reserva
                    </Text>
                    <VStack className="gap-4">
                      <Text>
                        Sala {room.numero} ({room.andar}º Andar)
                      </Text>
                      <Text>Data: {selectedDate}</Text>
                      <Text>
                        {selectedSlots.length > 0
                          ? ` ${selectedSlots.join(", ")}`
                          : " Nenhum"}
                      </Text>
                      <Text>Valor/hora: R$ {room.valorHora}</Text>
                      <Divider direction="horizontal" thickness="4px" />
                      <Text className="text-lg font-semibold text-content-primary">
                        Total: R$ {total.toFixed(2)}
                      </Text>

                      <Button
                        title="Fazer Reserva"
                        onClick={handlePagamento}
                        style={
                          !paymentMethod ||
                          paymentMethod === "pix" ||
                          (paymentMethod === "credit" &&
                            !cartaoSelecionado &&
                            checkCartaoFields())
                            ? { opacity: 0.5, cursor: "not-allowed" }
                            : {}
                        }
                        disabled={
                          !paymentMethod ||
                          paymentMethod === "pix" ||
                          (paymentMethod === "credit" &&
                            !cartaoSelecionado &&
                            checkCartaoFields())
                        }
                        loading={loading}
                      />
                    </VStack>
                  </Card>
                </HStack>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                layout
                key="step3"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.5 }}
              >
                <VStack className="justify-center items-center h-full" gap={4}>
                  <Text className="text-center text-content-primary font-bold text-xl">
                    Reserva confirmada com sucesso!
                  </Text>
                  <Button
                    title="Fechar"
                    onClick={onClose}
                    className="w-fit"
                    variant="outline"
                  />
                </VStack>
              </motion.div>
            )}
          </AnimatePresence>
        </VStack>
      </Card>
    </div>,
    document.body
  );
}
