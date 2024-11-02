import { IServicesPayment, Payment } from '@business';
import { Database } from '../data/Database';

export class PaymentServices extends IServicesPayment {
  private readonly database = new Database();

  async add(entity: Payment): Promise<Payment> {
    const query = `INSERT INTO Payment (id, amount, payment_method,  currency, user_id,  status, created_at , updated_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    const values = [
      entity.id,
      entity.amount,
      entity.method,
      entity.currency,
      entity.userId,
      entity.status,
      entity.date,
      entity.date,
    ];

    await this.database.query(query, values);

    return entity;
  }

  async update(entity: Payment): Promise<Payment> {
    const query = `UPDATE Payment SET amount = $1, payment_method = $2, currency = $3, status = $4, user_id = $5, updated_at = $6 WHERE id = $7`;

    const values = [
      entity.amount,
      entity.method,
      entity.currency,
      entity.status,
      entity.userId,
      new Date().toISOString(),
      entity.id,
    ];

    await this.database.query(query, values);
    return entity;
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
