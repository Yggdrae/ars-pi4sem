export interface ICartao {
  id: number;
  ultimosDigitos: string;
  validade: string;
  bandeira: string;
  token: string;
  favorito: boolean;
  criadoEm: string;
}

export interface IPostResponse {
    id: number,
    usuario: {
        id: number
    },
    ultimosDigitos: string,
    validade: string,
    bandeira: "VISA" | "ELO" | "MASTERCARD",
    token: string,
    favorito: boolean,
    criadoEm: string
}