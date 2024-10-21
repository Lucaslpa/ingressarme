import { IServicesPayment, Payment } from '@business';
import { Database } from '../data/Database';

export class PaymentServices extends IServicesPayment {
  private readonly database = new Database();

  async add(entity: Payment): Promise<Payment> {
    const query = `INSERT INTO payments (id, amount,payment_method,  currency, user_id, created_at, status, created_at , updated_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    const values = [
      entity.id,
      entity.amount,
      entity.method,
      entity.currency,
      entity.userId,
      entity.date,
      entity.status,
      entity.date,
    ];

    await this.database.query(query, values);

    return entity;
  }
  update(entity: Payment): Promise<Payment> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Payment | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Payment[]> {
    throw new Error('Method not implemented.');
  }
}
