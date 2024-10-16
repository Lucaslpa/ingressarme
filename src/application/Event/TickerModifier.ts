import {
  IModelValidator,
  IServices,
  IServicesEvent,
  Notifications,
  Ticket,
  Tier,
} from '@business';
import { Response } from '../dto';
import { ITicketModifier } from '../interfaces/ITicketModifier';
import {
  CreateTicketInput,
  UpdateTicketInput,
  RemoveTicketInput,
} from '../dto/TickertModifierInput';
import { UUID } from 'node:crypto';

export class TickerModifier extends ITicketModifier {
  constructor(
    private readonly eventServices: IServicesEvent,
    private readonly ticketServices: IServices<Ticket>,
    private readonly ticketValidator: IModelValidator<Ticket>,
    private readonly tierServices: IServices<Tier>,
    private readonly notifcations: Notifications,
  ) {
    super();
  }

  async add(input: CreateTicketInput): Promise<Response<null>> {
    try {
      const { eventId, tier, description, price, quantity, currency } = input;
      if (!eventId || !tier) {
        return new Response<null>(false, null, [
          'eventId and tierId are both required',
        ]);
      }

      const Tier = await this.tierServices.getById(tier);

      if (!Tier) {
        return new Response<null>(false, null, ['Invalid tier']);
      }

      const ticket = new Ticket(
        description,
        price,
        quantity,
        eventId,
        tier,
        currency,
        this.notifcations,
        this.ticketValidator,
      );

      if (!ticket.isValid()) {
        return new Response<null>(false, null, ticket.getNotifications);
      }

      await this.ticketServices.add(ticket);

      return new Response<null>(true, null, []);
    } catch (error) {
      if (error instanceof Error) {
        return new Response<null>(false, null, [error.message]);
      }
      return new Response<null>(false, null, ['Error on ticket creation']);
    }
  }

  async update(input: UpdateTicketInput): Promise<Response<null>> {
    try {
      const { ticketId, quantity, description, currency, price } = input;

      if (!ticketId)
        return new Response<null>(false, null, ['ticketId  is required']);

      const oldTicket = await this.ticketServices.getById(ticketId);

      if (!oldTicket)
        return new Response<null>(false, null, ['Ticket not found']);

      const ticket = new Ticket(
        description || oldTicket.description,
        price || oldTicket.price,
        quantity || oldTicket.quantity,
        oldTicket.eventId,
        oldTicket.tier,
        currency || oldTicket.currency,
        this.notifcations,
        this.ticketValidator,
        ticketId as UUID,
      );

      if (!ticket.isValid()) {
        return new Response<null>(false, null, ticket.getNotifications);
      }

      await this.ticketServices.update(ticket);

      return new Response<null>(true, null, []);
    } catch (error) {
      if (error instanceof Error) {
        return new Response<null>(false, null, [error.message]);
      }
      return new Response<null>(false, null, ['Error on ticket update']);
    }
  }
  async remove(input: RemoveTicketInput): Promise<Response<null>> {
    try {
      const { ticketId } = input;

      if (!ticketId)
        return new Response<null>(false, null, ['ticketId is required']);

      const ticket = await this.ticketServices.getById(ticketId);

      if (!ticket) return new Response<null>(false, null, ['Ticket not found']);

      await this.ticketServices.delete(ticketId);

      return new Response<null>(true, null, []);
    } catch (error) {
      if (error instanceof Error) {
        return new Response<null>(false, null, [error.message]);
      }
      return new Response<null>(false, null, ['Error on ticket deletion']);
    }
  }
}
