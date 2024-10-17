import { ECategories, IServicesEvent, MEvent, Ticket } from '@business';
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
    this.database.connect();
    const query = `
  INSERT INTO events (
    id, name, description, address, latitude, longitude, start_date, end_date, icon_img, banner_img, created_at, updated_at, user_id
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
`;

    const values = [
      entity.id, // $1
      entity.name, // $2
      entity.description, // $3
      entity.localization.address, // $4
      entity.localization.latitude, // $5
      entity.localization.longitude, // $6
      entity.date.startDate, // $7
      entity.date.endDate, // $8
      entity.iconImg, // $9
      entity.bannerImg, // $10
      new Date().toISOString(), // $11 (created_at)
      new Date().toISOString(), // $12 (updated_at)
      entity.userId, // $13
    ];

    await this.database.query(query, values);

    for (let ticket of entity.tickets) {
      await this.addTicket(ticket);
    }

    for (let categorie of entity.categories) {
      await this.addCategory(entity.id, categorie.name);
    }
    this.database.disconnect();
    return entity;
  }

  async update(entity: MEvent): Promise<MEvent> {
    const query =
      'UPDATE Events SET name = $1, description = $2, address = $3, latitude = $4, longitude = $5, startDate = $6, endDate = $7, iconImg = $8, bannerImg = $9, updatedAt = $10 WHERE id = $11';

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
    this.database.query(query, values);
    return entity;
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM Events WHERE id = $1';
    const values = [id];
    await this.database.query(query, values);
    return;
  }

  async getById(id: string): Promise<MEvent> {
    const query = 'SELECT * FROM Events WHERE id = $1';
    const values = [id];
    const event = await this.database.query(query, values);

    return event;
  }

  getAll(): Promise<MEvent[]> {
    const query = 'SELECT * FROM Events';
    const events = this.database.query(query);

    return events;
  }
}
