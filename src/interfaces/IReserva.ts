export interface IReserva {
  id: number;
  status: string;
  motivoCancelamento: string;
  usuarioId: number;
  salaId: number;
  diaHoraInicio: string;
  diaHoraFim: string;
  sala?: ISala;
}
