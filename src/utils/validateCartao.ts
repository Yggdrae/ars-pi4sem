export function validarValidadeCartao(valor: string): boolean {
  const match = valor.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;

  const mes = parseInt(match[1], 10);
  let ano = parseInt(match[2], 10);

  if (mes < 1 || mes > 12) return false;

  const agora = new Date();
  const anoAtual = agora.getFullYear() % 100;
  const mesAtual = agora.getMonth() + 1;

  if (ano < anoAtual) return false;
  if (ano === anoAtual && mes < mesAtual) return false;

  return true;
}

export function validarNomeCartao(nome: string): boolean {
  return nome.length >= 3;
}

export function validarCvvCartao(cvv: string): boolean {
  return cvv.length === 3;
}
