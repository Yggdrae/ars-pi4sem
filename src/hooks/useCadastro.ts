import api from "../../services/api";

interface ICreateUserPayload {
    nome: string;
    email: string;
    senha: string;
    tipo: string;
}

export function useCadastro() {
    const createUser = async (input: ICreateUserPayload) => {
        const { data } = await api.post("/usuarios/create", input);
        return data;
    };
    
    return {
        createUser,
    };
}