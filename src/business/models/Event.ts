import { ENotification } from '../entityNotification';
import { Notifications } from '../entityNotification/Notifications';
import { IModelValidator } from '../interfaces';
import { Categorie } from './Categorie';
import { Duration } from './Duration';
import { Entity } from './Entity';
import { Localization } from './Localization';
import { Ticket } from './Ticket';

export class MEvent extends Entity<MEvent> {
  public readonly tickets: Ticket[] = [];

  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly date: Duration,
    public readonly categoriesIds: string[] = [],
    public readonly localization: Localization,
    public readonly iconImg: string,
    public readonly bannerImg: string,
    public readonly userId: string,
    protected notifications: Notifications,
  ) {
    super(notifications);
  }

  setTickets(tickets: Ticket[]) {
    this.tickets.push(...tickets);
  }

  setTicket(ticket: Ticket) {
    this.tickets.push(ticket);
  }

  get ticketQuantity(): number {
    return this.tickets.reduce((acc, ticket) => acc + ticket.quantity, 0);
  }
}
