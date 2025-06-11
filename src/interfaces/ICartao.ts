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
    bandeira: BandeiraCartao,
    token: string,
    favorito: boolean,
    criadoEm: string
}

export type BandeiraCartao =
  | "VISA"
  | "MASTERCARD"
  | "ELO"
  | "AMEX"
  | "DINERS"
  | "DISCOVER"
  | "HIPERCARD"
  | "HIPER"
  | "JCB"
  | "MAESTRO"
  | "UNIONPAY"
  | "MIR"
  | "ALIPAY"
  | "PAYPAL"
  | "";