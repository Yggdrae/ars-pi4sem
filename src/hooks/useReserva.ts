import { ICreateReservaPayload } from "@/interfaces/IReserva";
import api from "../../services/api";

export function useReserva() {
    const createReserva = async (input: ICreateReservaPayload) => {
        const { data } = await api.post("/reservas", input);
        return data;
    };

    return {
        createReserva,
    }
}