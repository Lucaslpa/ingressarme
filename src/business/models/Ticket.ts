import { UUID } from 'node:crypto';
import { Notifications } from '../entityNotification/Notifications';
import { ETicketTier, IModelValidator } from '../interfaces';
import { Entity } from './Entity';

export class Ticket extends Entity<Ticket> {
  constructor(
    public readonly description: string,
    public readonly price: number,
    private _quantity: number,
    public readonly eventId: string,
    public readonly tier: ETicketTier,
    public readonly currency: string,
    protected notifications: Notifications,
    protected ticketValidator: IModelValidator<Ticket>,
    protected readonly _id?: UUID,
  ) {
    super(notifications, ticketValidator, _id);
  }

  get quantity(): number {
    return this._quantity;
  }

  incrementQuantity(quantity: number) {
    this._quantity += quantity;
  }

  decrementQuantity(quantity: number) {
    this._quantity -= quantity;
  }
}
