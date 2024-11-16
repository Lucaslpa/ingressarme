import {
  Acquisition,
  IServicesAcquisition,
  Notifications,
  Payment,
  paymentValidator,
  Ticket,
  TicketValidator,
} from '@business';
import { Database } from '../data/Database';
import { AcquisitionValidator } from 'src/business/validators/AcquisitionValidator';

export class AcquisitionServices extends IServicesAcquisition {
  private readonly database = new Database();

  async getAcquisitionTicketPaymentByUserAndTicket(
    userId: string,
    ticketId: string,
  ): Promise<Acquisition | null> {
    const query = `
  SELECT 
    Acquisition.id AS acquisition_id,
    Acquisition.ticket_id AS acquisition_ticket_id,
    Acquisition.user_id AS acquisition_user_id,
    Acquisition.quantity AS acquisition_quantity,
    Acquisition.payment_id AS acquisition_payment_id,
    Acquisition.created_at AS acquisition_created_at,
    Acquisition.updated_at AS acquisition_updated_at,
    Tickets.id AS ticket_id,
    Tickets.description AS ticket_description,
    Tickets.quantity AS ticket_quantity,
    Tickets.price AS ticket_price,
    Tickets.event_id AS ticket_event_id,
    Tickets.tier_name AS ticket_tier_name,
    Tickets.currency AS ticket_currency,
    Tickets.created_at AS ticket_created_at,
    Tickets.updated_at AS ticket_updated_at,
    Payment.id AS payment_id,
    Payment.amount AS payment_amount,
    Payment.payment_method AS payment_method,
    Payment.currency AS payment_currency,
    Payment.status AS payment_status,
    Payment.user_id AS payment_user_id,
    Payment.created_at AS payment_created_at,
    Payment.updated_at AS payment_updated_at
  FROM Acquisition
  INNER JOIN Tickets ON Acquisition.ticket_id = Tickets.id
  INNER JOIN Payment ON Acquisition.payment_id = Payment.id
  WHERE Acquisition.user_id = $1 AND Acquisition.ticket_id = $2
  `;

    const values = [userId, ticketId];

    const result = await this.database.query(query, values);

    console.log(result);
    if (result.rowCount === 0) {
      return null;
    }

    const queryResult = result.rows[0];

    const ticket = new Ticket(
      queryResult.ticket_description,
      queryResult.ticket_price,
      queryResult.ticket_quantity,
      queryResult.ticket_event_id,
      queryResult.ticket_tier_name,
      queryResult.ticket_currency,
      new Notifications(),
      new TicketValidator(),
      queryResult.ticket_id,
    );

    const payment = new Payment(
      queryResult.payment_method,
      queryResult.payment_currency,
      queryResult.payment_user_id,
      new Notifications(),
      new paymentValidator(),
      queryResult.payment_id,
    );

    payment.incrementAmount(queryResult.payment_amount);

    const acquisition = new Acquisition(
      queryResult.acquisition_user_id,
      ticket,
      queryResult.acquisition_quantity,
      payment,
      new Notifications(),
      new AcquisitionValidator(),
      queryResult.acquisition_id,
    );

    return acquisition;
  }

  async add(entity: Acquisition): Promise<Acquisition> {
    const query =
      'INSERT INTO Acquisition (id, ticket_id, user_id, quantity, payment_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)';

    const values = [
      entity.id,
      entity.ticket.id,
      entity.userId,
      entity.quantity,
      entity.payment.id,
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
  async getById(id: string): Promise<Acquisition | null> {
    const query = `
    SELECT 
      Acquisition.id AS acquisition_id,
      Acquisition.ticket_id AS acquisition_ticket_id,
      Acquisition.user_id AS acquisition_user_id,
      Acquisition.quantity AS acquisition_quantity,
      Acquisition.payment_id AS acquisition_payment_id,
      Acquisition.created_at AS acquisition_created_at,
      Acquisition.updated_at AS acquisition_updated_at,
      Tickets.id AS ticket_id,
      Tickets.description AS ticket_description,
      Tickets.quantity AS ticket_quantity,
      Tickets.price AS ticket_price,
      Tickets.event_id AS ticket_event_id,
      Tickets.tier_name AS ticket_tier_name,
      Tickets.currency AS ticket_currency,
      Tickets.created_at AS ticket_created_at,
      Tickets.updated_at AS ticket_updated_at,
      Payment.id AS payment_id,
      Payment.amount AS payment_amount,
      Payment.payment_method AS payment_method,
      Payment.currency AS payment_currency,
      Payment.status AS payment_status,
      Payment.user_id AS payment_user_id,
      Payment.created_at AS payment_created_at,
      Payment.updated_at AS payment_updated_at
    FROM Acquisition
    INNER JOIN Tickets ON Acquisition.ticket_id = Tickets.id
    INNER JOIN Payment ON Acquisition.payment_id = Payment.id
    WHERE Acquisition.id = $1 
    `;

    const values = [id];

    const result = await this.database.query(query, values);

    if (!result.length) {
      return null;
    }

    const queryResult = result[0];

    const ticket = new Ticket(
      queryResult.ticket_description,
      queryResult.ticket_price,
      queryResult.ticket_quantity,
      queryResult.ticket_event_id,
      queryResult.ticket_tier_name,
      queryResult.ticket_currency,
      new Notifications(),
      new TicketValidator(),
      queryResult.ticket_id,
    );

    const payment = new Payment(
      queryResult.payment_method,
      queryResult.payment_currency,
      queryResult.payment_user_id,
      new Notifications(),
      new paymentValidator(),
      queryResult.payment_id,
    );

    payment.incrementAmount(queryResult.payment_amount);
    payment.setStatus(queryResult.payment_status);

    const acquisition = new Acquisition(
      queryResult.acquisition_user_id,
      ticket,
      queryResult.acquisition_quantity,
      payment,
      new Notifications(),
      new AcquisitionValidator(),
      queryResult.acquisition_id,
    );

    return acquisition;
  }
  getAll(): Promise<Acquisition[]> {
    throw new Error('Method not implemented.');
  }
}
