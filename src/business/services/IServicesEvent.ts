import { Category, MEvent, Ticket } from '../models';
import { IServices } from './IServices';

export abstract class IServicesEvent extends IServices<MEvent> {
  abstract addTicket(ticket: Ticket): Promise<void>;
  abstract updateTicket(ticket: Ticket): Promise<void>;
  abstract removeTicket(ticketId: string): Promise<void>;
  abstract getByIdEventCategories(id: string): Promise<MEvent | null>;
}
