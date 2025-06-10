import { BandeiraCartao } from "@/interfaces/ICartao";
import React from "react";
import { PaymentIcon } from "react-svg-credit-card-payment-icons";

const typeMap = {
  VISA: "Visa",
  MASTERCARD: "Mastercard",
  ELO: "Elo",
  AMEX: "Amex",
  DINERS: "Diners",
  DISCOVER: "Discover",
  HIPERCARD: "Hipercard",
  HIPER: "Hiper",
  JCB: "Jcb",
  MAESTRO: "Maestro",
  UNIONPAY: "Unionpay",
  MIR: "Mir",
  ALIPAY: "Alipay",
  PAYPAL: "Paypal",
  "": undefined,
} as const;

type PaymentIconType = Parameters<typeof PaymentIcon>[0]["type"];

export function getPaymentIcon(
  bandeira: BandeiraCartao,
  width = 60,
  className = "text-blue-500 text-xl"
): React.ReactNode {
  const type = typeMap[bandeira];

  if (!type) return null;

  return (
    <PaymentIcon
      type={type as PaymentIconType}
      format="logo"
      className={className}
      width={width}
    />
  );
}
