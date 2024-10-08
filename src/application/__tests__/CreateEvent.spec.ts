import { EventValidator } from '@business';
import { CreateEventInput } from '../dto/CreateEventInput';

describe('CreateEvent', () => {
  it('should create a event with success', () => {
    const input: CreateEventInput = {
      name: 'Event Test',
      description: 'Event Test Description',
      startDate: new Date(),
      endDate: new Date(),
      adress: 'Event Test Adress',
      longitude: 0,
      latitude: 0,
      ticketQuantity: 100,
      categoriesIds: ['1', '5'],
      iconImg: 'Event Test Icon',
      bannerImg: 'Event Test Banner',
    };

    const eventValidator = new EventValidator();
    const eventRepository = {
      create: jest.fn().mockReturnValue({
        id: '1',
        name: 'Event Test',
      }),
    };
    const event = new EventModifier(eventValidator, eventRepository);
    const response = event.create(input);

    expect(response.isSuccess).toBe(true);
    expect(response.data).toEqual({
      eventId: '1',
    });
  });
});
