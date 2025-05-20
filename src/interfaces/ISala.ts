interface ISala {
    id: number,
    nome: string,
    numero: number,
    andar: string,
    capacidade: number,
    valorHora: number,
    recursos:
    { nome: string, icon: any }[]
  }