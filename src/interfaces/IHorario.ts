export interface IHorario {
  horarioInicio: string;
  horarioFim: string;
}

export interface IHorarioPayload {
  salaId: number;
  diaDaSemana: number;
  horarioInicio: string;
  horarioFim: string;
}

export interface IHorarioResponse {
  id: number;
  diaDaSemana: number;
  horarioInicio: string;
  horarioFim: string;
}

export interface IHorariosMap {
  ativo: boolean;
  horarioInicio: string;
  horarioFim: string;
}
