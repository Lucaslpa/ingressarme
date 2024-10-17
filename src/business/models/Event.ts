import { UUID } from 'node:crypto';
import { ENotification } from '../entityNotification';
import { Notifications } from '../entityNotification/Notifications';
import { IModelValidator } from '../interfaces';
import { Category } from './Category';
import { Duration } from './Duration';
import { Entity } from './Entity';
import { Localization } from './Localization';
import { Ticket } from './Ticket';

export class MEvent extends Entity<MEvent> {
  public readonly tickets: Ticket[] = [];
  public readonly categories: Category[] = [];

  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly date: Duration,
    public readonly localization: Localization,
    public readonly iconImg: string,
    public readonly bannerImg: string,
    public readonly userId: string,
    protected notifications: Notifications,
    protected readonly _id?: string,
  ) {
    super(notifications, undefined, _id);
  }

  setTickets(tickets: Ticket[]) {
    this.tickets.push(...tickets);
  }

  setTicket(ticket: Ticket) {
    this.tickets.push(ticket);
  }

  setCategories(categories: Category[]) {
    this.categories.push(...categories);
  }

  setCategory(category: Category) {
    this.categories.push(category);
  }

  get ticketQuantity(): number {
    return this.tickets.reduce((acc, ticket) => acc + ticket.quantity, 0);
  }

  public isValid(validator?: IModelValidator<MEvent>): boolean {
    const effectiveValidator = validator;

    if (!effectiveValidator) {
      this.notifications.push(new ENotification('Validator not found'));
      return false;
    }
    const { isValid, errors } = effectiveValidator.validate(this);

    this.localization.isValid();
    this.date.isValid();
    this.tickets.every((ticket) => ticket.isValid());
    this.categories.every((ticket) => ticket.isValid());

    if (!isValid) {
      this.notifications.pushNotifations(
        errors.map((error) => new ENotification(error)),
      );
    }

    return !this.notifications.hasNotifications;
  }
}
