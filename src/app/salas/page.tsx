"use client";
import DetalhesSala from "@/components/DetalhesSala";
import { FilterSection } from "@/components/FilterSection";
import { SalaCard } from "@/components/SalaCard";
import { Text } from "@/components/Text";
import { Layout } from "@/components/ui/Layout";
import { useAuth } from "@/context/authContext";
import { useToast } from "@/context/ToastContext";
import { useSalas } from "@/hooks/useSalas";
import { ISala } from "@/interfaces/ISala";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Salas() {
  const router = useRouter();
  const { userData } = useAuth();
  const { showToast } = useToast();
  const { getSalasFull } = useSalas();
  const [salas, setSalas] = useState([]);
  const searchParams = useSearchParams();
  const salaId = searchParams.get("id");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalItem, setModalItem] = useState<any>();
  const [filteredSalas, setFilteredSalas] = useState<any>(salas);

  useEffect(() => {
    const fetchSalas = async () => {
      const data = await getSalasFull();
      setSalas(data.sort((a: ISala, b: ISala) => a.numero - b.numero));
      setFilteredSalas(data.sort((a: ISala, b: ISala) => a.numero - b.numero));
    };
    fetchSalas()
  }, []);

  useEffect(() => {
    if(salaId){
      const sala = salas.find((sala: ISala) => sala.id == Number(salaId));
      if(sala){
        setModalItem(sala);
        setModalIsOpen(true);
      }
    }
  }, [salas])


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
                    ? sala.salasImagens[0].imagemBase64
                    : require("@/assets/conference-room.png")
                }
                backgroundAlt={`Foto da sala ${sala.nome}`}
                onClick={() => {
                  if (userData === null) {
                    localStorage.setItem("redirectAfterLogin", `/salas?id=${sala.id}`);
                    showToast(
                      "Faça login para poder reservar uma sala",
                      "error"
                    );
                    router.push("/login");
                    return;
                  }
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
