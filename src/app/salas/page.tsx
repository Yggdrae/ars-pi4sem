"use client";
import DetalhesSala from "@/components/DetalhesSala";
import { FilterSection } from "@/components/FilterSection";
import { SalaCard } from "@/components/SalaCard";
import { Text } from "@/components/Text";
import { Layout } from "@/components/ui/Layout";
import { useSalas } from "@/hooks/useSalas";
import { useEffect, useState } from "react";

export default function Salas() {
  const { getSalasFull } = useSalas();
  const [salas, setSalas] = useState([]);
  useEffect(() => {
    const fetchSalas = async () => {
      const data = await getSalasFull();
      setSalas(data);
      setFilteredSalas(data);
    };
    fetchSalas();
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalItem, setModalItem] = useState<any>();
  const [filteredSalas, setFilteredSalas] = useState<any>(salas);

  function bufferArrayToBase64(data: number[]): string {
    const uint8Array = new Uint8Array(data);
    const binaryString = uint8Array.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return "data:image/png;base64," + btoa(binaryString);
  }

  return (
    <Layout>
      <Text className="text-[24px] sm:text-[30px] text-content-primary font-family-heading font-bold mb-6">
        Salas Disponíveis
      </Text>
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <FilterSection
          rooms={salas}
          onFilterSelection={(filtradas) => setFilteredSalas(filtradas)}
        />
        <div className="w-full flex flex-wrap justify-center gap-4">
          {filteredSalas &&
            filteredSalas.map((sala: ISala) => (
              <SalaCard
                key={sala.numero}
                title={"Sala " + sala.numero}
                floor={sala.andar + "º"}
                capacity={sala.capacidade}
                hourValue={sala.valorHora}
                resources={sala.salasRecursos.map((recurso) => {
                  return {
                    nome: recurso.recurso.nome,
                  };
                })}
                backgroundImage={
                  sala.salasImagens.length > 0
                    ? bufferArrayToBase64(sala.salasImagens[0].imagem.data)
                    : require("@/assets/conference-room.png")
                }
                backgroundAlt={`Foto da sala ${sala.nome}`}
                onClick={() => {
                  setModalIsOpen(true);
                  setModalItem(sala);
                }}
              />
            ))}
        </div>
      </div>
      {modalItem && modalIsOpen && (
        <DetalhesSala
          room={modalItem}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      )}
    </Layout>
  );
}
