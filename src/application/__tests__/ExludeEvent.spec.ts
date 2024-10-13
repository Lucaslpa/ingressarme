import {
  DurationValidator,
  EventValidator,
  IServices,
  Localization,
  MEvent,
  Notifications,
  User,
  LocalizationValidator,
  TickedValidator,
  Duration,
} from '@business';
import { ExcludeEvent } from '../Event';
import { ExludeEventInput } from '../dto/ExludeEventInput';
import { randomUUID } from 'crypto';

describe('UpdateEvent', () => {
  const eventServices: IServices<MEvent> = {
    getById: async function (id: string): Promise<MEvent> {
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
        ['1'],
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
  };

  const userServices: IServices<User> = {
    add: function (entity: User): Promise<User> {
      return Promise.resolve(entity);
    },
    update: function (entity: User): Promise<User> {
      return Promise.resolve(entity);
    },
    delete: function (id: string): Promise<void> {
      return Promise.resolve();
    },
    getById: function (id: string): Promise<User> {
      return Promise.resolve({} as User);
    },
  };

  it('should exlude a event with success', async () => {
    const input = new ExludeEventInput('14124144', randomUUID());

    const event = new ExcludeEvent(eventServices, userServices);
    const response = await event.execute(input);

    expect(response.isSuccess).toBe(true);
    expect(response.data).toEqual({
      eventId: expect.any(String),
    });
  });

  it('should failure when has a invalid input', async () => {
    const input = new ExludeEventInput('14124144', '');

    const event = new ExcludeEvent(eventServices, userServices);
    const response = await event.execute(input);

    expect(response.isSuccess).toBe(false);
    expect(response.data).toEqual(null);
    expect(response.errors).toEqual(['userID and eventID are both required']);
  });
});
