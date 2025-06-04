import { useCallback } from "react";
import api from "../../services/api";
import { IHorarioPayload } from "@/interfaces/IHorario";

export function useHorarios() {
  const getHorariosBySala = useCallback(async (id: number, data: any) => {
    const response = await api({
      url: `http://localhost:3333/disponibilidadeSalas/real/${id}/${data}`,
      method: "GET",
    });

    return response.data;
  }, []);

  const criaHorarioSala = useCallback(async (payload: IHorarioPayload) => {
    const response = await api.post(`/disponibilidadeSalas`, payload);
    return response.data;
  }, []);

  const updateHorariosSala = useCallback(async (payload: IHorarioPayload[]) => {
    const response = await api.put(`/disponibilidadeSalas/upsert`, payload);
    return response.data;
  }, []);

  return {
    getHorariosBySala,
    criaHorarioSala,
    updateHorariosSala,
  };
}
