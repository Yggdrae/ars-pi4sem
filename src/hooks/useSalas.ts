import { useCallback } from "react";
import api from "../../services/api";

export function useSalas() {

    const getSalas = useCallback(async () => {
        const response = await api({
            url: `http://localhost:3333/salas`,
            method: 'GET'
        })

        return response.data;
    }, [])

    const getSalaById = useCallback(async (id: number) => {
        const response = await api({
            url: `http://localhost:3333/salas/${id}`,
            method: 'GET'
        })

        return response;
    }, [])

    const getDestaques = useCallback(async () => {
        const response = await api({
            url: `http://localhost:3333/salas/destaques`,
            method: 'GET'
        })

        return response.data;
    }, [])

    return {
        getSalas,
        getSalaById,
        getDestaques,
    }
}