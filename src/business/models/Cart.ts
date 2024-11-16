import { ENotification, Notifications } from '../entityNotification';
import { Acquisition } from './Acquisition';
import { Payment } from './Payment';

export class Cart {
  private readonly _transactions: Acquisition[] = [];

  constructor(
    public readonly payment: Payment,
    private readonly notifications: Notifications,
  ) {}

  public get totalPrice(): number {
    return this._transactions.reduce(
      (total, transaction) => total + transaction.totalPrice,
      0,
    );
  }

  public addTransaction(transaction: Acquisition): void {
    this.payment.incrementAmount(this.totalPrice);
    this._transactions.push(transaction);
  }

  public removeTransaction(transaction: Acquisition): void {
    this.payment.decrementAmount(transaction.totalPrice);
    const index = this._transactions.indexOf(transaction);
    if (index > -1) {
      this._transactions.splice(index, 1);
    }
  }

  public get transactions(): Acquisition[] {
    return this._transactions;
  }

  public isValid(): boolean {
    this._transactions.every((transaction) => transaction.isValid());
    this.payment.isValid();

    const validCart = this._transactions.length > 0;

    if (!validCart) {
      this.notifications.push(
        new ENotification('Theres no tickets to buy in the cart'),
      );
    }

    return !this.notifications.hasNotifications;
  }
}
