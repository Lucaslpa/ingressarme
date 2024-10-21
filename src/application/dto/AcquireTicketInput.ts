import { EPaymentMethod } from 'src/business/interfaces/EPaymentMethod';

export class AcquireTicketInput {
  constructor(
    public readonly tickets: {
      id: string;
      quantity: number;
    }[],
    public readonly paymentMethod: EPaymentMethod,
    public readonly currency: string,
    public readonly userId: string,
  ) {}
}
