import { useCallback } from "react";
import api from "../../services/api";

export function useCartao() {
  const getCartoes = useCallback(async (id: number) => {
    const response = await api.get(`/cartoes/usuario/${id}`);
    return response.data;
  }, []);

  const adicionarCartao = useCallback(
    async (cartao: {
      numero: string;
      nomeTitular: string;
      validade: string;
      cvv: string;
      bandeira: string;
      usuarioId: number;
    }) => {
      const response = await api.post(`/cartoes`, cartao);
      return response.data;
    },
    []
  );

  const deleteCartao = useCallback(async (id: number) => {
    const response = await api.delete(`/cartoes/${id}`);
    return response.data;
  }, []);

  const pagamento = useCallback(async (input: { valor: number; metodo: string; usuarioId: number; cartaoId: number }) => {
    const response = await api.post(`/pagamentos`, input);
    return response.data;
  }, []);

  return {
    getCartoes,
    adicionarCartao,
    deleteCartao,
    pagamento,
  };
}
