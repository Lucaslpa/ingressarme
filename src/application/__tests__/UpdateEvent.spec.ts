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
import { CreateEventInput } from '../dto/CreateEventInput';
import { CreateEvent } from '../Event';
import { UpdateEventInput } from '../dto/UpdateEventInput';
import { UpdateEvent } from '../Event/UpdateEvent';

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

  it('should update a event with success', async () => {
    const endDate = new Date(new Date().setDate(new Date().getDate() + 1));
    const input: UpdateEventInput = {
      name: '',
      userId: '1',
      description:
        'Event Test Description Event Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test Description',
      startDate: '',
      endDate: '',
      address: '',
      longitude: 0,
      latitude: 0,
      iconImg: '',
      bannerImg: '',
      eventId: '14124144',
    };

    const notifications = new Notifications();

    const event = new UpdateEvent(
      eventServices,
      userServices,
      notifications,
      new EventValidator(),
      new TickedValidator(),
      new LocalizationValidator(),
      new DurationValidator(),
    );
    const response = await event.execute(input);
    console.log(response);
    expect(response.isSuccess).toBe(true);
    expect(response.data).toEqual({
      eventId: expect.any(String),
    });
  });

  it('should failure when as a invalid start date', async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const input: UpdateEventInput = {
      name: 's',
      userId: '1',
      description: 'sasas',
      startDate: '',
      endDate: '',
      address: '',
      longitude: 0,
      latitude: 0,
      iconImg: '',
      bannerImg: '',
      eventId: '14124144',
    };

    const notifications = new Notifications();

    const event = new UpdateEvent(
      eventServices,
      userServices,
      notifications,
      new EventValidator(),
      new TickedValidator(),
      new LocalizationValidator(),
      new DurationValidator(),
    );
    const response = await event.execute(input);
    console.log(response);
    expect(response.isSuccess).toBe(false);
    expect(response.data).toEqual(null);
    expect(response.errors).toEqual([
      'name: Name must be at least 5 characters long',
      'description: Description must be at least 50 characters long',
    ]);
  });
});
