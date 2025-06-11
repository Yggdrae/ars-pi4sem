"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterSection } from "@/components/FilterSection";
import { SalaCard } from "@/components/SalaCard";
import DetalhesSala from "@/components/DetalhesSala";
import { useSalas } from "@/hooks/useSalas";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/authContext";
import { ISala } from "@/interfaces/ISala";
import { SalaCardSkeleton } from "@/components/SalaCardSkeleton";

export function SalasClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const salaId = searchParams.get("id");

  const { userData } = useAuth();
  const { showToast } = useToast();
  const { getSalasFull } = useSalas();

  const [salas, setSalas] = useState<ISala[]>([]);
  const [filteredSalas, setFilteredSalas] = useState<ISala[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalItem, setModalItem] = useState<ISala | null>(null);
  const [loadingSalas, setLoadingSalas] = useState<boolean>(true);

  useEffect(() => {
    const fetchSalas = async () => {
      const data = await getSalasFull();
      const ordenadas = data.sort((a: ISala, b: ISala) => a.numero - b.numero);
      setSalas(ordenadas);
      setFilteredSalas(ordenadas);
      setLoadingSalas(false);
    };
    fetchSalas();
  }, []);

  useEffect(() => {
    if (salaId && salas.length > 0) {
      const sala = salas.find((sala) => sala.id == Number(salaId));
      if (sala) {
        setModalItem(sala);
        setModalIsOpen(true);
      }
    }
  }, [salas]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <FilterSection
        rooms={salas}
        onFilterSelection={(filtradas) => setFilteredSalas(filtradas)}
      />
      <div className="w-full flex flex-wrap justify-center gap-4">
        {loadingSalas
          ? Array.from({ length: 6 }).map((_, index) => (
              <SalaCardSkeleton key={index} />
            ))
          : filteredSalas.map((sala) => (
              <SalaCard
                key={sala.numero}
                title={`Sala ${sala.numero}`}
                floor={`${sala.andar}º`}
                capacity={sala.capacidade}
                hourValue={sala.valorHora}
                resources={sala.salasRecursos.map((r) => ({
                  nome: r.recurso.nome,
                }))}
                backgroundImage={
                  sala.salasImagens.length > 0
                    ? sala.salasImagens[0].imagemBase64
                    : require("@/assets/conference-room.png")
                }
                backgroundAlt={`Foto da sala ${sala.nome}`}
                onClick={() => {
                  if (!userData) {
                    localStorage.setItem(
                      "redirectAfterLogin",
                      `/salas?id=${sala.id}`
                    );
                    showToast(
                      "Faça login para poder reservar uma sala",
                      "error"
                    );
                    router.push("/login");
                    return;
                  }
                  setModalItem(sala);
                  setModalIsOpen(true);
                }}
              />
            ))}
      </div>

      {modalItem && modalIsOpen && (
        <DetalhesSala
          room={modalItem}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      )}
    </div>
  );
}
