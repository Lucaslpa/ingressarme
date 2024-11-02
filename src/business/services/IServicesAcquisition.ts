import { Acquisition, Category, MEvent, Ticket } from '../models';
import { IServices } from './IServices';

export abstract class IServicesAcquisition extends IServices<Acquisition> {
  abstract getAcquisitionTicketPaymentByUserAndTicket(
    userId: string,
    ticketId: string,
  ): Promise<Acquisition | null>;
}
