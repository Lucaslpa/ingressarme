import {
  Acquisition,
  IServicesAcquisition,
  IServicesPayment,
  Payment,
} from '@business';
import { Database } from '../data/Database';

export class AcquisitionServices extends IServicesAcquisition {
  private readonly database = new Database();

  async add(entity: Acquisition): Promise<Acquisition> {
    const query =
      'INSERT INTO Acquisition (id, ticket_id, user_id, quantity, payment_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)';

    const values = [
      entity.id,
      entity.ticket.id,
      entity.userId,
      entity.quantity,
      entity.paymentId,
      new Date().toISOString(),
      new Date().toISOString(),
    ];

    await this.database.query(query, values);

    return entity;
  }

  update(entity: Acquisition): Promise<Acquisition> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Acquisition | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Acquisition[]> {
    throw new Error('Method not implemented.');
  }
}
