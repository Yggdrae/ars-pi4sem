import { useCallback } from "react";
import api from "../../services/api";

export function useSalas() {
  const createSala = useCallback(async (input: { numero: string; andar: string; valorHora: string; capacidade: string }) => {
    const { data } = await api.post("/salas", input);
    return data;
  }, []);

  const getSalas = useCallback(async () => {
    const { data } = await api.get("/salas");
    return data;
  }, []);

  const getSalasFull = useCallback(async () => {
    const { data } = await api.get("/salas/full");
    return data;
  }, []);

  const getSalaById = useCallback(async (id: number) => {
    const { data } = await api.get(`/salas/${id}`);
    return data;
  }, []);

  const getSalaFullById = useCallback(async (id: number) => {
    const { data } = await api.get(`/salas/full/${id}`);
    return data;
  }, []);

  const getDestaques = useCallback(async () => {
    const { data } = await api.get("/salas/destaques");
    return data;
  }, []);

  const updateSala = useCallback(
    async (
      id: number,
      input: {
        numero: string;
        andar: string;
        valorHora: string;
        capacidade: string;
      }
    ) => {
      const { data } = await api.put(`/salas/${id}`, input);
      return data;
    },
    []
  );

  const removeImagem = useCallback(async (id: number) => {
    const { data } = await api.delete(`/salas_imagens/${id}`);
    return data;
  }, []);

  const uploadImagem = useCallback(
    async (input: { salaId: number; imagem: File, ordem: number }) => {
      const { data } = await api.post("/salas_imagens", input, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    []
  );

  const removeRecursoSala = useCallback(async (id: number) => {
    const { data } = await api.delete(`/salas_recursos/${id}`);
    return data;
  }, []);

  const addRecursoSala = useCallback(
    async (input: { sala: number; recurso: number; quantidade: number }) => {
      const { data } = await api.post("/salas_recursos", input);
      return data;
    },
    []
  );

  const deleteSala = useCallback(async (id: number) => {
    const { data } = await api.delete(`/salas/${id}`);
    return data;
  }, []);

  const reorderImagens = useCallback(async (input: { salaId: number, ids: number[] }) => {
    const { data } = await api.post(`/salas_imagens/reorganizar`, input);
    return data;
  }, []);

  return {
    createSala,
    getSalas,
    getSalasFull,
    getSalaById,
    getSalaFullById,
    getDestaques,
    updateSala,
    removeImagem,
    uploadImagem,
    removeRecursoSala,
    addRecursoSala,
    deleteSala,
    reorderImagens,
  };
}
