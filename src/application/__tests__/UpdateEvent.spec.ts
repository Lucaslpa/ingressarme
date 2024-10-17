import {
  DurationValidator,
  EventValidator,
  IServices,
  Localization,
  MEvent,
  Notifications,
  User,
  LocalizationValidator,
  TicketValidator,
  Duration,
} from '@business';
import { CreateEventInput } from '../dto/CreateEventInput';
import { CreateEvent } from '../Event';
import { UpdateEventInput } from '../dto/UpdateEventInput';
import { UpdateEvent } from '../Event/UpdateEvent';
import { servicesEventStub } from './stubs/servicesEventStub';
import { servicesUserStub } from './stubs/servicesUserStub';

describe('UpdateEvent', () => {
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
      servicesEventStub,
      servicesUserStub,
      notifications,
      new EventValidator(),
      new TicketValidator(),
      new LocalizationValidator(),
      new DurationValidator(),
    );
    const response = await event.execute(input);
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
      servicesEventStub,
      servicesUserStub,
      notifications,
      new EventValidator(),
      new TicketValidator(),
      new LocalizationValidator(),
      new DurationValidator(),
    );
    const response = await event.execute(input);
    expect(response.isSuccess).toBe(false);
    expect(response.data).toEqual(null);
    expect(response.errors).toEqual([
      'name: Name must be at least 5 characters long',
      'description: Description must be at least 50 characters long',
    ]);
  });
});
