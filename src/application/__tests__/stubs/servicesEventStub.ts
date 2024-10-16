import {
  Duration,
  DurationValidator,
  IServicesEvent,
  Localization,
  LocalizationValidator,
  MEvent,
  Notifications,
  Ticket,
} from '@business';

export const servicesEventStub: IServicesEvent = {
  getById: async () => {
    const start = new Date();
    const end = new Date();
    const currentDate = new Date();
    start.setDate(currentDate.getDate() + 1);
    end.setDate(currentDate.getDate() + 2);
    return new MEvent(
      'name pelo menos',
      'description',
      new Duration(
        start.toISOString(),
        end.toISOString(),
        new Notifications(),
        new DurationValidator(),
      ),
      new Localization(
        'address 2113132123',
        0,
        0,
        new Notifications(),
        new LocalizationValidator(),
      ),
      'http://iconImg.com/iconImg',
      'http://bannerImg.com/bannerImg',
      'userId',
      new Notifications(),
    );
  },
  add: async function (entity: MEvent): Promise<MEvent> {
    return entity;
  },
  update: async function (entity: MEvent): Promise<MEvent> {
    return entity;
  },
  delete: function (id: string): Promise<void> {
    return Promise.resolve();
  },
  addCategory: function (eventId: string, categoryId: string): Promise<void> {
    return Promise.resolve();
  },
  removeCategory: function (
    eventId: string,
    categoryId: string,
  ): Promise<void> {
    return Promise.resolve();
  },
  getAll: function (): Promise<MEvent[]> {
    return Promise.resolve([]);
  },
  addTicket: function (ticket: Ticket): Promise<void> {
    throw new Error('Function not implemented.');
  },
  updateTicket: function (ticket: Ticket): Promise<void> {
    throw new Error('Function not implemented.');
  },
  removeTicket: function (ticketId: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
};
