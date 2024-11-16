export class TicketViewer {
  constructor(
    readonly id: number,
    readonly description: string,
    readonly name: string,
    readonly price: number,
    readonly quantity: number,
    readonly currency: string,
  ) {}
}
