import {
  ETicketTier,
  IServicesTicket,
  Notifications,
  Ticket,
  TicketValidator,
} from '@business';

export const servicesTicketStub: IServicesTicket = {
  add: function (entity: Ticket): Promise<Ticket> {
    return Promise.resolve(entity);
  },
  update: function (entity: Ticket): Promise<Ticket> {
    return Promise.resolve(entity);
  },
  delete: function (id: string): Promise<void> {
    return Promise.resolve();
  },
  getById: function (id: string): Promise<Ticket> {
    return Promise.resolve(
      new Ticket(
        'ticket festa 1',
        200,
        20,
        '1',
        ETicketTier.diamond,
        'RS',
        new Notifications(),
        new TicketValidator(),
      ),
    );
  },
  getAll: function (): Promise<Ticket[]> {
    return Promise.resolve([
      new Ticket(
        'ticket festa 1',
        200,
        20,
        '1',
        ETicketTier.diamond,
        'RS',
        new Notifications(),
        new TicketValidator(),
      ),
      new Ticket(
        'ticket festa 2',
        200,
        20,
        '1',
        ETicketTier.diamond,
        'RS',
        new Notifications(),
        new TicketValidator(),
      ),
    ]);
  },
  getTicketsFromEvent: function (eventId: string): Promise<Ticket[]> {
    throw new Error('Function not implemented.');
  },
  removeTicketFromEvent: function (eventId: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getTicketEvent: function (eventId: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
};
