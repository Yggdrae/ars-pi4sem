import { useCallback } from "react";
import api from "../../services/api";

export function useHistorico() {
  const getHistorico = useCallback(async () => {
    const response = await api({
      url: `http://localhost:3333/reservas/full`,
      method: "GET",
    });

    return response.data;
  }, []);

  const getHistoricoByUser = useCallback(async (id: number) => {
    const response = await api({
      url: `http://localhost:3333/reservas/usuario/${id}`,
      method: "GET",
    });

    return response.data;
  }, []);

  return {
    getHistorico,
    getHistoricoByUser,
  };
}
