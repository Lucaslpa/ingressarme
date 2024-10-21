import { Notifications } from '../entityNotification';
import { EPaymentStatus } from '../interfaces';
import { EPaymentMethod } from '../interfaces/EPaymentMethod';
import { IPaymentValidator } from '../validators/interfaces/IPaymentValidator';
import { Entity } from './Entity';

export class Payment extends Entity<Payment> {
  private _amount: number = 0;
  public readonly date: string = new Date().toISOString();
  public readonly status: EPaymentStatus = EPaymentStatus.PENDING;

  constructor(
    public readonly method: EPaymentMethod,
    public readonly currency: string,
    public readonly userId: string,
    protected notifications: Notifications,
    protected paymentValidator: IPaymentValidator,
    protected _id?: string,
  ) {
    super(notifications, paymentValidator, _id);
  }

  get amount(): number {
    return this._amount;
  }

  incrementAmount(amount: number) {
    this._amount = +amount;
  }

  decrementAmount(amount: number) {
    this._amount = -amount;
  }
}
