export enum EPaymentMethod {
  CREDIT_CARD = 1,
  DEBIT_CARD = 2,
  PIX = 3,
}

export const PaymentMethodsValues = Object.values(EPaymentMethod).filter(
  (value) => typeof value === 'number',
) as number[];
