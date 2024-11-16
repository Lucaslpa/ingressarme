import {
  ETicketTier,
  ETicketTierArray,
  IModelValidator,
  IServicesEvent,
  IServicesTicket,
  ITicketValidator,
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
} from '../dto/TicketModifierInput';
import { UUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketModifier extends ITicketModifier {
  constructor(
    private readonly ticketServices: IServicesTicket,
    private readonly ticketValidator: ITicketValidator,
    private readonly notifcations: Notifications,
  ) {
    super();
  }

  async add(
    input: CreateTicketInput,
  ): Promise<Response<{ ticketId: string } | null>> {
    try {
      const { eventId, tier, description, price, quantity, currency } = input;

      if (!eventId || !tier) {
        return new Response(false, null, [
          'eventId and tier are both required',
        ]);
      }

      const Tier = ETicketTierArray.find((t) => t === tier);

      if (!Tier) {
        return new Response(false, null, ['Invalid tier']);
      }
      console.log('tier', Tier);
      const eventTickers =
        await this.ticketServices.getTicketsFromEvent(eventId);
      console.log('eventTickers', eventTickers);
      if (!eventTickers.length) {
        return new Response(false, null, ['Event not found']);
      }

      const ticketTier = eventTickers.find((t) => t.tier === tier);

      if (ticketTier) {
        return new Response(false, null, [
          'Ticker with this tier already exists',
        ]);
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
        return new Response(false, null, ticket.getNotifications);
      }

      await this.ticketServices.add(ticket);

      return new Response(true, { ticketId: ticket.id }, []);
    } catch (error) {
      if (error instanceof Error) {
        return new Response(false, null, [error.message]);
      }
      return new Response(false, null, ['Error on ticket creation']);
    }
  }

  async update(input: UpdateTicketInput): Promise<Response<null>> {
    try {
      const { ticketId, quantity, description, currency, price, tier } = input;

      if (!ticketId)
        return new Response(false, null, ['ticketId  is required']);

      const oldTicket = await this.ticketServices.getById(ticketId);

      if (!oldTicket) return new Response(false, null, ['Ticket not found']);

      const ticket = new Ticket(
        description || oldTicket.description,
        price || oldTicket.price,
        quantity || oldTicket.quantity,
        oldTicket.eventId,
        tier || oldTicket.tier,
        currency || oldTicket.currency,
        this.notifcations,
        this.ticketValidator,
        ticketId as UUID,
      );

      if (!ticket.isValid()) {
        return new Response(false, null, ticket.getNotifications);
      }

      await this.ticketServices.update(ticket);

      return new Response(true, null, []);
    } catch (error) {
      if (error instanceof Error) {
        return new Response(false, null, [error.message]);
      }
      return new Response(false, null, ['Error on ticket update']);
    }
  }

  async remove(input: RemoveTicketInput): Promise<Response<null>> {
    try {
      const { ticketId } = input;

      if (!ticketId) return new Response(false, null, ['ticketId is required']);

      const ticket = await this.ticketServices.getById(ticketId);

      if (!ticket) return new Response(false, null, ['Ticket not found']);

      await this.ticketServices.delete(ticketId);

      return new Response(true, null, []);
    } catch (error) {
      if (error instanceof Error) {
        return new Response(false, null, [error.message]);
      }
      return new Response(false, null, ['Error on ticket deletion']);
    }
  }
}
