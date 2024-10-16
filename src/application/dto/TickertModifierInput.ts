import { ETicketTier } from '@business';

export class CreateTicketInput {
  constructor(
    public readonly eventId: string,
    public readonly description: string,
    public readonly price: number,
    public readonly quantity: number,
    public readonly currency: string,
    public readonly tier: ETicketTier,
  ) {}
}

export class UpdateTicketInput {
  constructor(
    public readonly ticketId: string,
    public readonly description?: string,
    public readonly price?: number,
    public readonly quantity?: number,
    public readonly currency?: string,
  ) {}
}

export class RemoveTicketInput {
  constructor(public readonly ticketId: string) {}
}
