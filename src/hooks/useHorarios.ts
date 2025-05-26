import { useCallback } from "react";
import api from "../../services/api";

export function useHorarios() {
  const getHorariosBySala = useCallback(async (id: number, data: any) => {
    const response = await api({
      url: `http://localhost:3333/disponibilidadeSalas/real/${id}/${data}`,
      method: "GET",
    });

    return response.data;
  }, []);

  return {
    getHorariosBySala,
  };
}
