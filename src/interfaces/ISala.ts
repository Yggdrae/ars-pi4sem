import { IHorarioResponse } from "./IHorario";

export interface ISala {
  id: number;
  nome: string;
  numero: number;
  andar: string;
  capacidade: number;
  valorHora: number;
  salasRecursos: {
    id: number;
    recurso: {
      id: number;
      nome: string;
    };
    quantidade: number;
  }[];
  salasImagens: {
    id: number;
    imagemBase64: string;
    ordem: number;
  }[];
  disponibilidades: IHorarioResponse[];
}
