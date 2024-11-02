import {
  Acquisition,
  Cart,
  IAcquisitionValidator,
  IServicesAcquisition,
  IServicesPayment,
  IServicesTicket,
  Notifications,
  Payment,
} from '@business';
import { AcquireTicketInput } from '../dto';
import { Response } from '../dto';
import { IAcquireTicket } from '../interfaces/IAcquireTicket';
import { IPaymentValidator } from 'src/business/validators/interfaces/IPaymentValidator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AcquireTicket extends IAcquireTicket {
  constructor(
    private readonly ticketServices: IServicesTicket,
    private readonly acquisitionServices: IServicesAcquisition,
    private readonly paymentServices: IServicesPayment,
    private readonly paymentValidator: IPaymentValidator,
    private readonly acquisitionValidator: IAcquisitionValidator,
    private readonly notifications: Notifications,
  ) {
    super();
  }

  async execute(input: AcquireTicketInput) {
    const { tickets: ticketsInput, paymentMethod, currency, userId } = input;

    if (!ticketsInput.length) {
      return new Response(false, null, ['No tickets provided']);
    }

    if (!userId) {
      return new Response(false, null, ['userId is required']);
    }

    if (!paymentMethod) {
      return new Response(false, null, ['paymentMethod is required']);
    }

    if (!currency) {
      return new Response(false, null, ['currency is required']);
    }

    const ticketIds = ticketsInput.map((t) => t.id);
    const tickets = await this.ticketServices.getTicketsByIds(ticketIds);

    if (!tickets.length) {
      return new Response(false, null, ['Invalid ticket ids']);
    }

    const payment = new Payment(
      paymentMethod,
      currency,
      userId,
      this.notifications,
      this.paymentValidator,
    );

    const cart = new Cart(payment, this.notifications);

    for (const ticketInput of ticketsInput) {
      const ticket = tickets.find((t) => t.id === ticketInput.id);

      if (!ticket) {
        return new Response(false, null, ['Invalid ticket id']);
      }

      const ticketAquisiction = new Acquisition(
        userId,
        ticket,
        ticketInput.quantity,
        payment,
        this.notifications,
        this.acquisitionValidator,
      );
      ticket.decrementQuantity(ticketAquisiction.quantity);
      cart.addTransaction(ticketAquisiction);
    }

    if (!cart.isValid()) {
      return new Response(false, null, this.notifications.getNotifications);
    }

    payment.incrementAmount(cart.totalPrice);
    await this.paymentServices.add(cart.payment);

    for (const transaction of cart.transactions) {
      await this.acquisitionServices.add(transaction);
    }

    for (const ticket of tickets) {
      await this.ticketServices.update(ticket);
    }

    return new Response(true, null, []);
  }
}
