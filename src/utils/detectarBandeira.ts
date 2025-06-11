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
  | "";

export function detectarBandeiraCompleta(numero: string): BandeiraCartao {
  const n = numero.replace(/\D/g, "");

  const padroes: { bandeira: BandeiraCartao; regex: RegExp }[] = [
    {
      bandeira: "VISA",
      regex: /^4\d{12}(\d{3})?(\d{3})?$/,
    },
    {
      bandeira: "MASTERCARD",
      regex:
        /^(5[1-5]\d{14}|2(2[2-9]\d{12}|[3-6]\d{13}|7([01]\d{12}|20\d{12})))$/,
    },
    {
      bandeira: "ELO",
      regex:
        /^(4011(78|79)|431274|438935|451416|457393|4576(31|32)|5041(75|76)|5067(01|02)|5090(41|42)|627780|636297|636368|636369)\d{10}$/,
    },
    {
      bandeira: "AMEX",
      regex: /^3[47]\d{13}$/, // 15 dígitos
    },
    {
      bandeira: "DINERS",
      regex: /^3(?:0[0-5]|[68]\d)\d{11}$/, // 14 dígitos
    },
    {
      bandeira: "DISCOVER",
      regex: /^6(?:011|5\d{2}|4[4-9]\d|22[1-9]|22[2-8]\d|229\d)\d{10,13}$/,
    },
    {
      bandeira: "HIPERCARD",
      regex:
        /^(606282\d{10}(\d{3})?|3841(0[0-9]|1[0-9]|2[0-9]|3[0-9]|40)\d{10})$/,
    },
    {
      bandeira: "HIPER",
      regex: /^637(095|568|599|609|612)\d{10}$/,
    },
    {
      bandeira: "JCB",
      regex: /^(35(2[89]|[3-8][0-9])\d{12})$/,
    },
    {
      bandeira: "MAESTRO",
      regex: /^(5[06-9]|6\d)\d{10,17}$/,
    },
    {
      bandeira: "UNIONPAY",
      regex: /^62\d{14,17}$/,
    },
    {
      bandeira: "MIR",
      regex: /^220[0-4]\d{12}$/,
    },
  ];

  for (const { bandeira, regex } of padroes) {
    if (regex.test(n)) return bandeira;
  }

  return "";
}
