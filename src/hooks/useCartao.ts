import { useCallback } from "react";
import api from "../../services/api";

export function useCartao() {
  const getCartoes = useCallback(async (id: number) => {
    const response = await api({
      url: `http://localhost:3333/cartoes/usuario/${id}`,
      method: "GET",
    });

    return response.data;
  }, []);

  const deleteCartao = useCallback(async (id: number) => {
    const response = await api({
      url: `http://localhost:3333/cartoes/${id}`,
      method: "DELETE",
    });

    return response.data;
  }, []);

  return {
    getCartoes,
    deleteCartao,
  };
}
