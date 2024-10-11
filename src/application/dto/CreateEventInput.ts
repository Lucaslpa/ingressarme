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
      tierId: string;
    }[],
    public readonly iconImg: string,
    public readonly bannerImg: string,
    public readonly categoriesIds: string[],
    public readonly userId: string,
  ) {}
}
