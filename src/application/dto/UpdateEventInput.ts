export class UpdateEventInput {
  constructor(
    public readonly eventId: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly address: string,
    public readonly longitude: number,
    public readonly latitude: number,
    public readonly iconImg: string,
    public readonly bannerImg: string,
  ) {}
}
