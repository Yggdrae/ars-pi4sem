interface ISala {
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
    imagem: {
      data: number[];
    }
  }[]
}
