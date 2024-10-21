import {
  Category,
  CategoryValidator,
  Duration,
  DurationValidator,
  ECategories,
  IServicesCategory,
  IServicesEvent,
  IServicesTicket,
  Localization,
  LocalizationValidator,
  MEvent,
  Notifications,
  Ticket,
  TicketValidator,
} from '@business';
import { Database } from '../data/Database';

export class TicketServices extends IServicesTicket {
  private readonly database = new Database();

  async getTicketsByIds(ids: string[]): Promise<Ticket[]> {
    const query = 'SELECT * FROM tickets WHERE id = ANY($1)';
    const values = [ids];
    const queryResult = await this.database.query(query, values);

    const tickets = queryResult.map(
      (ticket: any) =>
        new Ticket(
          ticket.description,
          ticket.price,
          ticket.quantity,
          ticket.event_id,
          ticket.tier_name,
          ticket.currency,
          new Notifications(),
          new TicketValidator(),
          ticket.id,
        ),
    );

    return tickets;
  }

  async getTicketEvent(eventId: string): Promise<void> {
    const query = 'SELECT * FROM tickets WHERE event_id = $1';

    const values = [eventId];

    const queryResult = await this.database.query(query, values);

    const ticket = queryResult.map(
      (ticket: any) =>
        new Ticket(
          ticket.description,
          ticket.price,
          ticket.quantity,
          ticket.event_id,
          ticket.tier_name,
          ticket.currency,
          new Notifications(),
          new TicketValidator(),
          ticket.id,
        ),
    );

    console.log(ticket[0]);
  }

  async getTicketsFromEvent(eventId: string): Promise<Ticket[]> {
    const query = 'SELECT * FROM tickets WHERE event_id = $1';

    const values = [eventId];

    const queryResult = await this.database.query(query, values);

    const tickets = queryResult.map(
      (ticket: any) =>
        new Ticket(
          ticket.description,
          ticket.price,
          ticket.quantity,
          ticket.event_id,
          ticket.tier_name,
          ticket.currency,
          new Notifications(),
          new TicketValidator(),
          ticket.id,
        ),
    );

    return tickets;
  }

  async removeTicketFromEvent(eventId: string): Promise<void> {
    const query = 'DELETE FROM tickets WHERE  event_id = $1';

    const values = [eventId];
    await this.database.query(query, values);

    return;
  }

  async add(entity: Ticket): Promise<Ticket> {
    const query =
      'INSERT INTO tickets (id, description, price, quantity, event_id, tier_name, currency, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';

    const values = [
      entity.id,
      entity.description,
      entity.price,
      entity.quantity,
      entity.eventId,
      entity.tier,
      entity.currency,
      new Date().toISOString(),
      new Date().toISOString(),
    ];

    await this.database.query(query, values);

    return entity;
  }

  async update(entity: Ticket): Promise<Ticket> {
    const query = `UPDATE tickets SET description = $1, price = $2, quantity = $3, tier_name = $4, currency = $5 WHERE id = $6`;

    const values = [
      entity.description,
      entity.price,
      entity.quantity,
      entity.tier,
      entity.currency,
      entity.id,
    ];

    this.database.query(query, values);

    return entity;
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM tickets WHERE id = $1';
    const values = [id];
    await this.database.query(query, values);
  }

  async getById(id: string): Promise<Ticket | null> {
    const query = 'SELECT * FROM tickets WHERE id = $1';

    const values = [id];
    const queryResult = await this.database.query(query, values);

    if (!queryResult.length) {
      return null;
    }

    const ticket = queryResult.map(
      (ticket: any) =>
        new Ticket(
          ticket.description,
          Number(ticket.price),
          ticket.quantity,
          ticket.event_id,
          ticket.tier_name,
          ticket.currency,
          new Notifications(),
          new TicketValidator(),
          ticket.id,
        ),
    );

    console.log(ticket[0]);

    return ticket[0];
  }
  getAll(): Promise<Ticket[]> {
    throw new Error('Method not implemented.');
  }
}
