import { ENotification, Notifications } from '../entityNotification';
import { IAcquisitionValidator } from '../validators/interfaces/IAcquisitionValidator';
import { Entity } from './Entity';
import { Payment } from './Payment';
import { Ticket } from './Ticket';

export class Acquisition extends Entity<Acquisition> {
  constructor(
    public readonly userId: string,
    public readonly ticket: Ticket,
    public readonly quantity: number,
    public readonly payment: Payment,
    protected notifications: Notifications,
    protected acquisitionValidator: IAcquisitionValidator,
    protected _id?: string,
  ) {
    super(notifications, acquisitionValidator, _id);
  }

  public get totalPrice(): number {
    return this.ticket.price * this.quantity;
  }

  public isValid(): boolean {
    if (!this.acquisitionValidator) {
      this.notifications.push(new ENotification('Validator not found'));
      return false;
    }

    this.ticket.isValid();

    const { isValid, errors } = this.acquisitionValidator.validate(this);

    if (!isValid) {
      this.notifications.pushNotifations(
        errors.map((error) => new ENotification(error)),
      );
    }

    return !this.notifications.hasNotifications;
  }
}
