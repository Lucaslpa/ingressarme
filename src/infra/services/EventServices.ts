import { ECategories, IServicesEvent, MEvent, Ticket } from '@business';
import { Database } from '../data/Database';

export class EventServices extends IServicesEvent {
  private readonly database = new Database();

  async addTicket(ticket: Ticket): Promise<void> {
    const queryCreateTicket =
      'INSERT INTO Tickets ($1, $2, $3, $4, $5, $6, $7, $8, $9 )';
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
    this.database.query(query, values);
  }

  async addCategory(eventId: string, category: ECategories): Promise<void> {
    const query = 'INSERT INTO Event_Categorie ($1, $2)';
    const values = [eventId, category];
    this.database.query(query, values);
  }

  async removeCategory(eventId: string, categoryId: string): Promise<void> {
    const query =
      'DELETE FROM Event_Categorie WHERE eventId = $1 AND categoryId = $2';
    const values = [eventId, categoryId];
    this.database.query(query, values);
  }

  async add(entity: MEvent): Promise<MEvent> {
    const query =
      'INSERT INTO Events ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14)';

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
