import {
  DurationValidator,
  EventValidator,
  IServices,
  MEvent,
  Notifications,
  User,
  LocalizationValidator,
  TicketValidator,
  ETicketTier,
  ECategories,
  CategoryValidator,
} from '@business';
import { CreateEventInput } from '../dto/CreateEventInput';
import { CreateEvent } from '../Event';
import { servicesTicketStub } from './stubs/servicesTicketStub';
import { servicesCategoriesStub } from './stubs/servicesCategoriesStub';
import { servicesEventStub } from './stubs/servicesEventStub';
import { servicesUserStub } from './stubs/servicesUserStub';

describe('CreateEvent', () => {
  it('should create a event with success', async () => {
    const startDate = new Date(new Date().setDate(new Date().getDate() + 1));
    const endDate = new Date(new Date().setDate(new Date().getDate() + 2));

    const input: CreateEventInput = {
      name: 'Event Test',
      description:
        'Event Test Description Event Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test Description',
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      address: 'Event Test Adress',
      longitude: 0,
      latitude: 0,
      ticketInfos: [
        {
          quantity: 10,
          price: 10,
          description: 'Event Test Ticket',
          tier: ETicketTier.diamond,
          currency: 'BRL',
        },
      ],
      categories: [ECategories.FEIRA, ECategories.BALADA],
      iconImg: 'httpt://icon.com/icon.png',
      bannerImg: 'httpt://banner.com/banner.png',
      userId: '1',
    };

    const notifications = new Notifications();

    const event = new CreateEvent(
      servicesEventStub,
      servicesUserStub,
      notifications,
      new EventValidator(),
      new TicketValidator(),
      new LocalizationValidator(),
      new DurationValidator(),
      new CategoryValidator(),
    );
    const response = await event.execute(input);
    console.log(response);
    expect(response.isSuccess).toBe(true);
    expect(response.data).toEqual({
      eventId: expect.any(String),
    });
  });

  it('should fail when given an invalid start date', async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    console.log(yesterday);
    const input: CreateEventInput = {
      name: 'Event Test',
      description:
        'Event Test Description Event Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test DescriptionEvent Test Description',
      categories: [ECategories.CARNAVAL, ECategories.COSPLAY],
      startDate: yesterday.toISOString(),
      endDate: new Date().toISOString(),
      address: 'Event Test Adress',
      longitude: 0,
      latitude: 0,
      ticketInfos: [
        {
          quantity: 10,
          price: 10,
          description: 'Event Test Ticket',
          tier: ETicketTier.diamond,
          currency: 'BRL',
        },
      ],
      iconImg: 'httpt://icon.com/icon.png',
      bannerImg: 'httpt://banner.com/banner.png',
      userId: '1',
    };

    const eventServices: IServices<MEvent> = {
      getById: jest.fn().mockReturnValue({
        id: '1',
        name: 'User Test',
      }),
      add: async function (entity: MEvent): Promise<MEvent> {
        return entity;
      },
      update: async function (entity: MEvent): Promise<MEvent> {
        return entity;
      },
      delete: function (id: string): Promise<void> {
        return Promise.resolve();
      },
      getAll: function (): Promise<MEvent[]> {
        throw new Error('Function not implemented.');
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
      getAll: function (): Promise<User[]> {
        throw new Error('Function not implemented.');
      },
    };

    const notifications = new Notifications();

    const event = new CreateEvent(
      servicesEventStub,
      servicesUserStub,
      notifications,
      new EventValidator(),
      new TicketValidator(),
      new LocalizationValidator(),
      new DurationValidator(),
      new CategoryValidator(),
    );
    const response = await event.execute(input);

    expect(response.isSuccess).toBe(false);
    expect(response.data).toEqual(null);
    expect(response.errors).toEqual([
      'startDate: Start date must be in the future',
    ]);
  });
});
