import { useCallback } from "react";
import api from "../../services/api";
import { IRecurso } from "@/interfaces/IRecurso";

export function useRecursos() {
  const getRecursos = useCallback(async (): Promise<IRecurso[]> => {
    const { data } = await api.get("/recursos");
    return data;
  }, []);

  const createRecurso = useCallback(async (nome: string): Promise<IRecurso> => {
    const { data } = await api.post("/recursos", { nome });
    return data;
  }, []);

  const updateRecurso = useCallback(async (id: number, nome: string): Promise<IRecurso> => {
    const { data } = await api.put(`/recursos/${id}`, { nome });
    return data;
  }, []);

  const deleteRecurso = useCallback(async (id: number): Promise<void> => {
    await api.delete(`/recursos/${id}`);
  }, []);

  return {
    getRecursos,
    createRecurso,
    updateRecurso,
    deleteRecurso,
  };
}
