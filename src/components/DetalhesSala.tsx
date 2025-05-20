import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { HStack } from '@/components/HStack';
import { VStack } from '@/components/VStack';
import Button from '@/components/Button';
import Image from 'next/image';
import Card from './Card';
import { Text } from './Text';

const horariosDisponiveis = [
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00'
];

interface RoomDetailsModalProps {
  room: {
    id: number;
    nome: string;
    andar: number;
    capacidade: number;
    valorHora: number;
    recursos: { nome: string; icon: any }[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomDetailsModal({ room, isOpen, onClose }: RoomDetailsModalProps) {
  const [range, setRange] = useState<{ start: string; end: string } | null>(null);

  const selectedSlots = useMemo(() => {
    if (!range) return [];
    const startIndex = horariosDisponiveis.indexOf(range.start);
    const endIndex = horariosDisponiveis.indexOf(range.end);
    const [from, to] = startIndex <= endIndex
      ? [startIndex, endIndex]
      : [endIndex, startIndex];
    return horariosDisponiveis.slice(from, to + 1);
  }, [range]);

  if (!isOpen) return null;

  const horasSelecionadas = selectedSlots.length - 1;
  const precoHora = room.valorHora;
  const total = horasSelecionadas * precoHora;

  function onSlotClick(time: string) {
    if (!range) {
      setRange({ start: time, end: time });
    } else if (range.start === range.end) {
      const [s, e] = range.start <= time
        ? [range.start, time]
        : [time, range.start];
      setRange({ start: s, end: e });
    } else {
      setRange({ start: time, end: time });
    }
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-8 overflow-auto">
      <Card className="relative w-full max-w-4xl bg-content-secondary p-4 sm:p-6 overflow-hidden">
        <button
          onClick={() => {
            onClose();
            setRange(null);
          }}
          className="absolute top-4 right-4 text-gray-200 hover:text-gray-400 text-2xl z-10 cursor-pointer"
        >
          &times;
        </button>

        <VStack className="gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <Image
                src={`/images/salas/${room.id}.jpg`}
                alt="Sala detalhada"
                width={800}
                height={450}
                className="w-full h-auto object-cover rounded-2xl md:rounded-tr-none"
                loading='lazy'
              />
              <HStack className="mt-2 space-x-2 overflow-x-auto">
                {horariosDisponiveis.slice(0, 5).map((_, i) => (
                  <div key={i} className="flex-shrink-0">
                    <Image
                      src={`/images/salas/${room.id}.jpg`}
                      alt="Thumbnail"
                      width={100}
                      height={60}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
                ))}
              </HStack>
            </div>

            <div className="w-full md:w-1/2 p-2 sm:p-4">
              <Text className="text-content-primary text-xl sm:text-2xl font-semibold">{room.nome}</Text>
              <HStack className="flex flex-wrap gap-2 my-4">
                {room.recursos && room.recursos.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <HStack
                      key={index}
                      className="px-3 py-1 bg-[#2a2a2a] text-sm rounded-lg items-center gap-1"
                    >
                      <Icon size={14} className="text-content-ternary" />
                      <Text className='text-content-ternary'>{resource.nome}</Text>
                    </HStack>
                  );
                })}
              </HStack>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
                {horariosDisponiveis.map(time => {
                  const selected = selectedSlots.includes(time);
                  return (
                    <button
                      key={time}
                      onClick={() => onSlotClick(time)}
                      className={
                        `py-2 rounded-lg text-sm focus:outline-none transition-colors cursor-pointer ` +
                        (selected
                          ? 'bg-content-primary text-gray-900'
                          : 'bg-[#2a2a2a] text-gray-200 hover:bg-[#3a3a3a]')
                      }
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              {range && (
                <div className="mb-4">
                  <p className="text-gray-300">
                    Selecionado: {range.start} – {range.end} ({horasSelecionadas} h)
                  </p>
                  <p className="text-content-primary text-lg font-semibold">Total: R$ {total.toFixed(2)}</p>
                </div>
              )}

              <Button
                disabled={!range}
                onClick={() => alert(`Checkout com o total de R$ ${total.toFixed(2)}`)}
                className="w-full mt-2"
                title="Confirmar Reserva"
              />
            </div>
          </div>
        </VStack>
      </Card>
    </div>,
    document.body
  );
}
