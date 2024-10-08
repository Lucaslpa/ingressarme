export class CreateEventInput {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly adress: string,
    public readonly longitude: number,
    public readonly latitude: number,
    public readonly ticketQuantity: number,
    public readonly categoriesIds: string[],
    public readonly iconImg: string,
    public readonly bannerImg: string,
  ) {}
}
