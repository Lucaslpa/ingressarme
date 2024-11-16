import { ECategories, ETicketTier } from '@business';

export class CreateEventInput {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly address: string,
    public readonly longitude: number,
    public readonly latitude: number,
    public readonly ticketInfos: {
      quantity: number;
      price: number;
      description: string;
      tier: ETicketTier;
      currency: string;
    }[],
    public readonly iconImg: string,
    public readonly bannerImg: string,
    public readonly categories: ECategories[],
    public readonly userId: string,
  ) {}
}
