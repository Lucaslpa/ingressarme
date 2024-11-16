import {
  EPaymentStatus,
  IServicesAcquisition,
  IServicesPayment,
  IServicesTicket,
} from '@business';
import { RefundTicketInput } from '../dto';
import { Response } from '../dto';
import { IRefundTicket } from '../interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefundTicket extends IRefundTicket {
  constructor(
    private readonly ticketServices: IServicesTicket,
    private readonly acquisitionServices: IServicesAcquisition,
    private readonly paymentServices: IServicesPayment,
  ) {
    super();
  }

  async execute(input: RefundTicketInput) {
    const { acquisitionId } = input;

    if (!acquisitionId) {
      return new Response(false, null, ['acquisitionId is required']);
    }

    const acquisition = await this.acquisitionServices.getById(acquisitionId);

    if (!acquisition) {
      return new Response(false, null, ['Ticket not acquired']);
    }

    const payment = acquisition.payment;
    const ticket = acquisition.ticket;

    const paymentPending = payment?.status === EPaymentStatus.PENDING;
    const paymentDenied = payment?.status === EPaymentStatus.DENIED;

    if (!payment || paymentPending || paymentDenied) {
      return new Response(false, null, ['Ticket not paid']);
    }

    if (payment.status === EPaymentStatus.REFUNDED) {
      return new Response(false, null, ['Ticket already refunded']);
    }

    if (payment.status == EPaymentStatus.CONFIRMED) {
      payment.setStatus(EPaymentStatus.REFUNDED);
      await this.paymentServices.update(payment);
      ticket.incrementQuantity(acquisition.quantity);
      await this.ticketServices.update(ticket);
      return new Response(true, null, payment.getNotifications);
    }

    return new Response(true, null, []);
  }
}
