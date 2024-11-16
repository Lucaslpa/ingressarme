import { ExcludeEvent } from '../Event';
import { ExludeEventInput } from '../dto/ExludeEventInput';
import { randomUUID } from 'crypto';
import { servicesEventStub } from './stubs/servicesEventStub';
import { servicesUserStub } from './stubs/servicesUserStub';

describe('UpdateEvent', () => {
  it('should exlude a event with success', async () => {
    const input = new ExludeEventInput('14124144', randomUUID());

    const event = new ExcludeEvent(servicesEventStub, servicesUserStub);
    const response = await event.execute(input);

    expect(response.isSuccess).toBe(true);
    expect(response.data).toEqual({
      eventId: expect.any(String),
    });
  });

  it('should failure when has a invalid input', async () => {
    const input = new ExludeEventInput('14124144', '');

    const event = new ExcludeEvent(servicesEventStub, servicesUserStub);
    const response = await event.execute(input);

    expect(response.isSuccess).toBe(false);
    expect(response.data).toEqual(null);
    expect(response.errors).toEqual(['userID and eventID are both required']);
  });
});
