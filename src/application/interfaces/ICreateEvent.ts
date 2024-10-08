export abstract class ICreateEvent {
  abstract execute(
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
  ): Promise<void>;
}
