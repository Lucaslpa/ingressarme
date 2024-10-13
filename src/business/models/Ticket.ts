import { UUID } from 'node:crypto';
import { Notifications } from '../entityNotification/Notifications';
import { IModelValidator } from '../interfaces';
import { Entity } from './Entity';

export class Ticket extends Entity<Ticket> {
  constructor(
    public readonly description: string,
    public readonly price: number,
    public readonly quantity: number,
    public readonly eventId: string,
    public readonly tierId: string,
    public readonly currency: string,
    protected notifications: Notifications,
    protected ticketValidator: IModelValidator<Ticket>,
    protected readonly _id?: UUID,
  ) {
    super(notifications, ticketValidator, _id);
  }
}
