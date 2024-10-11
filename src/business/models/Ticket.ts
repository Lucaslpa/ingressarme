import { Notifications } from '../entityNotification/Notifications';
import { IModelValidator } from '../interfaces';
import { Entity } from './Entity';
import { Tier } from './Tier';

export class Ticket extends Entity<Ticket> {
  constructor(
    public readonly description: string,
    public readonly price: number,
    public readonly quantity: number,
    public readonly eventId: string,
    public readonly tierId: string,
    protected notifications: Notifications,
    protected ticketValidator: IModelValidator<Ticket>,
  ) {
    super(notifications, ticketValidator);
  }
}
