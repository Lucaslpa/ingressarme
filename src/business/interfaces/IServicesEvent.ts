import { MEvent, Ticket } from '../models';
import { IServices } from './IServices';

export abstract class IServicesEvent extends IServices<MEvent> {
  abstract addCategory(eventId: string, categoryId: string): Promise<void>;
  abstract removeCategory(eventId: string, categoryId: string): Promise<void>;
  abstract addTicket(ticket: Ticket): Promise<void>;
  abstract updateTicket(ticket: Ticket): Promise<void>;
  abstract removeTicket(ticketId: string): Promise<void>;
}
