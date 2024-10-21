import { Cart, Ticket } from '../models';
import { IServices } from './IServices';

export abstract class IServicesTicket extends IServices<Ticket> {
  abstract getTicketsFromEvent(eventId: string): Promise<Ticket[]>;
  abstract removeTicketFromEvent(eventId: string): Promise<void>;
  abstract getTicketEvent(eventId: string): Promise<void>;
  abstract getTicketsByIds(ids: string[]): Promise<Ticket[]>;
}
