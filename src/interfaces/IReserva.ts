export interface IReserva {
  id: number;
  usuario: {
    id: number;
    nome: string;
    email: string;
    senha: string;
    criadoEm: string;
    tipo: string;
  };
  sala: {
    id: number;
    endereco: null;
    numero: number;
    andar: number;
    capacidade: number;
    valorHora: string;
    isDestaque: false;
  };
  diaHoraInicio: string;
  diaHoraFim: string;
  status: string;
  motivoCancelamento: null;
  valorHoraNaReserva: number;
}
