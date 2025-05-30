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
