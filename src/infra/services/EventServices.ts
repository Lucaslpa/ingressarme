import {
  Duration,
  DurationValidator,
  ECategories,
  IServicesEvent,
  Localization,
  LocalizationValidator,
  MEvent,
  Notifications,
  Ticket,
} from '@business';
import { Database } from '../data/Database';

export class EventServices extends IServicesEvent {
  private readonly database = new Database();

  async addTicket(ticket: Ticket): Promise<void> {
    const queryCreateTicket =
      'INSERT INTO tickets (id, description, quantity, price, event_id, tier_name, currency, created_at, updated_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 )';
    const valuesCreateTicket = [
      ticket.id,
      ticket.description,
      ticket.quantity,
      ticket.price,
      ticket.eventId,
      ticket.tier,
      ticket.currency,
      new Date().toISOString(),
      new Date().toISOString(),
    ];
    await this.database.query(queryCreateTicket, valuesCreateTicket);
  }

  async updateTicket(ticket: Ticket): Promise<void> {
    const query =
      'UPDATE Tickets SET description = $1, quantity = $2, price = $3, tierId = $4, currency = $5, updatedAt = $6 WHERE id = $7 AND eventId = $8';

    const values = [
      ticket.description,
      ticket.quantity,
      ticket.price,
      ticket.tier,
      ticket.currency,
      new Date().toISOString(),
      ticket.id,
      ticket.eventId,
    ];

    await this.database.query(query, values);
  }

  async removeTicket(ticketId: string): Promise<void> {
    const query = 'DELETE FROM Tickets WHERE id = $1';
    const values = [ticketId];
    await this.database.query(query, values);
  }

  async addCategory(eventId: string, category: ECategories): Promise<void> {
    const query =
      'INSERT INTO event_categories (event_id, category_name) VALUES ($1, $2)';
    const values = [eventId, category];
    await this.database.query(query, values);
  }

  async removeCategory(eventId: string, categoryId: string): Promise<void> {
    const query =
      'DELETE FROM Event_Categorie WHERE eventId = $1 AND categoryId = $2';
    const values = [eventId, categoryId];
    this.database.query(query, values);
  }

  async add(entity: MEvent): Promise<MEvent> {
    const query = `
    INSERT INTO events (
     id, 
     name, 
     description, 
     address,
     latitude, 
     longitude, 
     start_date, 
     end_date,
     icon_img, 
     banner_img,
     created_at, 
     updated_at, 
     user_id
     )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;

    const values = [
      entity.id,
      entity.name,
      entity.description,
      entity.localization.address,
      entity.localization.latitude,
      entity.localization.longitude,
      entity.date.startDate,
      entity.date.endDate,
      entity.iconImg,
      entity.bannerImg,
      new Date().toISOString(),
      new Date().toISOString(),
      entity.userId,
    ];

    await this.database.query(query, values);

    for (let ticket of entity.tickets) {
      await this.addTicket(ticket);
    }

    for (let categorie of entity.categories) {
      await this.addCategory(entity.id, categorie.name);
    }

    return entity;
  }

  async update(entity: MEvent): Promise<MEvent> {
    const query = `
    UPDATE Events
    SET
      name = $1,
      description = $2,
      address = $3,
      latitude = $4,
      longitude = $5,
      start_date = $6,
      end_date = $7,
      icon_img = $8,
      banner_img = $9,
      updated_at = $10
    WHERE id = $11;
  `;

    const values = [
      entity.name,
      entity.description,
      entity.localization.address,
      entity.localization.latitude,
      entity.localization.longitude,
      entity.date.startDate,
      entity.date.endDate,
      entity.iconImg,
      entity.bannerImg,
      new Date().toISOString(),
      entity.id,
    ];
    await this.database.query(query, values);

    return entity;
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM Events WHERE id = $1';
    const values = [id];

    await this.database.query(query, values);

    return;
  }

  async getById(id: string): Promise<MEvent | null> {
    const query = `SELECT * FROM Events WHERE id = $1`;
    const values = [id];
    const queryResult = (await this.database.query(query, values))[0];

    if (!queryResult) return null;

    const duration = new Duration(
      new Date(queryResult.start_date).toISOString(),
      new Date(queryResult.end_date).toISOString(),
      new Notifications(),
      new DurationValidator(),
    );

    const localization = new Localization(
      queryResult.address,
      Number(queryResult.latitude),
      Number(queryResult.longitude),
      new Notifications(),
      new LocalizationValidator(),
    );

    const event = new MEvent(
      queryResult.name,
      queryResult.description,
      duration,
      localization,
      queryResult.icon_img,
      queryResult.banner_img,
      queryResult.userId,
      new Notifications(),
      queryResult.id,
    );

    return event;
  }

  getAll(): Promise<MEvent[]> {
    const query = 'SELECT * FROM Events';
    const events = this.database.query(query);

    return events;
  }
}
