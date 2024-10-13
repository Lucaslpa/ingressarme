import {
  IServices,
  Notifications,
  Ticket,
  TicketValidator,
  Tier,
  TierValidator,
  ETicketTier,
} from '@business';

export const servicesTierStub: IServices<Tier> = {
  add: function (entity: Tier): Promise<Tier> {
    throw new Error('Function not implemented.');
  },
  update: function (entity: Tier): Promise<Tier> {
    throw new Error('Function not implemented.');
  },
  delete: function (id: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getById: function (id: string): Promise<Tier> {
    return Promise.resolve(
      new Tier(ETicketTier.exclusive, new Notifications(), new TierValidator()),
    );
  },
  getAll: function (): Promise<Tier[]> {
    throw new Error('Function not implemented.');
  },
};
